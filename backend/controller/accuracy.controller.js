const jwt = require("jsonwebtoken");
const oracledb = require('oracledb');
require('dotenv').config();

const accuracyController = {
    verifyTokenAccuracy: async (req,res,next)=>{
        const token= req.headers.token;
        if(token){
            const accessToken = token;
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(error,{user,password})=>{
                if(error){
                    res.status(403).json("Token is not valid")
                }
                if(RegExp("XTQUAN").test(user)){
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
    getInfoPP: async (req,res)=>{
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
                    "SELECT resident.ttcongdanhcm.CMND, resident.ttcongdanhcm.NAME, resident.ttcongdanhcm.birth, resident.ttcongdanhcm.sex,\
                    resident.ttcongdanhcm.national, resident.ttcongdanhcm.address,resident.ttcongdanhcm.district, resident.ttcongdanhcm.begindatecmnd,\
                    resident.tthochieu.passcode, resident.tthochieu.begindate, resident.tthochieu.expireddate, resident.tthochieu.status \
                    FROM resident.tthochieu INNER JOIN resident.ttcongdanhcm ON resident.tthochieu.CMND = resident.ttcongdanhcm.CMND");
                //const result = await conn.execute("SELECT * FROM resident.ttcongdanhcm")
                return res.status(200).send(result.rows);  
            }
            return res.status(404).send("wwrong");
            
        } catch (error) {
            return res.status(500).json(error);
        }        
    },
    getRgister: async (req,res)=>{
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
    Update: async (req,res)=>{
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
}

module.exports = accuracyController;