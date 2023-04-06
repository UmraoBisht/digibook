const mongoose = require('mongoose')
const { Schema } = mongoose;

// this is a Schema logical view of database
const UserSchema = new Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  pwd:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true,
  },

  date:{
    type:Date,
    default:Date.now
  }
});
const User=mongoose.model("user",UserSchema);
// User.createIndexes();
module.exports=User;