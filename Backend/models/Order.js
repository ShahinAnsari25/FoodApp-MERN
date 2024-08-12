const mongoose= require('mongoose');
const {Schema} = mongoose;
const OrderSchema= new Schema({
   userId:{
      type:String,
      require:true
   },
   itemName:{
      type:String,
      require:true
   },
   quantity:{
      type:Number,
      require: true
   },
   price:{
      type:Number,
      require:true
   },
   image:{
      type:String,
      require:true
   },
   date:{
      type:Date,
      default:Date.now
   }
})
module.exports= mongoose.model("orders",OrderSchema)