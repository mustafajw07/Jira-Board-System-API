import {mongoose , Schema} from "mongoose";

const storyTypeSchema = new Schema({
    type: {
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

const StoryType = mongoose.model('StoryType', storyTypeSchema);
export default StoryType;