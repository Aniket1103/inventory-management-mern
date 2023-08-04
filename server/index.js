import { app } from './app.js';
import { config } from 'dotenv';
import { connectDatabase } from "./config/database.js";

config({
  path: "./config/config.env"
})

connectDatabase();


const PORT = process.env.PORT || "4000";
app.listen(PORT,  () => {
  console.log(`Server Listening to Port: ${PORT}`);
})