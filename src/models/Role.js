import {mongoose , Schema} from "mongoose";

const roleSchema = new Schema({
    title: {
        type: String,
        require: true
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

const Role = mongoose.model('Role', roleSchema);
export default Role;