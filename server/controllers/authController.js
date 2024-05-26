import Usertest from '../models/Usertest.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new Usertest({ username, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token,user:user });
  } catch (err) { 
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
   try {
    const user = await Usertest.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
 
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
 
    res.json({ token, user: user});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
