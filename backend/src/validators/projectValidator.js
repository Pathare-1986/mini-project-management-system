const { body, param } = require('express-validator');

const createProjectRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ max: 120 })
    .withMessage('Project name cannot exceed 120 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
];

const projectIdRules = [
  param('id').isMongoId().withMessage('Invalid project ID'),
];

module.exports = {
  createProjectRules,
  projectIdRules,
};
