const { body, param } = require('express-validator');

const taskIdRules = [
  param('id').isMongoId().withMessage('Invalid task ID'),
];

const projectTaskIdRules = [
  param('projectId').isMongoId().withMessage('Invalid project ID'),
];

const createTaskRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ max: 160 })
    .withMessage('Task title cannot exceed 160 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done'])
    .withMessage('Status must be todo, in-progress, or done'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('due_date')
    .optional({ nullable: true })
    .custom((value) => value === null || !Number.isNaN(Date.parse(value)))
    .withMessage('Due date must be a valid date'),
];

const updateTaskRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Task title cannot be empty')
    .isLength({ max: 160 })
    .withMessage('Task title cannot exceed 160 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done'])
    .withMessage('Status must be todo, in-progress, or done'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('due_date')
    .optional({ nullable: true })
    .custom((value) => value === null || !Number.isNaN(Date.parse(value)))
    .withMessage('Due date must be a valid date'),
];

module.exports = {
  taskIdRules,
  projectTaskIdRules,
  createTaskRules,
  updateTaskRules,
};
