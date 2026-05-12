const ConfirmModal = ({ open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.20)]">
        <div className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-700 ring-1 ring-rose-100">
          Confirm action
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} disabled={loading} className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Working...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
