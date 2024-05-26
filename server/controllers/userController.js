import Usertest from '../models/Usertest.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await Usertest.find().select('username email');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
