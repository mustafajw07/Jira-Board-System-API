import StoryStatus from "../models/StoryStatus.js";


export async function getStoryStatus() {
    const statuses = await StoryStatus.find();
    return  {"message" : statuses , status : 200}
}


export async function addStatus(name) {
    let status = await StoryStatus.find({name});
    if(status.length !== 0) {
        return {"message" : "Status already exist!" , status : 400}
    }
    status = new StoryStatus({
        name
    });
    await status.save();
    return  {"message" : "Status added successfully!" , status : 200}
}