import {mongoose , Schema} from "mongoose";

const boardSchema = new Schema({
    boardName: {
        type: String,
        require: true,
        unique: true
    },
    description: {
      type: String,
      require: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  ],
},
{
  boardId: true,
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
});

const Board = mongoose.model('Board', boardSchema);
export default Board;