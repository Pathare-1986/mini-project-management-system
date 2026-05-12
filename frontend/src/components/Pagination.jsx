const Pagination = ({ page, pages, onPrev, onNext }) => (
  <div className="flex items-center justify-between rounded-[2rem] border border-white/80 bg-white/92 px-4 py-3 shadow-soft backdrop-blur">
    <button
      type="button"
      onClick={onPrev}
      disabled={page <= 1}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Previous
    </button>
    <p className="rounded-full bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-500 ring-1 ring-slate-200">
      Page {page} of {pages}
    </p>
    <button
      type="button"
      onClick={onNext}
      disabled={page >= pages}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
