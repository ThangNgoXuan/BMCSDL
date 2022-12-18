const jwt = require("jsonwebtoken");
const oracledb = require('oracledb');
require('dotenv').config();

const monitoringController = {
    verifyTokenMonitoring: async(req,res,next)=>{
        const token= req.headers.token;
        if(token){
            const accessToken = token;
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(error,{user,password})=>{
                if(error){
                    res.status(403).json("Token is not valid")
                }
                if(RegExp("PASS").test(user)){
                    req.User = user;
                    req.Password = password;
                    next();
                }
                else{
                    res.status(401).json("you don't have permission")
                }

                //next();
            });
        }else{
            res.status(401).json("you have not token")
        }
    },
    getMonitoring: async (req,res)=>{
        accuracyController.verifyTokenMonitoring(req,res,()=>{
            const conn = oracledb.getConnection({
                user                : req.User,
                password            : req.Password,
                connectionString    : "192.168.182.1/orcl"
            });
            res.status(200).send("login");
        });
    }
}

module.exports = monitoringController;