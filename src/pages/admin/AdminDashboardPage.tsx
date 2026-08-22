import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Briefcase, FileText, Users, TrendingUp, ArrowRight, Clock } from "lucide-react";

export function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalTalent: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobsSnap, appsSnap, talentSnap] = await Promise.all([
          getDocs(collection(db, "jobs")),
          getDocs(collection(db, "applications")),
          getDocs(collection(db, "talent_network")),
        ]);
        setStats({
          totalJobs: jobsSnap.size,
          totalApplications: appsSnap.size,
          totalTalent: talentSnap.size,
          loading: false,
        });
      } catch {
        setStats((s) => ({ ...s, loading: false }));
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Active Job Posts",
      value: stats.totalJobs,
      icon: Briefcase,
      color: "bg-blue-500",
      link: "/admin/careers",
    },
    {
      label: "Job Applications",
      value: stats.totalApplications,
      icon: FileText,
      color: "bg-emerald-500",
      link: "/admin/applications",
    },
    {
      label: "Talent Network",
      value: stats.totalTalent,
      icon: Users,
      color: "bg-purple-500",
      link: "/admin/applications",
    },
    {
      label: "Total Candidates",
      value: stats.totalApplications + stats.totalTalent,
      icon: TrendingUp,
      color: "bg-amber-500",
      link: "/admin/applications",
    },
  ];

  const quickLinks = [
    {
      title: "Create New Job Posting",
      desc: "Publish a new role with custom fields or Google Form",
      icon: Briefcase,
      to: "/admin/careers",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Review Applications",
      desc: "View candidates, download resumes, check answers",
      icon: FileText,
      to: "/admin/applications",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Talent Network Pool",
      desc: "Browse candidates who submitted general CVs",
      icon: Users,
      to: "/admin/applications",
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white shadow-lg shadow-blue-200">
        <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 className="text-xl font-black tracking-tight">Welcome Back, Admin 👋</h1>
        <p className="text-blue-100 text-xs mt-1">Biz Expert's Junction Recruitment Control Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((card) => (
          <Link key={card.label} to={card.link} className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-slate-300 transition-all duration-200">
            <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon size={15} className="text-white" />
            </div>
            <div>
              {stats.loading ? (
                <div className="h-6 w-12 bg-slate-200 animate-pulse rounded mb-1" />
              ) : (
                <p className="text-2xl font-black text-slate-900">{card.value}</p>
              )}
              <p className="text-[11px] text-slate-500 font-medium">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h2 className="text-sm font-bold text-slate-900 mb-3">Quick Actions</h2>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                to={link.to}
                className={`flex items-center gap-3 p-3 rounded-lg border ${link.color} hover:shadow-sm transition-all group`}
              >
                <div className="shrink-0">
                  <link.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{link.title}</p>
                  <p className="text-[10px] opacity-70 truncate">{link.desc}</p>
                </div>
                <ArrowRight size={12} className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Instructions / Tips */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h2 className="text-sm font-bold text-slate-900 mb-3">Admin Guide</h2>
          <div className="space-y-3">
            {[
              { step: "1", title: "Create a Job Post", desc: "Go to Manage Jobs → fill the form → Publish Job" },
              { step: "2", title: "Add Google Form Link", desc: "Paste your Google Form URL to redirect candidates" },
              { step: "3", title: "Add Custom Fields", desc: "Click + Add Custom Field to add extra questions" },
              { step: "4", title: "Import Demo Jobs", desc: "Click 'Import Demo Jobs' to pre-fill 6 example roles" },
              { step: "5", title: "Review Applications", desc: "Open Applications tab to see candidates & PDFs" },
            ].map((tip) => (
              <div key={tip.step} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {tip.step}
                </span>
                <div>
                  <p className="text-[12px] font-bold text-slate-800">{tip.title}</p>
                  <p className="text-[10px] text-slate-500">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
        <Clock size={10} />
        <span>Dashboard data refreshes on each page load. Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
