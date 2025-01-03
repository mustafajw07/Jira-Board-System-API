import Board from '../models/Board.js';
import Epic from '../models/Epic.js';

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


export async function addEpic(epicName , description ,boardId) {
    const board = await Board.findById(boardId);
    if(!board){
        return {"message" : "Board not found!" , status : 404}
    }
    let epic = new Epic({
        epicName,
        description,
        boardId,
    });
    await epic.save()
    return {"message" : "Epic added successfully!" , status : 200}
}


export async function updateEpic(epicName , description ,boardId , epicId) {
    let epic = await Epic.findById(epicId);
    if(!epic){
        return {"message" : "Epic not found!" , status : 404}
    }
    epic = {
        epicName,
        description,
        boardId,
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
