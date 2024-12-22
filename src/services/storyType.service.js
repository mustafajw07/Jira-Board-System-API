import StoryType from "../models/StoryType.js";


export async function getStoryTypes() {
    const types = await StoryType.find();
    return  {"message" : types , status : 200}
}


export async function addType(type) {
    let types = await StoryType.find({type});
    if(types.length !== 0) {
        return {"message" : "Type already exist!" , status : 400}
    }
    types = new StoryType({
        type
    });
    await types.save();
    return  {"message" : "Type added successfully!" , status : 200}
}