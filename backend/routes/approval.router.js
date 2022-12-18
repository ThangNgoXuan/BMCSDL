const approvalController = require('../controller/approval.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/',approvalController.verifyTokenApproval ,approvalController.getApproval);

module.exports =router;