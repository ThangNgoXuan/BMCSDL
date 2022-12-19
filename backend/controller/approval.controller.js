const jwt = require("jsonwebtoken");
const oracledb = require('oracledb');
require('dotenv').config();

const approvalController = {
    verifyTokenApproval: async(req,res,next)=>{
        const token= req.headers.token;
        if(token){
            const accessToken = token;
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(error,{user,password})=>{
                if(error){
                    res.status(403).json("Token is not valid")
                }
                if(RegExp("BPXETDUYET").test(user)){
                    req.User = user;
                    req.Password = password;
                    next();
                }
                else{
                    res.status(401).json("you don't have permission")
                }
            });
        }else{
            res.status(401).json("you have not token")
        }
    },
    getApproval: async (req,res)=>{
        try {
            const user =  req.User;
            const password = req.Password;
            const conn = await oracledb.getConnection({
                user                : user,
                password            : password,
                connectionString    : "192.168.182.1/orcl"
            });
            if(conn){
                const result = await conn.execute(
                    "SELECT * FROM passport.dsgiahanhochieu");
                return res.status(200).send(result.rows);  
            }
            return res.status(404).send("wwrong");
            
        } catch (error) {
            return res.status(500).json(error);
        }         
    },
    update: async (req,res)=>{
        try {
            const user =  req.User;
            const password = req.Password;
            const conn = await oracledb.getConnection({
                user                : user,
                password            : password,
                connectionString    : "192.168.182.1/orcl"
            });
            if(conn){
                passcode = req.body.passcode; 
                confirm = req.body.confirm
                const result = await conn.execute(
                     "UPDATE passport.dsgiahanhochieu SET confirm= :1 where PASSCODE = :2", [confirm, passcode], {autoCommit: true});
                conn.close();
                return res.status(200).send(result); 
            }
            return res.status(404).send("wwrong");           
        } catch (error) {
            return res.status(500).json(error);
        }    
    },
    search: async (req,res) =>{
        try {
            const user =  req.User;
            const password = req.Password;
            const conn = await oracledb.getConnection({
                user                : user,
                password            : password,
                connectionString    : "192.168.182.1/orcl"
            });
            if(conn){
                const passcode = req.body.passcode;
                const result = await conn.execute(
                    "SELECT * FROM passport.dsgiahanhochieu WHERE passcode = :1",[passcode]);
                res.status(200).send(result.rows);
            }
            return res.status(404).send("wwrong"); 
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = approvalController;