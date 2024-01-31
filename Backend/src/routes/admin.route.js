const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')

router.post('/login',adminController.loginAdmin)
router.get('/deactivedaccount',adminController.deactivedAccount)
router.get('/activedaccount',adminController.activedAccount)
module.exports = router