const jwt = require('jsonwebtoken');
const usermodel = require('../models/user_model');
require('dotenv').config();

const is_jwt = async (req, res, next) => {
    try {
        const token = req.cookies.mytoken;
        console.log(`cookie: ${token}`);
        if (!token) {
            return res.redirect('/login');
        } else {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    // Token verification failed (likely expired)
                    // Remove the token from cookies
                    res.clearCookie('mytoken');
                    // Redirect to the login page
                    return res.redirect('/login'); // Adjust the login page URL as needed
                } else {
                    // Token is valid, you can access `decoded` data if needed
                    next();
                }
            });
        }
    } catch (error) {
        console.log(`error in auth middleware: ${error}`);
    }
};

module.exports = is_jwt;
