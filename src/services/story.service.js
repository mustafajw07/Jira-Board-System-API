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
    const stories = await Story.find({boardId}).populate(['reporter' , 'assigned' , 'sprint' , 'epic' , 'status' , 'type' , 'priority']);
    return {message : stories , status : 200};
}


export async function getStoryById(storyId) {
    const story = await Story.findById(storyId).populate(['reporter' , 'assigned' , 'sprint' , 'epic' , 'status' , 'type' , 'priority']);
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
        return {message : "User don't have permission to add story on this board!" , status : 400};
    }

    let priority = await StoryPriority.find({priority : "Medium"});
    let type = await StoryType.find({type : "Story"});
    let status = await StoryStatus.find({name : "Todo"});

    let story = new Story({
        title : body.title,
        description : board.description,
        boardId,
        sprint : body.sprintId ? body.sprintId : null,
        storyPoint : body.storyPoint ? body.storyPoint : null,
        reporter : body.reporter ? body.reporter : userId,
        assigned : body.assigned ? body.assigned : null,
        epic : body.epic ? body.epic : null,
        priority : body.priority ? body.priority : priority[0]._id.toString(),
        type : body.type ? body.type : type[0]._id.toString(),
        status: body.status ? body.status : status[0]._id.toString()
    });

    await story.save()
    return {message : "Story added successfully!" , status : 200};
}

export async function updateStory(storyId , body , userId) {
    let story = await Story.findById(storyId);
    if(!story){
        return {message : "Story not found!" , status : 404};
    }
    const board = await Board.findById(story.boardId);
    if(!board){
        return {message : "Board not found!" , status : 404};
    }
    const boardUsers = board.users.map((user) => user.toString());
    if(!boardUsers.includes(userId)){
        return {message : "User don't have permission to update story on this board!" , status : 400};
    }

    story = {
        title : body.title ? body.title : story.title,
        description : body.description ? body.description : story.description,
        storyPoint : body.storyPoint ? body.storyPoint : story.storyPoint,
        boardId: story.boardId,
        reporter : body.reporter ? body.reporter : story.reporter,
        assigned : body.assigned ? body.assigned : story.assigned,
        sprint : body.sprintId ? body.sprintId : story.sprint,
        epic : body.epic ? body.epic : story.epic,
        status: body.status ? body.status : story.status,
        type : body.type ? body.type : story.type,
        priority : body.priority ? body.priority : story.priority
    };
    
    await Story.findByIdAndUpdate(storyId , {$set : story} , { new: true })
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