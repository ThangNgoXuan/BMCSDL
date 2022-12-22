const jwt = require("jsonwebtoken");
const oracledb = require('oracledb');
require('dotenv').config();

const storageController = {
    verifyTokenStorage: async(req,res,next)=>{
        const token= req.headers.token;
        if(token){
            const accessToken = token;
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(error,{user,password})=>{
                if(error){
                    res.status(403).json("Token is not valid")
                }
                if(RegExp("BPLUUTRU").test(user)){
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
    getStorage: async (req,res)=>{
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
                    "SELECT * FROM passport.dsgiahanhochieu where extend=''");
                return res.status(200).send(result.rows);  
            }
            return res.status(404).send("wwrong");            
        } catch (error) {
            return res.status(500).json(error);
        }    
    },
    getPassport: async (req,res)=>{
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
                    "SELECT * FROM resident.tthochieu");
                conn.close();
                return res.status(200).send(result.rows);  
            }
            
            return res.status(404).send("wwrong");            
        } catch (error) {
            return res.status(500).json(error);
        }    
    },
    searchDS: async (req,res)=>{
        try {
            const user =  req.User;
            const password = req.Password;
            const conn = await oracledb.getConnection({
                user                : user,
                password            : password,
                connectionString    : "192.168.182.1/orcl"
            });
            if(conn){
                passcode = req.body.passcode
                const result = await conn.execute(
                    "SELECT * FROM passport.dsgiahanhochieu WHERE passcode = :1",
                    [passcode]);
                return res.status(200).send(result.rows);  
            }
            return res.status(404).send("wwrong");
            
        } catch (error) {
            return res.status(500).json(error);
        }    
    },
    searchPassport: async (req,res)=>{
        try {
            const user =  req.User;
            const password = req.Password;
            const conn = await oracledb.getConnection({
                user                : user,
                password            : password,
                connectionString    : "192.168.182.1/orcl"
            });
            if(conn){
                passcode = req.body.passcode
                const result = await conn.execute(
                    "SELECT * FROM resident.tthochieu WHERE passcode = :1",
                    [passcode]);
                return res.status(200).send(result.rows);  
            }
            return res.status(404).send("wwrong");           
        } catch (error) {
            return res.status(500).json(error);
        }    
    },
    updatePP: async (req,res)=>{
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
                expireddate =req.body.expireddate; 
                const result = await conn.execute(
                    "UPDATE resident.TTHOCHIEU SET expireddate= :1, status='Còn hạn sử dụng' where PASSCODE = :2", [expireddate, passcode], {autoCommit: true});
                // const result1 = await conn.execute(
                //     "UPDATE passport.dsgiahanhochieu SET extend= 'Đã gia hạn' where PASSCODE = :1", [passcode], {autoCommit: true});
               
                conn.close();
                
                return res.status(200).send(result); 
            }
            return res.status(404).send("wwrong");           
        } catch (error) {
            return res.status(500).json(error);
        }    
    },
    updatePP1: async (req,res)=>{
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
                const result1 = await conn.execute(
                    "UPDATE passport.dsgiahanhochieu SET extend= 'Đã gia hạn' where PASSCODE = :1",[passcode],{autoCommit: true}); //, [passcode], {autoCommit: true}
                conn.close();        
                return res.status(200).send(result1); 
            }
            return res.status(404).send("wwrong");           
        } catch (error) {
            return res.status(500).json(error);
        }    
    },
}

module.exports = storageController;