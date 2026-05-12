import { createContext, useContext, useMemo, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback((toast) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, type: 'success', ...toast }]);
    window.setTimeout(() => removeToast(id), 3200);
  }, [removeToast]);

  const value = useMemo(() => ({ toasts, pushToast, removeToast }), [toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }

  return context;
};
