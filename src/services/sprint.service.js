import Sprint from "../models/Sprint.js";

export async function getSprintBoardById(boardId) {
    const sprint = await Sprint.find({boardId});
    if(!sprint){
        return {message : "Sprint not found!" , status : 404}
    }
    return {message : sprint , status : 200};
}

export async function addSprint(body) {
    const sprintName = body.sprintName;
    const sprintNo = body.sprintNo;
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const boardId = body.boardId;

    const sprint = new Sprint({
        sprintName,
        sprintNo,
        startDate,
        endDate,
        boardId
    });

    await sprint.save()
    return {message : "Sprint added successfully!" , status : 200}
}

export async function updateSprint(body , sprintId) {
    const sprintName = body.sprintName;
    const sprintNo = body.sprintNo;
    const startDate = body.startDate;
    const endDate = body.endDate;
    const boardId = body.boardId;

    const sprint = {
        sprintName,
        sprintNo,
        startDate,
        endDate,
        boardId
    };

    await Sprint.findByIdAndUpdate(sprintId , {$set : sprint} , { new: true })
    return {message : "Sprint updated successfully!" , status : 200}
}


export async function deleteSprint(sprintId) {
    const sprint = await Sprint.findById(sprintId);
    if(!sprint){
        return {message : "Sprint not found!" , status : 404}
    }

    await Sprint.findOneAndDelete(sprintId , sprint)
    return {message : "Sprint deleted successfully!" , status : 200}
}