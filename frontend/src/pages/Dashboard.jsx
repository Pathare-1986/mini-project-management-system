import { useEffect, useMemo, useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';
import { createProject, deleteProject, getProjects } from '../services/projectService';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [confirmProject, setConfirmProject] = useState(null);
  const { pushToast } = useToast();

  const queryParams = useMemo(() => ({ page, limit: 6, search }), [page, search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const fetchProjects = async () => {
        try {
          setLoading(true);
          const response = await getProjects(queryParams);
          setProjects(response.data || []);
          setPagination(response.pagination || { page: 1, pages: 1, total: 0 });
        } catch (error) {
          pushToast({ type: 'error', message: error.message || 'Failed to load projects' });
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [queryParams, pushToast]);

  const handleCreateProject = async (payload) => {
    try {
      setSaving(true);
      await createProject(payload);
      pushToast({ type: 'success', message: 'Project created successfully' });
      const response = await getProjects(queryParams);
      setProjects(response.data || []);
      setPagination(response.pagination || { page: 1, pages: 1, total: 0 });
    } catch (error) {
      pushToast({ type: 'error', message: error.message || 'Project creation failed' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmProject) return;

    try {
      setDeleting(true);
      await deleteProject(confirmProject._id);
      pushToast({ type: 'success', message: 'Project deleted successfully' });
      setConfirmProject(null);
      const response = await getProjects(queryParams);
      setProjects(response.data || []);
      setPagination(response.pagination || { page: 1, pages: 1, total: 0 });
    } catch (error) {
      pushToast({ type: 'error', message: error.message || 'Project deletion failed' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="py-4 sm:py-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="animate-fade-up relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/92 p-6 shadow-soft backdrop-blur">
            <div className="animate-float-soft absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-100/70 blur-3xl" />
            <div className="animate-float-soft absolute -bottom-12 left-12 h-40 w-40 rounded-full bg-brand-100/60 blur-3xl" />
            <div className="relative">
              <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 ring-1 ring-brand-100">
                Work hub
              </div>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Turn scattered work into a focused delivery system.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Create projects, track task progress, and keep everything visually organized in one polished workspace.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200/80 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-900">{pagination.total || 0}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Projects</div>
                </div>
                <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200/80 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-900">{projects.length}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Visible</div>
                </div>
                <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200/80 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-900">{pagination.pages || 1}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Pages</div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Search</div>
                  <input
                    value={search}
                    onChange={(event) => {
                      setPage(1);
                      setSearch(event.target.value);
                    }}
                    className="mt-1 w-full border-0 bg-transparent p-0 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="Search projects by name or description"
                  />
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <Loader label="Loading projects" />
          ) : projects.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} onDelete={setConfirmProject} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-brand-200 bg-white/92 px-6 py-16 text-center shadow-soft backdrop-blur">
              <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-brand-50 ring-1 ring-brand-100" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">No projects found</h2>
              <p className="mt-2 text-sm text-slate-500">Create your first project to get started.</p>
            </div>
          )}

          <Pagination
            page={pagination.page || 1}
            pages={pagination.pages || 1}
            onPrev={() => setPage((current) => Math.max(1, current - 1))}
            onNext={() => setPage((current) => Math.min(pagination.pages || 1, current + 1))}
          />
        </div>

        <div className="space-y-6">
          <ProjectForm onSubmit={handleCreateProject} loading={saving} />
          <div className="animate-fade-up rounded-[2rem] border border-white/80 bg-white/92 p-5 shadow-soft backdrop-blur stagger-1">
            <div className="inline-flex rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 ring-1 ring-slate-200">
              Overview
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
                <div className="text-2xl font-semibold text-brand-800">{pagination.total || 0}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Projects</div>
              </div>
              <div className="rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
                <div className="text-2xl font-semibold text-sky-700">{pagination.pages || 1}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Pages</div>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
                <div className="text-2xl font-semibold text-amber-700">6</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Limit</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={Boolean(confirmProject)}
        title="Delete project"
        message={`Delete ${confirmProject?.name || 'this project'} and all of its tasks? This action cannot be undone.`}
        confirmLabel="Delete project"
        onCancel={() => setConfirmProject(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </section>
  );
};

export default Dashboard;
