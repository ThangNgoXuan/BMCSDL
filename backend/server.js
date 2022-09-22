const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, function(){
    console.log('server runing in port: ' + process.env.PORT)
})

app.get('/', function(req, res){
    res.send("helloword");
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes