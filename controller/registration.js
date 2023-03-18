var User=require('../model/registration')
var Shop=require('../model/shop')
var Landholder=require('../model/landholder')
var Customer=require('../model/customer')
var Advisor=require('../model/advisors')

var jwt= require("jsonwebtoken");
const expressJwt = require("express-jwt");

const { ObjectId } = require('mongodb');

exports.addUser=(req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.email},(err,user)=>{ //find query
        if(err){
            return res.status(404).json({error:"Error in fetching email"})
        }
        else if(user){
            return res.status(404).json({error:"User already exist"})
        }
        else{
            let user=new User(req.body)

            user.save((err,newUser)=>{
                if(err){
                return res.status(404).json({error:err})
                }
                else{
                    if(req.body.usertype=="shop")
                    {
                        user.save((err,newUser)=>{
                            if(err){
                                return res.status(404).json({error:err})
                                    }
                                    else{
                                       req.body.shopid=ObjectId(newUser._id)
                                       let shop=new Shop(req.body)
                                       
                                       shop.save((err,newUser)=>{
                                        if(err){
                                            return res.status(404).json({error:err})
                                            }
                                            else{
                                                return res.status(201).json({msg:"Registration successful"})  
                                            }
                                       })
                                        }
                            
                            })          
                     }
                     else if(req.body.usertype=="landholder")
                     {
                         user.save((err,newUser)=>{
                             if(err){
                                 return res.status(404).json({error:err})
                                     }
                                     else{
                                        req.body.landholderid=ObjectId(newUser._id)
                                        let landholder=new Landholder(req.body)
                                        
                                        landholder.save((err,newUser)=>{
                                         if(err){
                                             return res.status(404).json({error:err})
                                             }
                                             else{
                                                 return res.status(201).json({msg:"Registration successful"})  
                                             }
                                        })
                                         }
                             
                             })          
                      }
                    else if(req.body.usertype=="customer")
                     {
                         user.save((err,newUser)=>{
                             if(err){
                                 return res.status(404).json({error:err})
                                     }
                                     else{
                                        req.body.customerid=ObjectId(newUser._id)
                                        let customer=new Customer(req.body)
                                        
                                        customer.save((err,newUser)=>{
                                         if(err){
                                             return res.status(404).json({error:err})
                                             }
                                             else{
                                                 return res.status(201).json({msg:"Registration successful"})  
                                             }
                                        })
                                         }
                             
                             })          
                      }
                      else if(req.body.usertype=="advisor")
                     {
                         user.save((err,newUser)=>{
                             if(err){
                                 return res.status(404).json({error:err})
                                     }
                                     else{
                                        req.body.advisorid=ObjectId(newUser._id)
                                        let advisor=new Advisor(req.body)
                                        
                                        advisor.save((err,newUser)=>{
                                         if(err){
                                             return res.status(404).json({error:err})
                                             }
                                             else{
                                                 return res.status(201).json({msg:"Registration successful"})  
                                             }
                                        })
                                         }
                             
                             })          
                      }
                    
                    }
                }
                        )
                }
            })
        }

exports.login=(req,res)=>{
    User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
        if(err){
            return res.status(404).json({error:"Error in fetching email"})
        }
        else if(user){
            //create token
            const token = jwt.sign({_id:user._id},process.env.SECRET);
            //put token in cookie
            res.cookie("token",token,{expire: new Date()+9999});
            return res.status(201).json({token,user})
        }
    }
        )
}
 