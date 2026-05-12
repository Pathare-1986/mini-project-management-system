import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  due_date: '',
};

const TaskForm = ({ onSubmit, loading, initialValues = null, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || '',
        description: initialValues.description || '',
        status: initialValues.status || 'todo',
        priority: initialValues.priority || 'medium',
        due_date: initialValues.due_date ? String(initialValues.due_date).slice(0, 10) : '',
      });
    } else {
      setForm(initialState);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = 'Task title is required';
    }

    if (form.due_date && Number.isNaN(Date.parse(form.due_date))) {
      nextErrors.due_date = 'Due date must be valid';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    await onSubmit({
      ...form,
      due_date: form.due_date || null,
    });

    if (!initialValues) {
      setForm(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up rounded-[2rem] border border-white/80 bg-white/92 p-5 shadow-soft backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700 ring-1 ring-brand-100">
            Task builder
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">{initialValues ? 'Edit Task' : 'Add Task'}</h2>
        </div>
        {initialValues && (
          <button type="button" onClick={onCancel} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
            Cancel
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-500">Capture the work, set the pace, and keep execution clear.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" htmlFor="task-title">
            Title
          </label>
          <input
            id="task-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            placeholder="Design onboarding screens"
          />
          {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" htmlFor="task-description">
            Description
          </label>
          <textarea
            id="task-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            placeholder="Add task details"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" htmlFor="task-status">
            Status
          </label>
          <select
            id="task-status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" htmlFor="task-priority">
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" htmlFor="task-due-date">
            Due date
          </label>
          <input
            id="task-due-date"
            name="due_date"
            type="date"
            value={form.due_date}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
          {errors.due_date && <p className="mt-1 text-xs text-rose-600">{errors.due_date}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Saving...' : initialValues ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
