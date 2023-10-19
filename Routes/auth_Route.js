const express=require('express')
const validatorError=require('../midleware/validation_')
const auth_controller=require('../Controller/auth_controller')

const path = require('path')

const auth_route=express()

const viewPath=path.join(__dirname,'../Templates/views/Auth')

console.log(viewPath)

auth_route.set('view engine','ejs')

auth_route.set('views',viewPath)

auth_route.get('/register',auth_controller.register_loader)

auth_route.post('/register',validatorError,auth_controller.register_data)

auth_route.get('/login',auth_controller.login_loader)

auth_route.post('/login',auth_controller.login_data)

auth_route.get('/logout',auth_controller.logout)

module.exports=auth_route