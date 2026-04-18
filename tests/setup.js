import dotenv from "dotenv";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config();

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGO_URI = mongoUri;
  await connectDB();
  await mongoose.connection.db.dropDatabase(); // Clear DB for clean tests
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

export default app;
