const oracledb = require('oracledb');
const registerController = {
    addRegister: async (req,res) =>{
        try {
        const conn = await oracledb.getConnection({
            user                : "PASSPORT",
            password            : "PASSPORT",
            connectionString    : "192.168.182.1/orcl"
        });
        if(conn){
            const name = req.body.name;
            const email = req.body.email;
            const phone = req.body.phone;
            const quan = req.body.quan;
            const address = req.body.address;
            const dayofbirth = req.body.dayofbirth; 
            const sex = req.body.sex;
            const idPassport = req.body.idPassport;
            const idPerson= req.body.idPerson;
            const idhousehold = req.body.idhousehold;
            const registerDate = req.body.registerDate;
            // const name = "req.body.name";
            // const email = "req.body.email";
            // const phone = "req.body.phone";
            // const quan = "req.body.quan";
            // const address = "req.body.address";
            // const dayofbirth = "req.body.dayofbirth"; 
            // const sex = "req.body.sex";
            // const idPassport = "req.body.idPassport";
            // const idPerson= "req.body.idPersion";
            // const registerDate = "req.body.registerDate";
            const result = await conn.execute( 
                "INSERT INTO dsgiahanhochieu VALUES (:registerDate, :name, :dayofbirth, :sex, :idPerson, :address, :quan, :phone, :email, :idPassport, 'Đang xác thực', '', '','Chưa gia hạn')",
                [registerDate, name, dayofbirth, sex, idPerson, address, quan, phone, email, idPassport],
                {autoCommit: true});
            res.status(200).send("Register successfully");   
        }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    search: async (req,res) =>{
        try {
        const conn = await oracledb.getConnection({
            user                : "PASSPORT",
            password            : "PASSPORT",
            connectionString    : "192.168.182.1/orcl"
        });
        const passcode = req.headers.passcode;
        const result = await conn.execute(
            "SELECT * FROM passport.dsgiahanhochieu WHERE passcode = :1",[passcode]);
        res.status(200).send(result.rows);    
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = registerController;