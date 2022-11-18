import express from 'express';
import { userController } from '../controller/user.controller.js';

const router = express.Router();

router.get('/', function(req,res, next) {
    res.render('', {title: 'Đăng nhập',});
});