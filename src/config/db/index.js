import mongoose from "mongoose";
import { DB_USER, DB_PASS } from '../index.js';

// Ensure that the environment variable DB_URL is defined in your .env file
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster-people.tdph8dg.mongodb.net`;

const connect = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Mongoose connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export { connect, url };