import express from 'express';
import api from './api/index.js';
import path from 'path';
import userRouter from './api/routes/user-router.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api/v1', userRouter);
app.use('/api/v1', api);

export default app;
