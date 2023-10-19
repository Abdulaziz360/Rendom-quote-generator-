const express = require('express');
const userModel = require('../models/user_model');

const validator = require('validator');

const validatorError = async (req, res, next) => {
    try {
        const { fname, lname, email, phone, password}= req.body; // Extract the "gender" field
        const error ={};
        const message=''
        if (!/^[a-zA-Z]+$/.test(fname)) {
            console.log('fnm:',fname)
            // console.log('objects:',Object.keys(error))
            error.fname = 'This field can only contain alphabetic characters';
        }

        if (!/^[a-zA-Z]+$/.test(lname)) {
            error.lname = 'This field can only contain alphabetic characters';
        }
        if (!validator.isEmail(email)) {
            error.email = 'Invalid email';
        }
        
        const exist_email = await userModel.findOne({ email:email});
        // console.log('email:',exist_email)
        if (exist_email) {
            error.email = 'Email already exists';
        }
        
        // const exist_resume = await candidate_Model.findOne({resume});
        // // if (exist_resume) {
        // //     error.exist_resume = 'already exists';
        // // }
        
        if (!validator.isNumeric(phone)) {
            error.phone = 'This field only takes numeric values';
        }
        if (password.length < 8) {
            error.password = 'Password must be at least 8 characters';
        }
      
        // console.log('objex:',Object.keys())
        if (Object.keys(error).length > 0) {
            // console.log('Errors in mw')
            // If there are errors, render the register view with error messages
            return res.render('register', { error, message });
        }
        else{
        // If no errors, proceed to the next middleware
        next();
        console.log('midleware')
        }
    } catch (error) {
        console.log(`error in middleware:${error}`)
        res.send('Middleware error');
    }
};

module.exports = validatorError;
