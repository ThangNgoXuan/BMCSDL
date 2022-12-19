const accuracyController = require('../controller/accuracy.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/infoPP', accuracyController.verifyTokenAccuracy,accuracyController.getInfoPP);
router.get('/getRegister', accuracyController.verifyTokenAccuracy,accuracyController.getRgister);
router.put('/update',accuracyController.verifyTokenAccuracy, accuracyController.Update);
router.get('/searchInfoPP', accuracyController.verifyTokenAccuracy,accuracyController.searchInfo);
router.get('/searchGetRegister', accuracyController.verifyTokenAccuracy,accuracyController.searchRegister);

module.exports =router;