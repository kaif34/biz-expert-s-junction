import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { toast } from "sonner";
import { Settings, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";

export function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [dbPassword, setDbPassword] = useState("123456");

  // Fetch current password on mount
  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const docRef = doc(db, "admin_settings", "credentials");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().password) {
          setDbPassword(docSnap.data().password);
        }
      } catch (error) {
        console.error("Failed to fetch admin settings", error);
        toast.error("Failed to load settings.");
      }
    };
    fetchPassword();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentPassword !== dbPassword) {
      toast.error("Current password is incorrect.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, "admin_settings", "credentials");
      await setDoc(docRef, { password: newPassword }, { merge: true });
      
      setDbPassword(newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Failed to update password", error);
      toast.error("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-lg pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <Settings className="text-blue-600" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900">Settings</h1>
          <p className="text-xs text-slate-500">Manage your admin account credentials.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
          <ShieldCheck size={18} className="text-slate-700" />
          <h2 className="text-sm font-bold text-slate-800">Change Admin Password</h2>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-sm">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={14} />
              </div>
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className={inputCls}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={14} />
              </div>
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className={inputCls}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={14} />
              </div>
              <input
                type={showNew ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className={inputCls}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !currentPassword || !newPassword || !confirmPassword}
            className="w-full bg-blue-600 text-white font-bold text-sm py-2.5 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-6"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
