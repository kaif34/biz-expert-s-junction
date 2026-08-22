import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { toast } from "sonner";
import {
  FileText, Download, User, Phone, Mail, Clock, Briefcase,
  Trash2, Users, FileCheck, Search, X
} from "lucide-react";

type Application = {
  id: string;
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  experience?: string;
  currentCtc?: string;
  expectedCtc?: string;
  noticePeriod?: string;
  message?: string;
  role?: string;
  fileName?: string;
  resumeUrl?: string;
  customAnswers?: Record<string, string>;
  jobId?: string;
  jobTitle?: string;
  jobDepartment?: string;
  createdAt?: any;
};

export function AdminApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "talent">("jobs");
  const [jobApps, setJobApps] = useState<Application[]>([]);
  const [talentApps, setTalentApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJob, setFilterJob] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const [jobSnap, talentSnap] = await Promise.all([
        getDocs(collection(db, "applications")),
        getDocs(collection(db, "talent_network")),
      ]);

      const sortFn = (a: Application, b: Application) =>
        (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0);

      const jobData = jobSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Application[];
      const talentData = talentSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Application[];

      setJobApps(jobData.sort(sortFn));
      setTalentApps(talentData.sort(sortFn));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleDelete = async (id: string, col: "applications" | "talent_network") => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, col, id));
      toast.success("Application deleted");
      fetchApplications();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const currentList = activeTab === "jobs" ? jobApps : talentApps;
  
  const uniqueCategories = Array.from(
    new Set(currentList.map(app => (activeTab === "jobs" ? app.jobTitle : app.role)).filter(Boolean))
  ) as string[];

  const filtered = currentList.filter((app) => {
    const name = app.fullName || app.name || "";
    const q = searchQuery.toLowerCase();
    const matchesSearch = (
      name.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.jobTitle?.toLowerCase().includes(q) ||
      app.phone?.includes(q)
    );
    const categoryValue = activeTab === "jobs" ? app.jobTitle : app.role;
    const matchesCategory = filterJob === "All" || categoryValue === filterJob;

    return matchesSearch && matchesCategory;
  });

  // Reset filter when tab changes
  useEffect(() => {
    setFilterJob("All");
  }, [activeTab]);

  const tabClass = (tab: "jobs" | "talent") =>
    `flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
      activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
    }`;

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h1 className="text-lg font-black text-slate-900">Candidate Submissions</h1>
          <p className="text-[11px] text-slate-500">
            {jobApps.length} job applications · {talentApps.length} talent network submissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Tab Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button onClick={() => setActiveTab("jobs")} className={tabClass("jobs")}>
              <Briefcase size={13} /> Job Apps ({jobApps.length})
            </button>
            <button onClick={() => setActiveTab("talent")} className={tabClass("talent")}>
              <Users size={13} /> Talent Pool ({talentApps.length})
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone or job title..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-8 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
              <X size={13} />
            </button>
          )}
        </div>
        {uniqueCategories.length > 0 && (
          <select
            value={filterJob}
            onChange={(e) => setFilterJob(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition sm:w-[200px]"
          >
            <option value="All">All {activeTab === "jobs" ? "Jobs" : "Roles"}</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-400">Loading candidates...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-slate-400">
            <FileText className="h-10 w-10 mb-2 opacity-30" />
            <p className="text-sm font-semibold">No candidates found</p>
            {searchQuery && <p className="text-xs mt-1">Try clearing the search filter</p>}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((app) => {
              const candidateName = app.fullName || app.name || "Anonymous";
              const isExpanded = expanded === app.id;
              const hasCustomAnswers = app.customAnswers && Object.keys(app.customAnswers).length > 0;

              return (
                <div key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Row */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-[11px] font-black">{candidateName.charAt(0).toUpperCase()}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 truncate">{candidateName}</span>
                        {activeTab === "jobs" && app.jobTitle && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 truncate max-w-[200px]">
                            {app.jobTitle}
                          </span>
                        )}
                        {activeTab === "talent" && app.role && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{app.role}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-0.5 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1"><Mail size={10} /><a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a></span>
                        <span className="flex items-center gap-1"><Phone size={10} /><a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a></span>
                        {app.experience && <span className="flex items-center gap-1"><Briefcase size={10} />{app.experience}</span>}
                        <span className="flex items-center gap-1"><Clock size={10} />{app.createdAt?.toMillis ? new Date(app.createdAt.toMillis()).toLocaleDateString("en-IN") : "Recent"}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Download Resume"
                          className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 px-2 py-1 rounded-md transition"
                        >
                          <Download size={12} /> PDF
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-300 flex items-center gap-0.5 px-2 py-1">
                          <FileCheck size={10} /> No PDF
                        </span>
                      )}
                      {(app.message || hasCustomAnswers) && (
                        <button
                          onClick={() => setExpanded(isExpanded ? null : app.id)}
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 px-2 py-1 rounded-md transition hover:bg-slate-100"
                        >
                          {isExpanded ? "Hide" : "More"}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(app.id, activeTab === "jobs" ? "applications" : "talent_network")}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-3 space-y-2 ml-11">
                      {(app.noticePeriod || app.expectedCtc || app.currentCtc) && (
                        <div className="flex flex-wrap gap-3 text-[11px] text-slate-600 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                          {app.noticePeriod && <span><span className="text-slate-400">Notice:</span> {app.noticePeriod}</span>}
                          {app.currentCtc && <span><span className="text-slate-400">Current CTC:</span> {app.currentCtc}</span>}
                          {app.expectedCtc && <span><span className="text-slate-400">Expected CTC:</span> {app.expectedCtc}</span>}
                        </div>
                      )}
                      {app.message && (
                        <div className="text-[11px] bg-white border border-slate-200 rounded-md px-3 py-2">
                          <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Cover Note</p>
                          <p className="text-slate-700">{app.message}</p>
                        </div>
                      )}
                      {hasCustomAnswers && (
                        <div className="text-[11px] bg-blue-50/60 border border-blue-100 rounded-md px-3 py-2 space-y-1">
                          <p className="text-[9px] font-bold text-blue-600 uppercase mb-1">Custom Answers</p>
                          {Object.entries(app.customAnswers!).map(([q, a]) => (
                            <div key={q}><span className="font-bold text-slate-800">{q}:</span> <span className="text-slate-600">{a}</span></div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
