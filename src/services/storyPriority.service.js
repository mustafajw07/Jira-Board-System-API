import StoryPriority from "../models/StoryPriority.js";


export async function getStoryPriorities() {
    const priorities = await StoryPriority.find();
    return  {"message" : priorities , status : 200}
}


export async function addPriority(priority) {
    let priorities = await StoryPriority.find({priority});
    if(priorities.length !== 0) {
        return {"message" : "Priority already exist!" , status : 400}
    }
    priorities = new StoryPriority({
        priority
    });
    await priorities.save();
    return  {"message" : "Priority added successfully!" , status : 200}
}