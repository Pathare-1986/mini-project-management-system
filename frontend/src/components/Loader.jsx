const Loader = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center py-12 text-slate-500">
    <div className="flex items-center gap-3 rounded-full border border-white/80 bg-white/92 px-4 py-2 shadow-soft backdrop-blur">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </div>
  </div>
);

export default Loader;
