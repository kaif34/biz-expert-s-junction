import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  LogOut,
  Users,
  Menu,
  X,
  ChevronRight,
  Building2,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/careers", label: "Manage Jobs", icon: Briefcase },
  { to: "/admin/applications", label: "Applications", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const isActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-56 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
            <Building2 size={14} className="text-white" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-900 leading-tight">BEJ Admin</p>
            <p className="text-[9px] text-slate-400 leading-tight">Control Panel</p>
          </div>
          <button
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-2 mt-1">
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <item.icon
                  size={15}
                  className={active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}
                />
                <span className="flex-1 text-[13px]">{item.label}</span>
                {active && <ChevronRight size={12} className="opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-2.5 py-3 border-t border-slate-100">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
            <div className="w-6 h-6 rounded-full bg-linear-to-br from-slate-300 to-slate-400 flex items-center justify-center">
              <Users size={11} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800">Admin</p>
              <p className="text-[9px] text-slate-400">Super User</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-2 text-[12px] font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
          <div className="flex-1">
            {NAV_ITEMS.map((item) =>
              isActive(item) ? (
                <div key={item.to} className="flex items-center gap-2">
                  <item.icon size={14} className="text-blue-600" />
                  <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                </div>
              ) : null,
            )}
          </div>
          <a
            href="/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            View Public Site →
          </a>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
