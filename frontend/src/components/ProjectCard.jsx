import { Link } from 'react-router-dom';

const formatDate = (value) => {
  if (!value) return 'No due date';
  return new Date(value).toLocaleDateString();
};

const ProjectCard = ({ project, onDelete }) => {
  const progress = project.summary?.progress ?? 0;

  return (
    <article className="animate-fade-up group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/92 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-100/60 blur-2xl transition duration-300 group-hover:bg-brand-200/80" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700 ring-1 ring-brand-100">
            Project
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">{project.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{project.description || 'No description provided.'}</p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(project)}
          className="shrink-0 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 hover:text-rose-800"
        >
          Delete
        </button>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>{project.summary?.totalTasks || 0} tasks</span>
          <span>{progress}% complete</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/80">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
        <span>Created {formatDate(project.created_at)}</span>
        <Link to={`/projects/${project._id}`} className="font-semibold text-brand-700 transition hover:text-brand-600">
          View details
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
