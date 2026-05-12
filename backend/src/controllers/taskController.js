const Project = require('../models/Project');
const Task = require('../models/Task');
const ApiFeatures = require('../utils/apiFeatures');
const { AppError } = require('../middleware/errorMiddleware');

const createTask = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    const task = await Task.create({
      project_id: project._id,
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'todo',
      priority: req.body.priority || 'medium',
      due_date: req.body.due_date || null,
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

const getTasksByProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    const features = new ApiFeatures(Task.find({ project_id: project._id }), req.query)
      .filterByStatus()
      .sortByDueDate();

    const tasks = await features.query;

    return res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        ...(req.body.title !== undefined ? { title: req.body.title } : {}),
        ...(req.body.description !== undefined ? { description: req.body.description } : {}),
        ...(req.body.status !== undefined ? { status: req.body.status } : {}),
        ...(req.body.priority !== undefined ? { priority: req.body.priority } : {}),
        ...(req.body.due_date !== undefined ? { due_date: req.body.due_date } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return next(new AppError('Task not found', 404));
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return next(new AppError('Task not found', 404));
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
};
