function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-[20px] shadow-[0_20px_80px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-white/[0.15] ${className}`}
    >
      {/* Ambient Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

      {/* Top Reflection */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {children}
    </div>
  );
}

export default GlassCard;
