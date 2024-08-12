const express= require('express');
const router= express.Router();

router.get('/getFoodItems',(rreq, res)=>{
   try {
      res.status(200).json({foodItems:global.FoodItems,category:global.FoodCategory})
   } catch (error) {
      res.send("server error")
   }
})
module.exports=router;