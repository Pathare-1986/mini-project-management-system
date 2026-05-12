const express = require('express');
const { createProject, getProjects, getProjectById, deleteProject } = require('../controllers/projectController');
const validateRequest = require('../middleware/validateMiddleware');
const { createProjectRules, projectIdRules } = require('../validators/projectValidator');

const router = express.Router();

router.post('/', createProjectRules, validateRequest, createProject);
router.get('/', getProjects);
router.get('/:id', projectIdRules, validateRequest, getProjectById);
router.delete('/:id', projectIdRules, validateRequest, deleteProject);

module.exports = router;
