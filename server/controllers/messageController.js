import Message from '../models/Message.js';
import { getPrivateRoomId } from '../utils/utils.js';

export const getGroupMessages = async (req, res) => {
  try {
    const messages = await Message.find({ group: req.params.groupId }).populate('sender', 'username');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPrivateMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id },
      ],
    }).populate('sender', 'username');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const sendMessage = async (req, res, io) => {
  const { content, groupId, receiverId } = req.body;
  try {
    const message = new Message({
      content,
      sender: req.user._id,
      group: groupId || undefined,
      receiver: receiverId || undefined,
    });
    await message.save();

    // Emit the message to the correct room
    if (groupId) {
      console.log(`Sending message to group ${groupId}`);
      io.to(groupId).emit('newMessage', message);
    } else if (receiverId) {
      const roomId = getPrivateRoomId(req.user._id, receiverId);
      console.log(`Sending message to private room ${roomId}`);
      io.to(roomId).emit('newMessage', message);
    }

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
