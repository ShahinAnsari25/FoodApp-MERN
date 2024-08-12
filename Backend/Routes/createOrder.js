const express= require('express');
const router= express.Router();
const UserRecord= require ('../models/Order.js');

router.post('/postRecord', async(req, res)=>{
   try {
      const{userId, itemName, price,quantity, image}= req.body;
      const orderData = await UserRecord.create({
         userId:userId,
         itemName: itemName,
         price: price,
         quantity: quantity,
         image:image
      })
      
      res.status(200).json({message:"order submitted successfully", orderData:orderData})
   } catch (error) {
      res.status(500).json({message:error})
      console.log(error);
      
   }
})

router.post('/getOrders', async(req, res)=>{
   try {
      const data= await UserRecord.find({userId:req.body.userId});
      console.log(data);
      if(data){
         return res.status(200).json({data:data})
      }
      res.status(404).json({message:"no orders"})
      
   } catch (error) {
      res.status(500).json({message:error})
   }
})

module.exports=router;