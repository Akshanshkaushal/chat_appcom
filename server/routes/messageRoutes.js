import express from 'express';
import { getGroupMessages, getPrivateMessages, sendMessage } from '../controllers/messageController.js';

export default (io) => {
    const router = express.Router();
  
    router.get('/group/:groupId', getGroupMessages);
    router.get('/private/:userId', getPrivateMessages);
    router.post('/', (req, res) => sendMessage(req, res, io));
  
    return router;
  };
