const monitoringController = require('../controller/monitoring.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/', monitoringController.getMonitoring);

module.exports =router;