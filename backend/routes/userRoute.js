const express = require("express")
const UserModel = require("../model/userModel")
const userRouter = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const emailHelper = require('../config/emailHelper');
const validator = require("email-validator")
const authMiddlewares = require("../middlewares/authMiddlewares")

const SALT_ROUNDS = 12

userRouter.post("/register", async (req, res, next) => {
    try {
        const isEmailValid = validator.validate(req.body.email)

        if(!isEmailValid) {
            return res.status(200).send({
                status: false,
                message: "Please enter valid email address"
            })
        }

        const isUserExist = await UserModel.findOne({
            email: req.body.email
        })

        if(isUserExist) {
            return res.status(200).send({
                status: false,
                message: "This email address already Exist!"
            })
        }

        // crate a new user object locally
        const user = new UserModel(req.body)

        //Generating salt and hashing our password
        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword

        // Thenm save it to database
        await user.save()

        res.send({
            status: true,
            message: "User registration is successfull",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
    
})

userRouter.post("/login", async (req, res) => {
    try {
        const isEmailValid = validator.validate(req.body.email)

        if(!isEmailValid) {
            return res.status(404).send({
                status: false,
                message: "Please enter valid email address"
            })
        }
        // crate a new user object locally
        const user = await UserModel.findOne({
            email: req.body.email
        })

        if(!user) {
            return res.status(404).send({
                status: false,
                message: "No user found"
            })
        }

        // Checking is password is valid or not
        // if(user.password !== req.body.password) {
        //     return res.status(200).send({
        //         status: false,
        //         message: "No user/password combo found"
        //     })
        // }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordValid) {
            return res.status(404).send({
                status: false,
                message: "No user/pass combo found!"
            })
        }

        const token = jwt.sign(
            // First argument is store extra data in JWT token
            {
                userId: user._id
            },
            // Second argument is the secreat key 
            process.env.JWT_SECREAT,
            //Set the tooken expire
            {
                expiresIn: "1d"
            }
        )

        console.log(token);

        res.send({
            status: true,
            message: "User login successfully",
            role: user.role,
            token
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
    
})

userRouter.get("/get-current-user", authMiddlewares, async (req, res) => {
    try {
        const userId = req.body.userId
        console.log(userId);
        if(!userId) {
            return res.status(500).send({
                status: false,
                message: "Somethis went wrong! Try again"
            })
        }

        const user = await UserModel.findById(userId).select("-password")

        return res.send({
            status: true,
            user
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Somethis went wrong! Try again"
        })
    }
})


userRouter.post("/reset-password", async (req, res) => {
    try {
        const email = req.body.email
        const user = await UserModel.findOne({email: email})
        if(!user) {
            return res.status(404).send({
                status: false,
                message: "Invalid email address"
            })
        } 

        const otp = Math.floor(Math.random() * 10000)
        
        await emailHelper("otp.html", user.email, {
            name: user.name,
            otp: otp
        });

        await UserModel.findOneAndUpdate({ email: req.body.email }, { otp: otp })

        return res.send({
            status: true,
            message: "Otp send to your email address"
        })
        
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Somethis went wrong! Try again"
        })
    }
})

userRouter.post("/validate-otp", async (req, res) => {
    try {
        const email = req.body.email
        const otp = parseInt(req.body.otp)
        const user = await UserModel.findOne({email: email})
        if(!user) {
            return res.status(404).send({
                status: false,
                message: "Invalid email address"
            })
        }
        
        if(otp !== user.otp) {
            return res.status(404).send({
                status: false,
                message: "Invalid otp"
            })
        }

        return res.send({
            status: true,
            message: "otp authenticated successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Somethis went wrong! Try again"
        })
    }
})

userRouter.post("/new-password", async (req, res) => {
    console.log(req.body);
    
    try {
        const email = req.body.email
        const password = req.body.password

        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(password, salt)


        const user = await UserModel.findOneAndUpdate({ email: email }, { password: hashedPassword }, { new: true })
        if(!user) {
            return res.status(404).send({
                status: false,
                message: "Password not updated"
            })
        }

        return res.send({
            status: true,
            message: "Password reset successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Somethis went wrong! Try again"
        })
    }
})


module.exports = userRouter