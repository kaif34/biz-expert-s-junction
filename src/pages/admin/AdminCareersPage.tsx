import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, serverTimestamp, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import { toast } from "sonner";
import { Trash2, Pencil, DatabaseZap, Plus, ExternalLink, Sliders, ChevronDown, ChevronUp, UploadCloud } from "lucide-react";
import { CAREER_JOBS } from "../../components/site/data";

export type CustomField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "url" | "number";
  required: boolean;
};

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  postedDate?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  applyUrl?: string;
  companyLogo?: string;
  customFields?: CustomField[];
  createdAt?: any;
};

const DEPARTMENTS = [
  "IT & Software",
  "SAP & Enterprise Solutions",
  "Non-IT & Operations",
  "Healthcare & Life Sciences",
  "Sales & Business Development",
  "HR & Talent Acquisition",
];

const JOB_TYPES = ["Full-time", "Hybrid", "Remote", "Contract"];

const DEPT_COLORS: Record<string, string> = {
  "IT & Software": "bg-blue-100 text-blue-700",
  "SAP & Enterprise Solutions": "bg-purple-100 text-purple-700",
  "Non-IT & Operations": "bg-orange-100 text-orange-700",
  "Healthcare & Life Sciences": "bg-green-100 text-green-700",
  "Sales & Business Development": "bg-amber-100 text-amber-700",
  "HR & Talent Acquisition": "bg-pink-100 text-pink-700",
};

const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
const selectCls = "w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
const textareaCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none";

