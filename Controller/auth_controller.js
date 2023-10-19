const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const usermodel=require('../models/user_model')

// password encrption
const ecrypt_pass=async(password)=>{
    try {
        const ecrypt_pass=await bcrypt.hash(password,10)
        return ecrypt_pass;
    } catch (error) {
        console.log(`error in encryption${error}`)
    }
}

// ............token---------
const jwt_creation=async(_id,email)=>{
    try {
        const payload={
            _id:_id,
            email:email
        }
        const jwtToken=jwt.sign(payload,process.env.SECRET,{expiresIn:'1d'})
        console.log(`t_gen:${jwtToken}`)
        return jwtToken
    } catch (error) {
        console.log(`Error in jwt creation:${error}`)
    }
}


const register_loader=async(req,res)=>{
    try {
        const message=''
        const error=''
        res.render('register',{message,error})
    } catch (error) {
        console.log(`Error in register loader:${error}`)
    }
}
const login_loader=async(req,res)=>{
    try {
        res.render('login',{message:''})
    } catch (error) {
        console.log(`Error in register loader:${error}`)
    }
}
// ............
const register_data=async(req,res)=>{
    try {
        const password=req.body.password
        const user_data=new usermodel({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            phone:req.body.phone,
            password:await ecrypt_pass(password),
        })
        const result=await user_data.save()
        if(result)
        {
            res.redirect('/login')
        }

        
    } catch (error) {
        const message=''
        // const error=''
        res.render('register',{message,error})
        console.log('Error in posting data:',error)
    }
}
// login data---------
const login_data=async(req,res)=>{
    try {
          const email=req.body.email
          const password=req.body.password
          const user=await usermodel.findOne({email:email})
          if(user){
          console.log(`pass:${password}&userPass:${user.password}`)
          const is_match=await bcrypt.compare(password,user.password)
          console.log(`bcrypt_pass:${is_match}`)
          if(is_match)
          {
              const Token=await jwt_creation(user._id,user.email)
              console.log(`token:${Token}`)
            //   user.tokens=[{token:Token}]
            //   await user.save()
              res.cookie('mytoken',Token,{httpOnly:true})
              res.redirect('/home')
          }
          else{
            res.render('login',{
                message:'invalid data'
            })
          }
        }
        else{
            res.render('login',{
                message:'invalid data'
            })  
        }
        
    } catch (error) {
        console.log(`error in login data:${error}`)
    }
}
// logout------------------>
const logout=async(req,res)=>{
    try {
        res.clearCookie('mytoken');
        res.redirect('/')
    } catch (error) {
        console.log(`error in logout controller:${error}`)
        res.redirect('/404')
    }
}
module.exports={
    register_loader,
    login_loader,
    register_data,
    login_data,
    logout
}