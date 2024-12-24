import Board from '../models/Board.js';
import Sprint from '../models/Sprint.js';


export async function getUserAllBoard(userId) {
    const boards = await Board.find({users : userId});
    return {boards , status: 200}
}

export async function getAllBoard() {
    const boards = await Board.find();
    return {boards , status: 200}
}

export async function addBoard(boardName , description , users) {
    let board = await Board.find({boardName});
    if(board.length !== 0){
        return {message : "Board already exist!" , status : 404}
    }
    board = new Board({
        boardName,
        description,
        users
    });
    await board.save()
    return {message : "Board added successfully!" , status: 200}
}

export async function updateBoard(boardId ,boardName , description , users) {
    let board = await Board.findById(boardId);
    if(!board){
        return {message : "Board already exist!" , status : 404}
    }
    let boardUsers = board.users.map((user) => user.toString());
    board = {
        boardName,
        description,
        users : [...users , ...boardUsers]
    };
    await Board.findByIdAndUpdate(boardId , {$set : board} , { new: true })
    return {message : "Board updated successfully!" , status: 200}
}

export async function getBoardById(boardId) {
    const board = await Board.findById(boardId).populate('users' , "-password");
    if(!board){
        return {message : "Board doesn't exist!" , status : 404}
    }
    return {message : board , status: 200}
}

export async function getSprintByBoardId(boardId) {
    const board = await Board.findById(boardId);
    if(!board){
        return {message : "Board doesn't exist!" , status : 404}
    }
    let sprints = await Sprint.find({boardId : boardId});
    if(!sprints){
        sprints = []
    }
    return {message : sprints , status: 200}
}

export async function removeUserFromBoard(boardId , userId) {
    const board = await Board.findById(boardId);
    if(!board){
        return {message : "Board doesn't exist!" , status : 404}
    }  
    const res = await Board.updateOne(
        {_id: boardId},
        {$pull: {'users' : userId}}
    )
    return {message : "User removed from board!" , status: 200}
}

export async function deleteBoard(boardId) {
    const board = await Board.findById(boardId);
    if(!board){
        return {message : "Board doesn't exist!" , status : 404}
    }
    await board.deleteOne({ boardId });
    return {message : "Board deleted successfully!" , status: 200}
}
