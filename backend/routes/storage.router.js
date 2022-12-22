const storageController = require('../controller/storage.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/', storageController.verifyTokenStorage, storageController.getStorage);
router.get('/passport',  storageController.verifyTokenStorage, storageController.getPassport);
router.put('/update',storageController.verifyTokenStorage, storageController.updatePP);
router.get('/search', storageController.verifyTokenStorage, storageController.searchDS);
router.get('/searchPP', storageController.verifyTokenStorage, storageController.searchPassport);
router.put('/update1',storageController.verifyTokenStorage, storageController.updatePP1);
module.exports =router;