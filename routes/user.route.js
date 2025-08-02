const express = require('express');
const { protect, authorizeRoles } = require('../middleware/auth.middle');
const { getAllUsers } = require('../controller/user.controller');

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getAllUsers);

module.exports = router;