export function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState(JOB_TYPES[0]);
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [skills, setSkills] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const fetchJobs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Job[];
      setJobs(jobsData);
    } catch {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { id: `field_${Date.now()}`, label: "", type: "text", required: false }]);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error("Image must be smaller than 2MB");
      return;
    }

    setIsUploadingImage(true);
    try {
      const storageRef = ref(storage, `job-logos/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {}, // Progress tracking can go here
        (error) => {
          console.error("Upload failed", error);
          toast.error("Failed to upload image");
          setIsUploadingImage(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setCompanyLogo(downloadURL);
          setIsUploadingImage(false);
          toast.success("Image uploaded successfully!");
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during upload");
      setIsUploadingImage(false);
    }
  };

  const handleRemoveCustomField = (id: string) => setCustomFields(customFields.filter(f => f.id !== id));
  const handleUpdateCustomField = (id: string, updates: Partial<CustomField>) =>
    setCustomFields(customFields.map(f => f.id === id ? { ...f, ...updates } : f));

  const resetForm = () => {
    setTitle(""); setDepartment(DEPARTMENTS[0]); setLocation(""); setType(JOB_TYPES[0]);
    setExperience(""); setSalary(""); setDescription(""); setResponsibilities("");
    setRequirements(""); setSkills(""); setCompanyLogo(""); setCustomFields([]);
    setEditingJobId(null);
  };

  const handleEditJob = (job: Job) => {
    setTitle(job.title);
    setDepartment(job.department);
    setLocation(job.location);
    setType(job.type);
    setExperience(job.experience);
    setSalary(job.salary);
    setDescription(job.description);
    setResponsibilities(job.responsibilities.join('\n'));
    setRequirements(job.requirements.join('\n'));
    setSkills(job.skills.join(', '));
    setCompanyLogo(job.companyLogo || "");
    setCustomFields(job.customFields || []);
    setEditingJobId(job.id);
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !experience || !salary || !description) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const jobData = {
        title, department, location, type, experience, salary, description,
        companyLogo: companyLogo.trim(),
        responsibilities: responsibilities.split('\n').map(r => r.trim()).filter(Boolean),
        requirements: requirements.split('\n').map(r => r.trim()).filter(Boolean),
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        customFields: customFields.filter(f => f.label.trim())
      };

      if (editingJobId) {
        await updateDoc(doc(db, "jobs", editingJobId), jobData);
        toast.success("Job updated successfully!");
      } else {
        await addDoc(collection(db, "jobs"), {
          ...jobData,
          postedDate: "Just now",
          createdAt: serverTimestamp()
        });
        toast.success("Job published successfully!");
      }
      resetForm();
      setFormOpen(false);
      fetchJobs();
    } catch {
      toast.error(editingJobId ? "Failed to update job" : "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job posting? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
      toast.success("Job deleted");
      fetchJobs();
    } catch {
      toast.error("Failed to delete job");
    }
  };

  const handleSeedJobs = async () => {
    if (!confirm("Import 6 demo jobs into the database?")) return;
    setSeeding(true);
    try {
      const batch = writeBatch(db);
      CAREER_JOBS.forEach(job => {
        const newRef = doc(collection(db, "jobs"));
        const { id: _id, ...jobData } = job as any;
        batch.set(newRef, { ...jobData, applyUrl: "", customFields: [], createdAt: serverTimestamp() });
      });
      await batch.commit();
      toast.success("6 demo jobs imported!");
      fetchJobs();
    } catch {
      toast.error("Failed to import jobs.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-slate-900">Job Postings</h1>
          <p className="text-[11px] text-slate-500">{jobs.length} active {jobs.length === 1 ? "posting" : "postings"}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSeedJobs}
            disabled={seeding}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition disabled:opacity-50"
          >
            <DatabaseZap size={13} />
            {seeding ? "Importing..." : "Import Demos"}
          </button>
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={13} />
            New Job Post
            {formOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {/* Collapsible Create Form */}
      {formOpen && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">{editingJobId ? "Edit Job Posting" : "Create New Job Posting"}</h2>
            <button onClick={() => { setFormOpen(false); resetForm(); }} className="text-slate-400 hover:text-slate-700">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmitJob} className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Job Title *</label>
                <input className={inputCls} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Recruitment Specialist" required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Department *</label>
                <select className={selectCls} value={department} onChange={e => setDepartment(e.target.value)}>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Location *</label>
                <input className={inputCls} value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Ahmedabad, Gujarat (Hybrid)" required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Job Type *</label>
                <select className={selectCls} value={type} onChange={e => setType(e.target.value)}>
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Experience *</label>
                <input className={inputCls} value={experience} onChange={e => setExperience(e.target.value)} placeholder="e.g. 3 - 6 Years" required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Salary / CTC *</label>
                <input className={inputCls} value={salary} onChange={e => setSalary(e.target.value)} placeholder="e.g. ₹6,00,000 – ₹10,00,000 P.A." required />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Company Image (URL or Upload)</label>
              <div className="flex gap-2">
                <input className={inputCls} value={companyLogo} onChange={e => setCompanyLogo(e.target.value)} type="url" placeholder="https://example.com/logo.png" />
                <label className="flex-shrink-0 cursor-pointer flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploadingImage} />
                  {isUploadingImage ? (
                    <span className="w-4 h-4 border-2 border-slate-400 border-t-blue-600 rounded-full animate-spin" />
                  ) : (
                    <UploadCloud size={16} className="text-slate-600" />
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Short Description *</label>
              <textarea className={textareaCls} rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="A brief summary of the role..." required />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Responsibilities (one per line)</label>
                <textarea className={textareaCls} rows={3} value={responsibilities} onChange={e => setResponsibilities(e.target.value)} placeholder={"Source and screen candidates...\nConduct technical interviews..."} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Requirements (one per line)</label>
                <textarea className={textareaCls} rows={3} value={requirements} onChange={e => setRequirements(e.target.value)} placeholder={"Proven HR experience...\nStrong communication skills..."} />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Skills (comma-separated)</label>
              <input className={inputCls} value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. React, Node.js, B2B Sales" />
            </div>

            {/* Custom Fields Builder */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-slate-700 flex items-center justify-center">
                    <Sliders size={12} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Custom Application Fields</p>
                    <p className="text-[10px] text-slate-500">Add extra questions candidates must answer when applying</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomField}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition shadow-sm"
                >
                  <Plus size={12} /> Add Field
                </button>
              </div>

              {customFields.length > 0 && (
                <div className="divide-y divide-slate-100 bg-white">
                  {customFields.map((field, idx) => {
                    const typeConfig: Record<string, { label: string; color: string }> = {
                      text:     { label: "Short Text", color: "bg-blue-100 text-blue-700" },
                      textarea: { label: "Long Text",  color: "bg-purple-100 text-purple-700" },
                      url:      { label: "URL",        color: "bg-green-100 text-green-700" },
                      number:   { label: "Number",     color: "bg-amber-100 text-amber-700" },
                    };
                    const tc = typeConfig[field.type] || typeConfig.text;

                    return (
                      <div key={field.id} className="flex items-center gap-3 px-4 py-3 group hover:bg-slate-50/60 transition-colors">
                        {/* Field number badge */}
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[10px] font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>

                        {/* Label input */}
                        <input
                          placeholder="Field question label (e.g. Portfolio URL, GitHub Profile)"
                          value={field.label}
                          onChange={e => handleUpdateCustomField(field.id, { label: e.target.value })}
                          className="flex-1 min-w-0 text-xs bg-transparent border-0 border-b border-slate-200 focus:border-blue-400 focus:outline-none py-1 text-slate-800 placeholder:text-slate-300 transition-colors"
                        />

                        {/* Type selector as styled pills */}
                        <div className="flex items-center gap-1 shrink-0">
                          {["text", "textarea", "url", "number"].map(t => {
                            const labels: Record<string, string> = { text: "Text", textarea: "Long", url: "URL", number: "Num" };
                            const active = field.type === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => handleUpdateCustomField(field.id, { type: t as any })}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                                  active
                                    ? tc.color + " border-transparent shadow-sm"
                                    : "text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600 bg-white"
                                }`}
                              >
                                {labels[t]}
                              </button>
                            );
                          })}
                        </div>

                        {/* Required toggle */}
                        <label className="flex items-center gap-1.5 shrink-0 cursor-pointer group/toggle">
                          <div
                            onClick={() => handleUpdateCustomField(field.id, { required: !field.required })}
                            className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                              field.required ? "bg-blue-600" : "bg-slate-200"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${
                              field.required ? "left-[18px]" : "left-0.5"
                            }`} />
                          </div>
                          <span className={`text-[10px] font-semibold transition-colors ${field.required ? "text-blue-600" : "text-slate-400"}`}>
                            {field.required ? "Required" : "Optional"}
                          </span>
                        </label>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomField(field.id)}
                          className="shrink-0 p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition opacity-0 group-hover:opacity-100"
                          title="Remove field"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button type="button" onClick={() => { setFormOpen(false); resetForm(); }} className="px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="px-5 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-sm">
                {submitting ? (editingJobId ? "Updating..." : "Publishing...") : (editingJobId ? "Update Job →" : "Publish Job →")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Jobs List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Active Job Postings</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500 mb-3">No job postings yet.</p>
            <button onClick={() => setFormOpen(true)} className="text-xs font-bold text-blue-600 hover:underline">
              + Create your first job post
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {jobs.map(job => (
              <div key={job.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50/60 transition group">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${DEPT_COLORS[job.department] || "bg-slate-100 text-slate-700"}`}>
                      {job.department}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{job.type}</span>
                    {job.applyUrl && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex items-center gap-0.5">
                        <ExternalLink size={9} /> Google Form
                      </span>
                    )}
                    {job.customFields && job.customFields.length > 0 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        {job.customFields.length} Custom Field(s)
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-sm text-slate-900 truncate">{job.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{job.location} • {job.experience} • {job.salary}</p>
                </div>
                <div className="flex shrink-0 gap-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                    title="Edit Job"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition"
                    title="Delete Job"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
