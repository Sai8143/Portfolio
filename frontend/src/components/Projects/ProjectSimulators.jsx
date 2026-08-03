import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ShieldCheck, Ticket, RefreshCw, Send, Check } from "lucide-react";

export default function ProjectSimulators({ activeSimId, onClose, onToast }) {
  if (!activeSimId) return null;

  // AcciSense State
  const [accState, setAccState] = useState("idle");
  const [coords, setCoords] = useState({ lat: "17.3850", lng: "78.4867" });

  // Fake News State
  const [headline, setHeadline] = useState("");
  const [analysis, setAnalysis] = useState(null);

  // Tambola State
  const [ticket, setTicket] = useState(() => generateTambolaTicket());
  const [calledNumbers, setCalledNumbers] = useState([7, 23, 45, 88, 12, 64]);

  function generateTambolaTicket() {
    const grid = Array.from({ length: 3 }, () => Array(9).fill(null));
    for (let row = 0; row < 3; row++) {
      let filled = 0;
      while (filled < 5) {
        const col = Math.floor(Math.random() * 9);
        if (grid[row][col] === null) {
          const num = col * 10 + Math.floor(Math.random() * 9) + 1;
          grid[row][col] = num;
          filled++;
        }
      }
    }
    return grid;
  }

  const runAccidentSimulation = () => {
    setAccState("triggering");
    setTimeout(() => {
      setAccState("dispatched");
      onToast({ type: "success", message: "Emergency units dispatched to 17.3850° N, 78.4867° E!" });
    }, 2000);
  };

  const runFakeNewsCheck = () => {
    if (!headline.trim()) return;
    const lower = headline.toLowerCase();
    const suspiciousWords = ["secret", "miracle", "shocking", "bankrupt", "alien", "100%", "guaranteed"];
    const isSuspicious = suspiciousWords.some((w) => lower.includes(w));
    const score = isSuspicious ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 25) + 75;

    setAnalysis({
      score,
      label: score >= 60 ? "Authentic Content" : "Misleading / Suspicious Content",
      isAuthentic: score >= 60,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-zinc-900/90 border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-2xl text-white font-sans"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-2xl border border-white/10 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* ACCISENSE SIMULATOR */}
          {activeSimId === "accisense" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-zinc-800/60 text-white border border-white/10">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AcciSense Incident Response Simulator</h3>
                  <p className="terminal-label">ROAD INCIDENT & GPS DISPATCH PROTOCOL</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-800/40 border border-white/10 space-y-4 mb-6 backdrop-blur-md">
                <div className="flex items-center justify-between text-sm font-mono">
                  <span className="text-zinc-400">Sensor Status:</span>
                  <span className="text-white flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Active Monitoring
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-mono">
                  <span className="text-zinc-400">GPS Coordinates:</span>
                  <span className="text-white font-bold">{coords.lat}° N, {coords.lng}° E</span>
                </div>
              </div>

              {accState === "dispatched" && (
                <div className="p-4 mb-6 rounded-2xl bg-zinc-800/60 border border-white/20 text-white text-sm flex items-center gap-3">
                  <Check className="w-5 h-5 shrink-0 text-white" />
                  <span>Incident Logged. Automatic Alert dispatched to nearest Ambulance Network (ETA 4 mins).</span>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  disabled={accState === "triggering"}
                  onClick={runAccidentSimulation}
                  className="w-full py-3.5 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 flex items-center justify-center gap-2 transition-all shadow-md text-xs"
                >
                  {accState === "triggering" ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    "Trigger Impact Simulation"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* FAKE NEWS SIMULATOR */}
          {activeSimId === "fakenews" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-zinc-800/60 text-white border border-white/10">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Fake News NLP Evaluator</h3>
                  <p className="terminal-label">AI TEXT CREDIBILITY ANALYSIS</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <textarea
                  rows="3"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Paste a news headline to evaluate (e.g. 'Shocking miracle cures released!')..."
                  className="w-full p-4 rounded-2xl bg-zinc-800/40 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-white/20"
                />

                {analysis && (
                  <div className="p-4 rounded-2xl border border-white/20 bg-zinc-800/60 text-white text-sm">
                    <div className="flex items-center justify-between mb-1 font-bold">
                      <span>{analysis.label}</span>
                      <span>Credibility: {analysis.score}%</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={runFakeNewsCheck}
                className="w-full py-3.5 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 flex items-center justify-center gap-2 transition-all shadow-md text-xs"
              >
                <Send className="w-4 h-4" /> Analyze Credibility Score
              </button>
            </div>
          )}

          {/* TAMBOLA SIMULATOR */}
          {activeSimId === "tambola" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-zinc-800/60 text-white border border-white/10">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Tambola Live Ticket Generator</h3>
                    <p className="terminal-label">AUTOMATED 3x9 BINGO MATRIX VERIFICATION</p>
                  </div>
                </div>
                <button
                  onClick={() => setTicket(generateTambolaTicket())}
                  className="p-2.5 rounded-xl border border-white/10 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-300"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* TICKET GRID */}
              <div className="p-4 rounded-2xl bg-zinc-800/40 border border-white/10 mb-6 backdrop-blur-md">
                <div className="grid grid-rows-3 gap-2">
                  {ticket.map((row, rIdx) => (
                    <div key={rIdx} className="grid grid-cols-9 gap-1.5">
                      {row.map((cell, cIdx) => (
                        <div
                          key={cIdx}
                          className={`h-10 rounded-xl flex items-center justify-center text-xs font-mono font-bold border ${
                            cell === null
                              ? "bg-black/40 border-white/5 text-transparent"
                              : calledNumbers.includes(cell)
                              ? "bg-white text-black border-white"
                              : "bg-zinc-800/60 border-white/10 text-white"
                          }`}
                        >
                          {cell || "•"}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs font-mono text-zinc-400 text-center">
                Called numbers highlighted in solid white. Automated ticket validation ready.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
