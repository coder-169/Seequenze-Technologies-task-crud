import mongoose from "mongoose";

const connectDB = async () => {
  // "mongodb://localhost:27017/CodeWithAlpha"
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => console.log('connected to db'))
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
