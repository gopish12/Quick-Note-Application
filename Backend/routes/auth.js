const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");

// For verifying the authToken (jsonwebtoken)
const JWT_signature = "harshKantBh@tnagaR";

// ROUTE:1
// Create a new user using POST request at /api/createUser
// Does not require auth
router.post('/createUser',
    [body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('name', 'Name must be atleast 3 characters').isLength({ min: 3 })],
    async (req, res) => {
        //Check for errors
        let success=false;
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        //Check if the user with same email exits or not
        try {
            let user = await User.findOne({ "email": req.body.email });
            if (user) {
                return res.status(400).json({ success,"error": "Sorry a user with the same e-mail already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            //password encryption
            let securePassword = await bcrypt.hash(req.body.password, salt);
            
            user = await User.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email
            })
            const data = {
                user: {
                    id: user._id
                }
            }
            success=true;
            const authToken = jwt.sign(data, JWT_signature);
            res.json({ success,authToken });
        }

        catch (error){
            console.error(error.message);
            res.status(500).send("Some Error Occured");
        }
    },
);

// ROUTE:2
// Authenticate a user (login requires password)
// no login required
router.post('/login',
    [body('email', 'Enter a valid email').isEmail()],
    [body('password', 'Password cannot be blank').exists()],
    async (req, res) => {
        //Check for errors
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ success,"error": "Invalid Credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success,"error": "Invalid Credentials" });
            }
            success=true;
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_signature);
            res.json({ success,authToken });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occured");
        }
    })

// ROUTE:3
// Fetch the data of logged in User
// user must be logged in in order to hit this endpoint

router.post('/getUser',fetchUser,async(req,res)=>{
    try{
        const userId=await req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);    
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;