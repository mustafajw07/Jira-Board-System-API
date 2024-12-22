import {mongoose , Schema} from "mongoose";

const releaseSchema = new Schema({
    releaseName: {
        type: String,
        require: true
    },
    sprintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint',
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
  }
},
{
  releaseId: true,
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
});

const Release = mongoose.model('Release', releaseSchema);
export default Release;