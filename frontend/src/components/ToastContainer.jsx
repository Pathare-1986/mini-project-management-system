import { useToast } from '../context/ToastContext';

const palette = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-sky-200 bg-sky-50 text-sky-800',
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => removeToast(toast.id)}
          className={`rounded-2xl border px-4 py-3 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)] ${palette[toast.type]}`}
        >
          <div className="text-sm font-semibold">{toast.title || (toast.type === 'error' ? 'Error' : 'Success')}</div>
          <div className="mt-1 text-sm leading-6">{toast.message}</div>
        </button>
      ))}
    </div>
  );
};

export default ToastContainer;
