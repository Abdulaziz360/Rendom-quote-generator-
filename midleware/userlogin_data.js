const userModel=require('../models/user_model')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const fetch_user=async(req,res,next)=>{
    try {
        const myJwt=req.cookies.mytoken
       if(myJwt){
        try {
            const verify_token=jwt.verify(myJwt,process.env.SECRET)
            req.decode_token=verify_token
            const _id=req.decode_token._id
            const user=await userModel.findById({_id:_id})
            // console.log('user data:',user)
            res.locals.user=user;
        } catch (error) {
            console.log(`Error in fetch middleware:${error}`)
        }  
    } 
    else{
        res.locals.user=null
    }
    next()
    } catch (error) {
        console.log(`error in fetch middleware`)
    }
}
module.exports=fetch_user