import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-white" />,
    error: <AlertCircle className="w-5 h-5 text-white" />,
    info: <Info className="w-5 h-5 text-white" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-6 right-6 z-50 max-w-md"
      >
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/20 bg-black/90 backdrop-blur-2xl shadow-2xl text-white font-sans">
          <div className="shrink-0">{icons[toast.type] || icons.info}</div>
          <p className="text-sm font-medium pr-2">{toast.message}</p>
          <button
            onClick={onClose}
            className="shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
