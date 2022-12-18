const accuracyController = require('../controller/accuracy.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/infoPP', accuracyController.verifyTokenAccuracy,accuracyController.getInfoPP);
router.get('/getRegister', accuracyController.verifyTokenAccuracy,accuracyController.getRgister);

module.exports =router;