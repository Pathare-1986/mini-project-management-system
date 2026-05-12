const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorMiddleware);

module.exports = app;
