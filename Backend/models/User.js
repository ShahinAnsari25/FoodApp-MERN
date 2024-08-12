const mongoose=require('mongoose');
const {Schema}= mongoose;
//creating Schema

const UserSchema= new Schema({
   name:{
      type: String,
      required: true
   },
   address:{
      type: String,
      required: true
   },
   email:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   },
   date:{
      type:Date,
      default: Date.now
   }
})
//collection will be created name user
module.exports= mongoose.model("user",UserSchema)