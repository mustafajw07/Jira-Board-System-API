import {mongoose , Schema} from "mongoose";

const storySchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    storyPoint: {
      type: Number,
      default: null
    },
    flag: {
        type: Boolean,
        default: false
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    teamMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sprint',
      default: null
    },
    epic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Epic',
      default: null
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StoryStatus',
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StoryType',
    },
    priority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StoryPriority',
    }
},
{
  storyId: true,
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
});

const Story = mongoose.model('Story', storySchema);
export default Story;