import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import authRoutes from './routes/authRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import messageRoutes from './routes/messageRoutes.js';   
import usersRoutes from './routes/userRoutes.js'; 
import { chatSocket } from './sockets/chatSocket.js';
 
import Connection from './utils/db.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:3000",  
      methods: ["GET", "POST"]
    }
  });
 

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
 
Connection(username, password);

app.use('/api/auth', authRoutes);
app.use('/api/chat', authMiddleware, messageRoutes(io));
app.use('/api/group', authMiddleware, groupRoutes); 
app.use('/api/users',  usersRoutes); 

chatSocket(io);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
