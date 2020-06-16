const jsonwebtoken = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    // console.log("in is auth");
    if(!authHeader)
    {
        // console.log("no auth header set");
        const error = new Error("Not authenticated");
        throw error;
    }
    const token = authHeader.split(' ')[1];
    // console.log("tokin in isauth" + token);
    let decodedtoken;
    try{
        decodedtoken = jsonwebtoken.verify(token, 'secretkeyofankitaforstickynotesapp');
    }
    catch(error)
    {
        throw error;
    }
    if(!decodedtoken)
    {
        const error = new Error("Not authenticated");
        throw error;
    }
    req.userId = decodedtoken.userId;
    // console.log("all set in isAuth.js");
    next();
};