const approvalController = require('../controller/approval.controller');
const router =require("express").Router();

//router.post('/', );
router.get('/',approvalController.verifyTokenApproval ,approvalController.getApproval);
router.put('/update',approvalController.verifyTokenApproval ,approvalController.update);

module.exports =router;