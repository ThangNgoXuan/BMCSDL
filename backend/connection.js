const oracledb = require('oracledb');

const connectionOrcl ={
    default: async (req,res) =>{
        try {
            const conn = await oracledb.getConnection({
                user                : "hr",
                password            : "hr",
                connectionString    : "192.168.182.1/orcl"
            });
            //const result = await conn.execute("SELECT * FROM DEPARTMENTS");
            //console.log("Default connection successfully!")
            // let result = await conn.execute(sql);
            // res.status(200).send(result.rows);
            //return result;
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = connectionOrcl;