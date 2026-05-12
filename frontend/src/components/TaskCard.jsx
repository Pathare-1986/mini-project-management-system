const formatDate = (value) => {
  if (!value) return 'No due date';
  return new Date(value).toLocaleDateString();
};

const statusStyles = {
  todo: 'bg-sky-100 text-sky-700 ring-1 ring-sky-200',
  'in-progress': 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  done: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
};

const TaskCard = ({ task, onEdit, onDelete }) => (
  <article className="animate-fade-up relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/92 p-5 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
    <div className="absolute left-0 top-0 h-full w-1 bg-brand-500" />
    <div className="flex items-start justify-between gap-4 pl-2">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-base font-semibold tracking-tight text-slate-900">{task.title}</h4>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusStyles[task.status]}`}>
            {task.status}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{task.description || 'No description provided.'}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 transition hover:bg-brand-100"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
        >
          Delete
        </button>
      </div>
    </div>

    <div className="mt-5 flex flex-wrap items-center gap-2 pl-2 text-xs text-slate-500">
      <span className="rounded-full bg-slate-50 px-3 py-1.5 font-medium ring-1 ring-slate-200">Priority: {task.priority}</span>
      <span className="rounded-full bg-slate-50 px-3 py-1.5 font-medium ring-1 ring-slate-200">Due: {formatDate(task.due_date)}</span>
      <span className="rounded-full bg-slate-50 px-3 py-1.5 font-medium ring-1 ring-slate-200">Created: {formatDate(task.created_at)}</span>
    </div>
  </article>
);

export default TaskCard;
