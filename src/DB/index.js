import mongoose from 'mongoose';
import { D_BName } from '../constants.js';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODBURI}`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB Connection error:", error);
        process.exit(1);
    }
};

export default connectDB;

