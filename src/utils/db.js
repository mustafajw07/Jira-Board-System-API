import mongoose from "mongoose";

async function connectDb() {
    await mongoose.connect('mongodb+srv://killeralex762:Killeral98!@cluster0.pz8a3y3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' , {useNewUrlParser: true});
    console.log('Database connected');
}
mongoose.set('strictQuery', false);

export default connectDb;