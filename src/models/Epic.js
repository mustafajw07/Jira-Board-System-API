import { mongoose, Schema } from "mongoose";

const epicSchema = new Schema(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Board"
    },
    priority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StoryPriority',
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    epicId: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Epic = mongoose.model("Epic", epicSchema);
export default Epic;
