import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/65 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-sm font-bold text-white shadow-soft transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand-700">
            M
          </span>
          <span>
            <span className="block font-display text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">Mini Project Hub</span>
            <span className="block text-xs font-medium uppercase tracking-[0.28em] text-slate-500">Plan • build • deliver</span>
          </span>
        </Link>
        <div className="hidden rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-800 shadow-sm md:block">
          Project control center
        </div>
      </div>
    </header>
  );
};

export default Navbar;
