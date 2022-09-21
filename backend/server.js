const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, function(){
    console.log('server runing in port: ' + process.env.PORT)
})

app.get('/', function(req, res){
    res.send("helloword");
})
