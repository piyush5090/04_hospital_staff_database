require("dotenv").config;

module.exports = (req,res,next) =>{
    const apikey = req.headers["x-api-key"];

    if(!apikey || apikey !== process.env.PASSKEY){
        return res.status(403).json({message: "Forbidden: Invalid Passkey"});
    }
    next();
};