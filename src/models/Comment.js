import {mongoose , Schema} from "mongoose";

const commentSchema = new Schema({
    description: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story',
    },
},
{
  id: true,
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;