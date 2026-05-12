import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ProjectDetails from '../pages/ProjectDetails';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/projects/:id" element={<ProjectDetails />} />
  </Routes>
);

export default AppRoutes;
