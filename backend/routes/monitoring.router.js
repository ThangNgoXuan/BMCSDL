const monitoringController = require('../controller/monitoring.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/', monitoringController.verifyTokenMonitoring , monitoringController.getMonitoring);
router.get('/search', monitoringController.verifyTokenMonitoring , monitoringController.search);

module.exports =router;