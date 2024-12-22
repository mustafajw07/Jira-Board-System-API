import Comment from "../models/Comment.js";


export async function getComments(storyId) {
    const story = await Story.findById(storyId);
    if(!story){
        return  {"message" : "Story not found" , status : 404}
    }
    const comments = await Comment.find(storyId).populate('userId');
    return  {"message" : comments , status : 200}
}

export async function addComment(description , userId , storyId) {
    const story = await Story.findById(storyId);
    if(!story){
        return  {"message" : "Story not found" , status : 404}
    }
    let comment = new Comment({
        description,
        userId,
        storyId
    });
    await comment.save();
    return  {"message" : "Comment added successfully!" , status : 200}
}

export async function updateComment(description , userId , commentId) {
    let comment = await Comment.findById(commentId);
    if(!comment){
        return  {"message" : "Comment not found" , status : 404}
    }
    comment = {
        description,
        userId,
        storyId
    };
    await Comment.findByIdAndUpdate(commentId , {$set : comment} , { new: true });
    return  {"message" : "Comment updated successfully!" , status : 200}
}

export async function deleteComment(commentId , userId) {
    let comment = await Comment.findById(commentId);
    if(!comment){
        return  {"message" : "Comment not found" , status : 404}
    }
    // TODO Add user check
    await Comment.findOneAndDelete(commentId , comment);
    return  {"message" : "Comment deleted successfully!" , status : 200}
}