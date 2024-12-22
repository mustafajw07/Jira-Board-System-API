import {mongoose , Schema} from "mongoose";

const storyStatusSchema = new Schema({
    name: {
        type: String,
        require: true
    }
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

const StoryStatus = mongoose.model('StoryStatus', storyStatusSchema);
export default StoryStatus;