import { getPrivateRoomId } from "../utils/utils.js";

export const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('joinGroup', (groupId) => {
      console.log(`Socket ${socket.id} joining group ${groupId}`);
      socket.join(groupId);
    });

    socket.on('sendMessage', (message) => {
      console.log('Received message:', message);
      if (message.groupId) {
        console.log(`Emitting message to group ${message.groupId}`);
        io.to(message.groupId).emit('newMessage', message);
      } else if (message.receiverId) {
        const roomId = getPrivateRoomId(message.sender, message.receiverId);
        console.log(`Emitting message to private room ${roomId}`);
        socket.join(roomId);
        io.to(roomId).emit('newMessage', message);
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });
};