import {mongoose , Schema} from "mongoose";

const storyPrioritySchema = new Schema({
    priority: {
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

const StoryPriority = mongoose.model('StoryPriority', storyPrioritySchema);
export default StoryPriority;