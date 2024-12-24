import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export async function registerUser (userName,email,password,roleId) {
    let user = await User.find({email});
    if(user.length !== 0){
        return {"message" : "User already exists" , "status" : 400};
    }
    var salt = await bcryptjs.genSaltSync(10);
    var hash = await bcryptjs.hashSync(password, salt);
    user = new User({
        email,
        password : hash,
        userName,
        role: roleId
    });
    await user.save();
    return {"message" : "User added successfully", "status" : 200};
}

export async function getUserWithRole(userId) {
    const user = await User.findById(userId).populate('role').select("-password");
    return {"message" : user.role.title, "status" : 200};
}

export async function getAllUsers(userId) {
    const users = await User.find(userId).populate('role').select("-password");
    return {message : users, "status" : 200};
}

export async function getUser(userId) {
    const user = await User.findById(userId).populate('role').select("-password");
    return {message : user, "status" : 200};
}

export async function loginUser(email,password) {
    let user = await User.find({email});
    if(user.length === 0){
        return {"message" : "User Not found" , "status" : 404};
    }
    let passwordCheck = await bcryptjs.compareSync(password, user[0].password);
    if (!passwordCheck){
        return {"message" : "Password Incorrect" , "status" : 401};
    }
    const role = await getUserWithRole(user[0]._id.toString());
    const payload = {
        user : {
            id : user[0]._id.toString(),
            role: role.message
        }
    }
    const token = await jwt.sign(payload , process.env.JWT_SECRET_KEY)
    return {"message" : token , "status" : 200};
}