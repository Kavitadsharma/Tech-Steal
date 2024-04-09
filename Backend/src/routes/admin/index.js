const router = require('express').Router();
const AdminController = require('./admin.controller');
const { adminAuth } = require('../../middleware/auth');

router.post('/login', AdminController.login());


module.exports = router;
