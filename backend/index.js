import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

// Store active users per page
const pageCounts = {
  railway: 0,
  netflix: 0,
  zomato: 0
};

// Store socket-page mappings
const socketPages = new Map();

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinPage', (page) => {
    // Remove from previous page if any
    if (socketPages.has(socket.id)) {
      const prevPage = socketPages.get(socket.id);
      pageCounts[prevPage] = Math.max(0, pageCounts[prevPage] - 1);
    }
    
    // Add to new page
    socketPages.set(socket.id, page);
    pageCounts[page]++;
    
    // Broadcast new counts
    io.emit('pageCounts', pageCounts);
  });

  socket.on('disconnect', () => {
    if (socketPages.has(socket.id)) {
      const page = socketPages.get(socket.id);
      pageCounts[page] = Math.max(0, pageCounts[page] - 1);
      socketPages.delete(socket.id);
      io.emit('pageCounts', pageCounts);
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`Live users service running on port ${PORT}`);
});