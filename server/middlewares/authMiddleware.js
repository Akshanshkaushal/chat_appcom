import jwt from 'jsonwebtoken';
import Usertest from '../models/Usertest.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

   const token = authHeader.split(' ')[1];
  
   // Ensure you get the token part after 'Bearer '
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Usertest.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Token is not valid' });
  }
};
