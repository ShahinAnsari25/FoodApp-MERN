const express= require('express');
const router=express.Router();
const User= require('../models/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const jwtSecret='shdfhsgfhdhfjhjd'
router.post("/createUser",
   [body('email','invalid email').isEmail()]
   ,async(req, res)=>{
      const result = validationResult(req);
      if (result.isEmpty()) {
         const salt= await bcrypt.genSalt(10);
         const securePassword= await bcrypt.hash(req.body.password, salt)
         try{
            await User.create({
               name:req.body.name,
               address:req.body.address,
               email:req.body.email,
               password:securePassword
            });
           return res.status(200).json({message:'registered successfully'})
         }
         catch(error){
           return res.json({message:error})
         }
      }
    
      res.status(400).json({ errors: result.array() });
      
})

//login
router.post("/login",async(req, res)=>{
         try{
            const userEmail= req.body.email;
            
            const userData= await User.findOne({email:userEmail})
            
            if(!userData){
               return res.status(404).json({message:"No user found"})
            }
            //comparing entered password with user password
            const passwordCompare= await bcrypt.compare(req.body.password,userData.password)
            if(passwordCompare){
               const data={
                  user:{
                     id:userData.id
                  }
               }
               const authToken= jwt.sign(data, jwtSecret)
               return res.status(200).json({message:'login successful', authToken:authToken, userId:userData._id, name: userData.name})
            }
            return res.status(404).json({message:'Invalid credentials'})
         }
         catch(error){
            res.status(500).json({message:error})
         }
      
})
module.exports= router;