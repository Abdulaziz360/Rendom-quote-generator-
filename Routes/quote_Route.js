const express=require('express')
const ejs=require('ejs')
const quote_controller=require('../Controller/quote_controller')
const authentication=require('../midleware/auth')
const path = require('path')
const cookie_parser=require('cookie-parser')
const quote_route=express()

const viewPath=path.join(__dirname,'../Templates/views')

quote_route.use(cookie_parser())

quote_route.set('view engine','ejs')

quote_route.set('views',viewPath)

quote_route.get('/home',authentication,quote_controller.quote_loader)

quote_route.get('/share-tweet',authentication,quote_controller.share_tweet_loader)

quote_route.get('/share-whatsapp',authentication,quote_controller.share_whatsapp_loader)
module.exports=quote_route