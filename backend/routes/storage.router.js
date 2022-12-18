const storageController = require('../controller/storage.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/', storageController.getStorage);

module.exports =router;