const mongoose = require('mongoose');
const connectionUrl="mongodb://localhost:27017/FoodAppMern"
const mongoDB= async()=>{
   try{
      await mongoose.connect(connectionUrl)
      console.log("connected");
      const db= mongoose.connection.db;
      const fetched_data= db.collection("FoodItems");
      const data= await fetched_data.find({}).toArray();
      global.FoodItems=data;

      const fetched_data_category= db.collection("Category");
      const dataCategory= await fetched_data_category.find({}).toArray();
      global.FoodCategory=dataCategory;
      // console.log(data);
   }
   catch(error){
      console.log(error);
      
   }
}
module.exports= mongoDB;