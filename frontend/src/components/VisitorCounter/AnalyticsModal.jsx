import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Server, Cpu, Globe, ShieldCheck, RefreshCw, Users, Lock, Key, Unlock } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function AnalyticsModal({ isOpen, onClose, visitorCount = null }) {
  const [telemetry, setTelemetry] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    const savedKey = sessionStorage.getItem("portfolio_admin_key");

    const fetchAnalytics = fetch(`${API_URL}/api/visitor/analytics`)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null);

    const fetchLogs = savedKey
      ? fetch(`${API_URL}/api/visitor/logs?limit=25`, {
          headers: { "x-admin-password": savedKey },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            if (res.status === 401) {
              sessionStorage.removeItem("portfolio_admin_key");
            }
            return null;
          })
          .catch(() => null)
      : Promise.resolve(null);

    Promise.all([fetchAnalytics, fetchLogs]).then(([telemetryData, logsData]) => {
      if (isMounted) {
        if (telemetryData) {
          setTelemetry(telemetryData);
        }
        if (logsData && logsData.logs) {
          setLogs(logsData.logs);
          setIsAuthorized(true);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setAuthLoading(true);
    setAuthError(false);

    try {
      const trimmedPass = passwordInput.trim();
      const res = await fetch(`${API_URL}/api/visitor/logs?limit=25`, {
        headers: { "x-admin-password": trimmedPass },
      });

      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        setIsAuthorized(true);
        setAuthError(false);
        sessionStorage.setItem("portfolio_admin_key", trimmedPass);
      } else {
        setAuthError(true);
      }
    } catch {
      setAuthError(true);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLock = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem("portfolio_admin_key");
    setPasswordInput("");
  };

  if (!isOpen) return null;

  const isDbOnline = telemetry?.status === "online";
  const displayViews = telemetry?.total_page_views ?? visitorCount ?? "—";
  const displayDevices = telemetry?.total_unique_devices ?? visitorCount ?? "—";
  const displayNodes = isDbOnline ? (telemetry?.active_nodes ?? "Online / Production Engine") : "Database Offline / Degraded";
  const displayResponse = telemetry?.avg_response_time ?? (isDbOnline ? "< 12 ms" : "—");
  const displayEncryption = telemetry?.security_encryption ?? "HTTPS Encrypted";
  const displayBrowsers = (telemetry?.browser_breakdown && telemetry.browser_breakdown.length > 0)
    ? telemetry.browser_breakdown
    : [
        { name: "Chrome / Chromium", percent: 75 },
        { name: "Safari / WebKit", percent: 15 },
        { name: "Firefox / Gecko", percent: 10 },
      ];

  const metricCards = [
    { label: "Unique Visitors", value: displayDevices.toString(), icon: Users },
    { label: "Total Page Views", value: displayViews.toString(), icon: Globe },
    { label: "Avg Response Time", value: displayResponse, icon: Cpu },
    { label: "Security & Encryption", value: displayEncryption, icon: ShieldCheck },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-zinc-900/95 border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-2xl text-white font-sans custom-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-2xl border border-white/10 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-zinc-800/60 text-white border border-white/10">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">System Telemetry & Visitor Database</h2>
                <div className={`w-2 h-2 rounded-full ${isDbOnline ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
              </div>
              <p className="text-xs font-mono text-zinc-400">
                FastAPI + SQLAlchemy Admin Protected Tracking Node
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-zinc-400 font-mono text-xs">
              <RefreshCw className="w-6 h-6 animate-spin text-white" />
              <span>Querying Database Logs...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* METRIC CARDS */}
              <div className="grid grid-cols-2 gap-4">
                {metricCards.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-zinc-800/40 border border-white/10 backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-zinc-400">{item.label}</span>
                        <IconComp className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg md:text-xl font-bold font-mono text-white truncate block">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* PASSWORD PROTECTED VISITOR DATABASE LOGS TABLE */}
              <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/10 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white" />
                    <h3 className="terminal-label">VISITOR DATABASE LOGS (ADMIN ONLY)</h3>
                  </div>
                  {isAuthorized ? (
                    <button
                      onClick={handleLock}
                      className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all"
                    >
                      <Unlock className="w-3 h-3 text-white" />
                      <span>ADMIN UNLOCKED</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      <Lock className="w-3 h-3" />
                      PROTECTED
                    </span>
                  )}
                </div>

                {isAuthorized ? (
                  /* UNLOCKED: SHOW REAL VISITOR LOGS TABLE */
                  logs.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/10 text-zinc-400">
                            <th className="pb-2 font-normal">IP Address</th>
                            <th className="pb-2 font-normal">Browser</th>
                            <th className="pb-2 font-normal">OS</th>
                            <th className="pb-2 font-normal text-center">Visits</th>
                            <th className="pb-2 font-normal text-right">Last Active</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-zinc-300">
                          {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-2.5 font-semibold text-white flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                {log.ip_address}
                              </td>
                              <td className="py-2.5 truncate max-w-[150px]">{log.browser}</td>
                              <td className="py-2.5">{log.operating_system}</td>
                              <td className="py-2.5 text-center text-white font-bold">{log.visit_count || 1}</td>
                              <td className="py-2.5 text-right text-zinc-400">{log.visited_at}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-black/40 text-center text-xs font-mono text-zinc-400">
                      No visitor records recorded yet in database.
                    </div>
                  )
                ) : (
                  /* LOCKED: PASSWORD GATE FORM */
                  <form onSubmit={handleUnlock} className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-white/10 flex items-center justify-center mx-auto text-white">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Admin Authorization Required</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Backend-authenticated query. Enter your Admin Password to decrypt visitor logs.
                      </p>
                    </div>

                    <div className="flex gap-2 max-w-md mx-auto">
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          setAuthError(false);
                        }}
                        placeholder="Enter Admin Password"
                        className="flex-1 h-[44px] rounded-xl bg-white/5 border border-white/10 px-4 text-xs font-mono outline-none focus:border-white/30 text-white placeholder:text-zinc-600"
                      />
                      <button
                        type="submit"
                        disabled={authLoading}
                        className="h-[44px] px-5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                      >
                        {authLoading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Key className="w-3.5 h-3.5" />
                        )}
                        <span>Unlock Logs</span>
                      </button>
                    </div>

                    {authError && (
                      <p className="text-xs font-mono text-red-400">
                        ❌ Invalid Admin Password. Authentication rejected by backend.
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* BROWSER DISTRIBUTION */}
              <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/10 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <h3 className="terminal-label">BROWSER ENVIRONMENT DISTRIBUTION</h3>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    {isDbOnline ? "DATABASE SYNCED" : "OFFLINE"}
                  </span>
                </div>
                <div className="space-y-3">
                  {displayBrowsers.map((b, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-300">{b.name}</span>
                        <span className="text-white font-bold">{b.percent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${b.percent}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
