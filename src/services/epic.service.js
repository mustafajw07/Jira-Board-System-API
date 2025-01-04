import Board from '../models/Board.js';
import Epic from '../models/Epic.js';
import StoryPriority from "../models/StoryPriority.js"


export async function getEpicsByBoardId(boardId) {
    const board = await Board.findById(boardId).select("-boardId");
    if(!board){
        return {"message" : "Board not found!" , status : 404}
    }
    let epics = await Epic.find({boardId : boardId});
    if(!epics){
        epics = []
    }
    return {"message" : epics , status : 200}
}


export async function addEpic(body , userId ,boardId) {
    const board = await Board.findById(boardId);
    const {title , description} = body;
    if(!board){
        return {"message" : "Board not found!" , status : 404}
    }
    let priority = await StoryPriority.find({priority : "Medium"});
    let epic = new Epic({
        title,
        description,
        boardId,
        reporter : userId,
        priority :body.priority ? body.priority : priority[0]._id.toString()
    });
    await epic.save()
    return {"message" : "Epic added successfully!" , status : 200}
}


export async function updateEpic(title , description , epicId) {
    let epic = await Epic.findById(epicId);
    if(!epic){
        return {"message" : "Epic not found!" , status : 404}
    }
    epic = {
        title,
        description
    }
    await Epic.findByIdAndUpdate(epicId , {$set : epic} , { new: true });
    return {"message" : "Epic updated successfully!" , status : 200}
}


export async function deleteEpic(epicId) {
    const epic = await Epic.findById(epicId);
    if(!epic){
        return {"message" : "Epic not found" , status : 404}
    }
    await Epic.findOneAndDelete(epicId , epic);
    return {"message" : "Epic deleted successfully" , status : 200}
}
