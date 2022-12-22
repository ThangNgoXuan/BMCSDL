const express = require('express');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors =require('cors');
// const cors = require('cors');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, function(){
    console.log('server runing in port: ' + process.env.PORT)
})

app.get('/', function(req, res){
    res.send("helloword");
})
app.use(cors({credentials: true, origin: true}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
//routes
const registerRouter = require('./routes/register.router');
app.use('/register',registerRouter);

const loginRouter = require('./routes/login.router');
app.use('/login', loginRouter);

const accuracyRouter = require('./routes/accuracy.router');
app.use('/accuracy',accuracyRouter); 

const approvalRouter = require('./routes/approval.router');
app.use('/approval',approvalRouter); 

const storageRouter = require('./routes/storage.router');
app.use('/storage',storageRouter);

const monitoringRouter = require('./routes/monitoring.router');
app.use('/monitoring',monitoringRouter);