import Role from "../models/Role.js";

export async function getRoles() {
    let roles = await Role.find({})
    return {"status" : 200 , "message" : roles};
}

export async function addRole(title){
    let currentTile = await Role.findOne({title});
    if(currentTile){
        return {"status" : 400 , "message" : "Role already Exists!"}
    }
    title = new Role({
        title: title
    });
    await title.save()
    return {"status" : 200 , "message" : "Role added successfully!"}; 
}