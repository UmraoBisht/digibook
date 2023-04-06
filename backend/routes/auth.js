const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'helloWorld243';

/*********************************************************************************
//Route 1: Create a user using : Post "api/auth/createuser". Doesn't require Authentication(no Login Reqiured)
// endPoint:api/auth/createuser"
******************************************************************/
router.post('/createuser', [
    // Some Validations
    body('name', "Name Should be Atleast 3 character").isLength({ min: 3 }),
    body('email', "Enter Unique Email").isEmail(),
    body('pwd', "Password Should be Atleast 5 character").isLength({ min: 5 }),
    body('phone', "Enter 10 digit Mobile no").isLength({ min: 10, max: 10 }),
]
    , async (req, res) => {
        // obj={
        //     Name:"Umrao",
        //     RollNo:43
        // }
        let success=false;
        // ****************if there is any error return bad request********************************
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success,Errors: errors.array() })
        }

        try {

            // *****************check whether the user with this email Exist already**********************
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, Error: "Oops Email Already Exist!" })
            }

            // generate password hash and salt to protect user from bad persons
            const salt = await bcrypt.genSalt(10);
            const pwdHash = await bcrypt.hash(req.body.pwd, salt);

            // create New User
            user = await User.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    pwd: pwdHash,
                    phone: req.body.phone
                }
            )
            // .then(user=>res.json(user))
            // .catch(error=>{console.error(error)
            // res.json({Errors:"Email Can't Be Duplicate"})});
            // const user = User(req.body);
            // user.save();
            const data = req.body;
            const authToken = jwt.sign(data, JWT_SECRET);
            success=true;
            res.json({ success,authToken });
            // res.json(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({success,error:"Internal Server Error! Sorry for inconvenience!"});
        }
    }
)


/*********************************************************************************
//Route 2: login a user using : Post "api/auth/login". Doesn't require Authentication(no Login Required)
// endPoint:api/auth/login"
******************************************************************/

router.post('/login', [
    body('email', "Enter Unique Email").isEmail(),
    body('pwd', "Password Should be Atleast 5 character").isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    // ****************if there is any error return bad request********************************
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, Errors: errors.array() })
    }
    const { email, pwd } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, Error: "User Not Found!" })
        }

        const pwdCompare = await bcrypt.compare(pwd, user.pwd);
        if (!pwdCompare) {
            return res.status(400).json({success, Error: "Please Try to Login With Correct Crendentials" })
        }
        const data = {
            user:{ 
                id: user.id 
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success:success,authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success,error:"Internal Server Error! Sorry for inconvenience!"});
    }
}
)

/*********************************************************************************
//Route 3: get logined  user  details using : Post "api/auth/getuser". Require Authentication(need Login Required)
// endPoint:api/auth/getuser"
******************************************************************/

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let success=false;
        const userId = req.user.id;
        // console.log(userId);
        const user = await User.findById(userId).select('-pwd');
        // res.send(user);
        success=true;
        res.json({success,user });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success,error:"Internal Server Error! Sorry for inconvenience!"});
    }
})

module.exports = router;