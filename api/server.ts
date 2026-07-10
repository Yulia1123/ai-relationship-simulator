/**
 * local server entry file, for local development
 */
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

/**
 * start server with port
 */
const PORT = process.env.PORT || 3001;

// 短暂延迟，避免 nodemon 重启时旧进程未释放端口
const server = app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});

server.on('error', (err: Error & { code?: string }) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, retrying in 1s...`);
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 1000);
  } else {
    console.error(err);
  }
});

/**
 * close server
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;