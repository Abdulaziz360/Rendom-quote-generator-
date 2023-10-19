const mongoose=require('mongoose')
require('dotenv').config()
// const auth=require('./midleware/auth')
// db connect...
mongoose.connect(process.env.DB).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{console.log(err)})

const express=require('express')

const cors=require('cors')
const path=require('path')
const cookie_parser=require('cookie-parser')
const app=express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use(cookie_parser())
const fetch_user=require('./midleware/userlogin_data')
const quote_route=require('./Routes/quote_Route')
const main_Route=require('./Routes/main_Route')
const auth_Route=require('./Routes/auth_Route')

app.use(fetch_user)
app.use('/',main_Route)
app.use('/',auth_Route)
app.use('/',quote_route)
app.use((req, res) => {
    res.redirect('/404'); // Render the 404 page
});
app.listen(3000,()=>{
    console.log(`server runnin on 3000`)
})