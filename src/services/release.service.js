import Release from '../models/Release.js';
import Sprint from '../models/Sprint.js';
import Board from '../models/Board.js';


export async function getReleaseBySprintId(sprintId) {
    const sprint = await Sprint.FindById(sprintId);
    if(!sprint){
        return {"message" : "Sprint not found!" , status: 404}
    }
    const releases = await Release.find({ sprintId });
    return {message : releases , status: 200}
}

export async function getReleaseByBoardId(boardId) {
    const board = await Board.FindById(boardId).populate('Board' , 'Sprint');
    if(!board){
        return {"message" : "Board not found!" , status: 404}
    }
    const releases = await Release.find({ boardId });
    return {message : releases , status: 200}
}

export async function getReleaseById(releaseId) {
    const release = await Release.FindById(releaseId).populate('Sprint');
    if(!release){
        return {"message" : "Release not found!" , status: 404}
    }
    return {message : release , status: 200}
}

export async function addRelease(releaseName , sprintId) {
    const sprint = await Sprint.FindById(sprintId);
    if(!sprint){
        return {"message" : "Sprint not found!" , status: 404}
    }
    let release = new Release({
        releaseName,
        sprintId
    })
    await release.save()
    return {"message" : "Release added successfully!" , status: 200}
}

export async function deleteRelease(releaseId) {
    const release = await Release.FindById(releaseId);
    if(!release){
        return {"message" : "Release not found" , status: 404}
    }
    await board.deleteOne({ boardId });
    return {"message" : "Release deleted successfully!" , status: 200}
}