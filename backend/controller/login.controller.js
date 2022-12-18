const oracledb = require('oracledb');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const loginController ={
   login: async (req,res) =>{
        try {
            const User = req.body.user;
            const Password = req.body.password;
            if(User =='RESIDENT' || User =='resident' || User =='PASSPORT' || User =='passport'){
                return res.status(404).json("Wrong!!");
            }
            const conn = await oracledb.getConnection({
                user                : User,
                password            : Password,
                connectionString    : "192.168.182.1/orcl"
            });
            if(conn){
                const accessToken = jwt.sign({
                    user: User,
                    password: Password,
                },
                process.env.JWT_ACCESS_KEY,
                {expiresIn:"12h"}
                );
                return res.status(200).json({User,accessToken});  
            }
        } catch (error) {
            res.status(500).json(error);
        }
   }
}

module.exports = loginController;