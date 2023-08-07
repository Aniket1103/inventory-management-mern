import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import user from './routes/user.js'
import inventoryItem from './routes/inventoryItem.js'

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use('/api/v1', user);
app.use('/api/v1/inventory', inventoryItem);