const express = require('express')
const {getAllEngineers,createEngineer} = require('../controller/engineer.controller')
const {protect,authorizeRoles} = require('../middleware/auth.middle')

const router = express.Router()

router.post('/', protect, authorizeRoles('admin','manager'),createEngineer)

router.get('/',protect, getAllEngineers)

module.exports = router