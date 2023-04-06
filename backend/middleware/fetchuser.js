const jwt = require('jsonwebtoken');
const JWT_SECRET ='helloWorld243';

// this function is called middleware
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object 
    const token = req.header('auth-token');
    // console.log(token);

    if (!token) {
        res.status(401).send({ error: "Please Authenticate using Valid Token!" });
    }

    // if There is any error in jwtToken
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data.user;
        // console.log(req.user);
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using Valid Token!" });
    }
}

module.exports = fetchuser;