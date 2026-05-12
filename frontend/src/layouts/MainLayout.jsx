import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => (
  <div className="relative min-h-screen overflow-hidden text-slate-900">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-float-soft absolute -left-24 top-12 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />
      <div className="animate-float-soft absolute right-0 top-40 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl" />
      <div className="animate-float-soft absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-100/40 blur-3xl" />
    </div>
    <Navbar />
    <main className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">{children}</main>
  </div>
);

export default MainLayout;
