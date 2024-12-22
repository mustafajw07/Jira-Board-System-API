import {mongoose , Schema} from "mongoose";

const sprintSchema = new Schema({
    sprintNo: {
        type: Number,
        require: true
    },
    sprintName: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    }
},
{
  sprintId: true,
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
});

const Sprint = mongoose.model('Sprint', sprintSchema);
export default Sprint;