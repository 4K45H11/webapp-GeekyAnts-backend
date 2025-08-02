const express = require('express')
const {createProject,assignEngineers,getProjects} = require('../controller/project.controller')

const {protect,authorizeRoles} = require('../middleware/auth.middle')

const router = express.Router()

router.post('/',protect,authorizeRoles('admin','manager'),createProject)
router.get('/',protect,getProjects)
router.post('/assign',protect,authorizeRoles('admin','manager'),assignEngineers)

module.exports = router;

