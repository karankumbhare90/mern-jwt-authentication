const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('Test is working Properly');
}

// Register Endpoints
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check name was enterd
        if(!name){
            return res.json({
                error : 'Name is required..!!'
            })
        }

        // Check password was enterd
        if(!password || password.length < 6){
            return res.json({
                error : 'Password is required and should be at least 6 character long.!'
            })
        }

        // Check the valid and exist of email
        const emailExist = await User.findOne({email});

        if(emailExist){
            return res.json({
                error : 'Email is already in use.'
            })
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name, 
            email, 
            password : hashedPassword,
        })

        return res.json(user)

    } 
    catch (error) {
        console.log(error);
    }
}


// Login Endpoints
const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({email});

        if(!user){
            return res.json({
                error : "No user found",
            })
        }

        // Check password match
        const match = await comparePassword(password, user.password);

        if(match){
            jwt.sign({email : user.email, id : user._id, name : user.name}, process.env.JWT_TOKEN, {}, (err, token) => {
                if(err){
                    throw err;
                }
                res.cookie('token', token).json(user);
            })
        }
        if(!match){
            res.json({
                error : "Password Not Match..!!"
            })
        }

    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const { token } = req.body;

    if(token){
        jwt.verify(token, process.env.JWT_TOKEN, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null);
    }
}

module.exports = {
    test, 
    registerUser,
    userLogin,
    getProfile
};