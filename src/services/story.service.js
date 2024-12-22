import Story from "../models/Story.js";
import Board from "../models/Board.js";
import StoryStatus from "../models/StoryStatus.js"
import StoryPriority from "../models/StoryPriority.js"
import StoryType from "../models/StoryType.js"

export async function getStoryOnBoard(boardId) {
    const board = await Board.findById(boardId);
    if(!board){
        return {message : "Board not found!" , status : 404};
    }
    const stories = await Story.find({boardId}).populate(['reporter' , 'teamMember' , 'assigned' , 'sprintId' , 'epic' , 'status' , 'type' , 'priority']);
    return {message : stories , status : 200};
}


export async function getStoryById(storyId) {
    const story = await Story.findById(storyId).populate(['reporter' , 'teamMember' , 'assigned' , 'sprintId' , 'epic' , 'status' , 'type' , 'priority']);
    if(!story){
        return {message : "Story not found!" , status : 404};
    }
    return {message : story , status : 200};
}

export async function getStoryForUser(boardId , userId) {
    const board = await Board.findById(boardId);
    if(!board){
        return {message : "Board not found!" , status : 404};
    }
    const stories = await Story.find({boardId : boardId , assigned : userId});
    return {message : stories , status : 200};
}

export async function addStory(boardId , body , userId) {
    const board = await Board.findById(boardId);
    if(!board){
        return {message : "Board not found!" , status : 404};
    }
    const boardUsers = board.users.map((user) => user.toString());
    if(!boardUsers.includes(userId)){
        return {message : "User don't have permission to add story on this board!" , status : 404};
    }

    let priority = await StoryPriority.find({priority : "Medium"});
    let type = await StoryType.find({type : "Story"});
    let status = await StoryStatus.find({name : "Backlog"});

    let story = new Story({
        title : body.title,
        description : board.description,
        storyPoint : body.storyPoint ? body.storyPoint : null,
        flag : body.flag ? body.flag : false,
        boardId,
        reporter : userId,
        teamMember : body.teamMember ? body.teamMember : null,
        assigned : body.assigned ? body.assigned : null,
        sprintId : body.sprintId ? body.sprintId : null,
        epic : body.epic ? body.epic : null,
        status: body.status ? body.status : status[0]._id.toString(),
        type : body.type ? body.type : type[0]._id.toString(),
        priority :body.priority ? body.priority : priority[0]._id.toString()
    });

    await story.save()
    return {message : "Story added successfully!" , status : 200};
}

export async function updateStory(storyId , body , userId) {
    let story = await Story.findById(storyId);
    if(!story){
        return {message : "Story not found!" , status : 404};
    }

    const boardUsers = board.users.map((user) => user.toString());
    if(!boardUsers.includes(userId)){
        return {message : "User don't have permission to update story on this board!" , status : 404};
    }

    story = {
        title : body.title,
        description : board.description,
        storyPoint : body.storyPoint ? body.storyPoint : story.storyPoint,
        flag : body.flag ? body.flag : story.flag,
        boardId: story.boardId,
        reporter : body.reporter ? body.reporter : story.reporter,
        teamMember : body.teamMember ? body.teamMember : story.teamMember,
        assigned : body.assigned ? body.assigned : story.assigned,
        sprintId : body.sprintId ? body.sprintId : story.sprintId,
        epic : body.epic ? body.epic : story.epic,
        status: body.status ? body.status : story.status,
        type : body.type ? body.type : story.type,
        priority : body.priority ? body.priority : story.priority
    };
    
    await findByIdAndUpdate({})
    return {message : "Story updated successfully!" , status : 200};
}

export async function deleteStory(storyId) {
    const story = await Story.findById(storyId);
    if(!story){
        return {message : "Story not found!" , status : 404};
    }
    await Story.findOneAndDelete(storyId , story);
    return {message : "Story deleted successfully!" , status : 200};
}