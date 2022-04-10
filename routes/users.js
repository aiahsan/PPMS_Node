const {User} = require('../models/user');
const validate =require('../helpers/validationSchema')
const {UserSchema,LoginSchema}=require('../helpers/validationSchema/schemas')
const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const response=require('../helpers/response');
 
 
router.post('/register', validate(UserSchema),async (req,res)=>{
    
     const {name,email,password}=req.body;
 
    const userExisit=await User.findOne({email:req.body.email});
    if(!userExisit)
    {
           let user = new User({
            name,
            email,
            passwordHash: bcrypt.hashSync(password, 10),
           
            
        })
        user = await user.save();
    
        if(!user)
        return res.status(400).json(response(false,"the user cannot be created!",{}))
    
        return res.status(200).json(response(true,"User created successfully",user))
    }
    else
    {        
        return res.status(400).json(response(false,"Email already exsist",{}))

    }
     
})

router.post('/login', validate(LoginSchema),async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) { 
        return  res.status(400).json(response(false,"The user not found",{}))
 
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                 name: user.name,
                email: user.email,
                id:user.id
            },
            secret,
            {expiresIn : '365d'}
        )
       
        return res.status(200).json(response(true,"Login successful",{
            token
        }));

    } else {
        return  res.status(400).json(response(false,"password is wrong!",{}))

    }

    
})
 

 
module.exports =router;