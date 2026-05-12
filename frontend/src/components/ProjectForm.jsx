import { useState } from 'react';

const initialState = { name: '', description: '' };

const ProjectForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Project name is required';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    await onSubmit(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up rounded-[2rem] border border-white/80 bg-white/92 p-5 shadow-soft backdrop-blur">
      <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700 ring-1 ring-brand-100">
        New project
      </div>
      <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">Create Project</h2>
      <p className="mt-1 text-sm text-slate-500">Start a new workstream and give it a clear direction.</p>
      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" htmlFor="project-name">
            Project name
          </label>
          <input
            id="project-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            placeholder="Website redesign"
          />
          {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" htmlFor="project-description">
            Description
          </label>
          <textarea
            id="project-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            placeholder="Add a short description of the project"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Saving...' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
