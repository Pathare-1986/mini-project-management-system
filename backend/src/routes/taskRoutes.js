const express = require('express');
const { createTask, getTasksByProject, updateTask, deleteTask } = require('../controllers/taskController');
const validateRequest = require('../middleware/validateMiddleware');
const { projectTaskIdRules, taskIdRules, createTaskRules, updateTaskRules } = require('../validators/taskValidator');

const router = express.Router({ mergeParams: true });

router.post('/projects/:projectId/tasks', projectTaskIdRules, createTaskRules, validateRequest, createTask);
router.get('/projects/:projectId/tasks', projectTaskIdRules, validateRequest, getTasksByProject);
router.put('/tasks/:id', taskIdRules, updateTaskRules, validateRequest, updateTask);
router.delete('/tasks/:id', taskIdRules, validateRequest, deleteTask);

module.exports = router;
