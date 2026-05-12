import apiClient from '../api/axios';

export const getProjectTasks = async (projectId, params = {}) => {
  const { data } = await apiClient.get(`/projects/${projectId}/tasks`, { params });
  return data;
};

export const createTask = async (projectId, payload) => {
  const { data } = await apiClient.post(`/projects/${projectId}/tasks`, payload);
  return data;
};

export const updateTask = async (taskId, payload) => {
  const { data } = await apiClient.put(`/tasks/${taskId}`, payload);
  return data;
};

export const deleteTask = async (taskId) => {
  const { data } = await apiClient.delete(`/tasks/${taskId}`);
  return data;
};
