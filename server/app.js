import 'dotenv-extended/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import http from 'http';
import express from 'express';
import io from 'socket.io';
import expressConfig from './config/express';

const mongoInitPromise = mongooseConfig(mongoose);

mongoose.connect(process.env.MONGO_URI);

const app = express();
const server = http.createServer(app);
const socket = io.listen(server);

expressConfig(app);

socket.on('connect', () => {
  console.log('a user connected');
});

const expressPromise = new Promise(resolve => {
  server.listen(process.env.PORT, () => {
    console.log('Express listening on port %s', process.env.PORT);
    resolve();
  });
});

export default app;

export const appStarted = mongoInitPromise.then(() => expressPromise);