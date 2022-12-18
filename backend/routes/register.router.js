const registerController = require('../controller/register.controller');
const router =require("express").Router();

router.post('/', registerController.addRegister);
router.get('/', registerController.search);

module.exports =router;