import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import ConfirmModal from '../components/ConfirmModal';
import { getProjectById } from '../services/projectService';
import { createTask, deleteTask, getProjectTasks, updateTask } from '../services/taskService';
import { useToast } from '../context/ToastContext';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sort, setSort] = useState('desc');
  const [editingTask, setEditingTask] = useState(null);
  const [confirmTask, setConfirmTask] = useState(null);
  const { pushToast } = useToast();

  const visibleTasks = useMemo(() => tasks, [tasks]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await getProjectById(id);
      setProject(response.data);
      setTasks(response.data?.tasks || []);
    } catch (error) {
      pushToast({ type: 'error', message: error.message || 'Failed to load project' });
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async (nextStatus = statusFilter, nextSort = sort) => {
    try {
      const response = await getProjectTasks(id, {
        ...(nextStatus !== 'all' ? { status: nextStatus } : {}),
        sort: nextSort,
      });
      setTasks(response.data || []);
    } catch (error) {
      pushToast({ type: 'error', message: error.message || 'Failed to refresh tasks' });
    }
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const handleSubmitTask = async (payload) => {
    try {
      setSaving(true);
      if (editingTask) {
        await updateTask(editingTask._id, payload);
        pushToast({ type: 'success', message: 'Task updated successfully' });
      } else {
        await createTask(id, payload);
        pushToast({ type: 'success', message: 'Task created successfully' });
      }
      setEditingTask(null);
      await loadProject();
      await loadTasks();
    } catch (error) {
      pushToast({ type: 'error', message: error.message || 'Task save failed' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!confirmTask) return;

    try {
      setActionLoading(true);
      await deleteTask(confirmTask._id);
      pushToast({ type: 'success', message: 'Task deleted successfully' });
      setConfirmTask(null);
      await loadProject();
      await loadTasks();
    } catch (error) {
      pushToast({ type: 'error', message: error.message || 'Task deletion failed' });
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    if (project) {
      loadTasks(statusFilter, sort);
    }
  }, [statusFilter, sort, project]);

  if (loading) {
    return (
      <section className="py-4 sm:py-6">
        <Loader label="Loading project" />
      </section>
    );
  }

  if (!project) {
    return (
      <section className="py-4 sm:py-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Project not found</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 sm:py-6">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="animate-fade-up relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="animate-float-soft absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-100/60 blur-3xl" />
            <p className="relative text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Project details</p>
            <h1 className="relative mt-2 font-display text-4xl font-semibold tracking-tight text-slate-900">{project.name}</h1>
            <p className="relative mt-4 text-sm leading-6 text-slate-600">{project.description || 'No description provided.'}</p>
            <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/80">
                <div className="text-2xl font-semibold text-slate-900">{project.summary?.totalTasks || 0}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Tasks</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/80">
                <div className="text-2xl font-semibold text-slate-900">{project.summary?.progress || 0}%</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Progress</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/80">
                <div className="text-2xl font-semibold text-slate-900">{project.summary?.completedTasks || 0}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Done</div>
              </div>
            </div>
            <div className="relative mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>Task completion</span>
                <span>{project.summary?.progress || 0}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${project.summary?.progress || 0}%` }} />
              </div>
            </div>
          </div>
          <TaskForm
            onSubmit={handleSubmitTask}
            loading={saving}
            initialValues={editingTask}
            onCancel={() => setEditingTask(null)}
          />
        </div>

        <div className="space-y-6">
          <FilterBar
            status={statusFilter}
            sort={sort}
            onStatusChange={setStatusFilter}
            onSortChange={setSort}
          />

          <div className="space-y-4">
            {visibleTasks.length ? (
              visibleTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={setConfirmTask}
                />
              ))
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-soft">
                <h2 className="text-lg font-semibold text-slate-900">No tasks yet</h2>
                <p className="mt-2 text-sm text-slate-500">Create tasks to track work for this project.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={Boolean(confirmTask)}
        title="Delete task"
        message={`Delete ${confirmTask?.title || 'this task'}? This action cannot be undone.`}
        confirmLabel="Delete task"
        onCancel={() => setConfirmTask(null)}
        onConfirm={handleDeleteTask}
        loading={actionLoading}
      />
    </section>
  );
};

export default ProjectDetails;
