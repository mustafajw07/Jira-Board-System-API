import {mongoose , Schema} from "mongoose";

const userSchema = new Schema({
    userName: {
      type: String,
      required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
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
})

const User = mongoose.model('User', userSchema);
export default User;