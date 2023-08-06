import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import user from './routes/user.js'
import inventoryItem from './routes/inventoryItem.js'

export const app = express();

app.use(cors({
  origin: "https://inventory-management-stage.netlify.app",
  credentials: true, // To allow credentials (cookies) to be sent along with the request
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', user);
app.use('/api/v1/inventory', inventoryItem);