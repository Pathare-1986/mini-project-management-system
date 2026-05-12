const Project = require('../models/Project');
const Task = require('../models/Task');
const ApiFeatures = require('../utils/apiFeatures');
const { AppError } = require('../middleware/errorMiddleware');

const buildProjectSummary = async (projectId) => {
  const [taskStats, totalTasks] = await Promise.all([
    Task.aggregate([
      { $match: { project_id: projectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Task.countDocuments({ project_id: projectId }),
  ]);

  const stats = taskStats.reduce(
    (accumulator, item) => ({
      ...accumulator,
      [item._id]: item.count,
    }),
    { todo: 0, 'in-progress': 0, done: 0 }
  );

  return {
    totalTasks,
    completedTasks: stats.done,
    progress: totalTasks ? Math.round((stats.done / totalTasks) * 100) : 0,
    breakdown: stats,
  };
};

const createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description || '',
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    return next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Project.find(), req.query)
      .search(['name', 'description'])
      .paginate();

    const [projects, totalProjects] = await Promise.all([
      features.query.sort({ created_at: -1 }),
      Project.countDocuments(features.query.getQuery()),
    ]);

    const enrichedProjects = await Promise.all(
      projects.map(async (project) => ({
        ...project.toObject(),
        summary: await buildProjectSummary(project._id),
      }))
    );

    return res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: enrichedProjects,
      pagination: {
        total: totalProjects,
        page: features.pagination.page,
        limit: features.pagination.limit,
        pages: Math.max(1, Math.ceil(totalProjects / features.pagination.limit)),
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    const tasks = await Task.find({ project_id: project._id }).sort({ created_at: -1 });
    const summary = await buildProjectSummary(project._id);

    return res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      data: {
        ...project.toObject(),
        tasks,
        summary,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    await Task.deleteMany({ project_id: req.params.id });

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
};
