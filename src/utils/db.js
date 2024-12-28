import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config()


async function connectDb() {
    await mongoose.connect(process.env.DB_URL , {useNewUrlParser: true});
    console.log('Database connected');
}
mongoose.set('strictQuery', false);

export default connectDb;