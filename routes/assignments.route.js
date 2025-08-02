const express = require('express');
const { protect, authorizeRoles } = require('../middleware/auth.middle');
const {
  getAllAssignments,
  getAssignmentsByEngineer
} = require('../controller/assignment.controller');

const router = express.Router();

router.get('/', protect, authorizeRoles('admin', 'manager'), getAllAssignments);
//dashboard
router.get('/:id', protect, getAssignmentsByEngineer); 

module.exports = router;
