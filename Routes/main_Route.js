const express=require('express')

const main_controller=require('../Controller/main_controller')

const path = require('path')

const main_route=express()

const viewPath=path.join(__dirname,'../Templates/views')

console.log(viewPath)

main_route.set('view engine','ejs')

main_route.set('views',viewPath)

main_route.get('/',main_controller.main_loader)

main_route.get('/about',main_controller.about_loader)
main_route.get('/404',main_controller.not_found_loader)

module.exports=main_route