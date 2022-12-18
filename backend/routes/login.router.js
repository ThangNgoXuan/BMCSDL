const loginController = require('../controller/login.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/', loginController.login);

module.exports =router;