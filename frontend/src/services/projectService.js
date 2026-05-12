import apiClient from '../api/axios';

export const getProjects = async (params = {}) => {
  const { data } = await apiClient.get('/projects', { params });
  return data;
};

export const getProjectById = async (projectId) => {
  const { data } = await apiClient.get(`/projects/${projectId}`);
  return data;
};

export const createProject = async (payload) => {
  const { data } = await apiClient.post('/projects', payload);
  return data;
};

export const deleteProject = async (projectId) => {
  const { data } = await apiClient.delete(`/projects/${projectId}`);
  return data;
};
