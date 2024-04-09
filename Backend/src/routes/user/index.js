const express = require('express');
const router = express.Router();

const { auth, adminAuth } = require('../../middleware/auth');


const UserController = require('./user.controller');

router.post('/signup', UserController.signup());
router.post('/login', UserController.login());
router.get('/', auth, UserController.getUser());
router.post('/update', auth, UserController.updateUser());
router.get('/all', adminAuth, UserController.getAllUsers());
router.get('/:id',adminAuth,UserController.userForAdmin())
module.exports = router;
