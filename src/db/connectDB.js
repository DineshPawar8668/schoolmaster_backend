import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/studentDB");
    console.log("Database is connected successfully");
  } catch (error) {
    console.log("Something is wrong while connecting ");
  }
};

export default dbConnection;
