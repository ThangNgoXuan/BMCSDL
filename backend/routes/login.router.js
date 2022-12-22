const loginController = require('../controller/login.controller');
const router =require("express").Router();

//router.post('/', );
router.post('/', loginController.login);

module.exports =router;