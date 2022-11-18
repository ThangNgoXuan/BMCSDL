
const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const bodyParser = require('body-parser');
const { request, response } = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

// async function fun(){
//     let con;

//     try {
//         con = await oracledb.getConnection({
//             user: 'hr',
//             password: 'hr',
//             connectString: 'localhost/orcl'
//         })

//         const data = await con.execute(
//             `select * from all_users`,
//         );

//         console.log(data.rows);
//         }
//         catch (err) {
//             console.error(err);
//         }
// }

// fun();


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }