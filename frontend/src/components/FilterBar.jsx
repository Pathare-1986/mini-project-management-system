const FilterBar = ({ status, sort, onStatusChange, onSortChange }) => (
  <div className="animate-fade-up flex flex-col gap-3 rounded-[2rem] border border-white/80 bg-white/92 p-4 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div className="inline-flex rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 ring-1 ring-slate-200">
        Filters
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-900">Task filters</p>
      <p className="text-sm text-slate-500">Focus on the right work and keep priorities clear.</p>
    </div>
    <div className="flex flex-col gap-3 sm:flex-row">
      <select value={status} onChange={(event) => onStatusChange(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100">
        <option value="all">All statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
      <select value={sort} onChange={(event) => onSortChange(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100">
        <option value="desc">Due date: newest</option>
        <option value="asc">Due date: oldest</option>
      </select>
    </div>
  </div>
);

export default FilterBar;
