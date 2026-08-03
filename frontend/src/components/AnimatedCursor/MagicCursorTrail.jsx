import { useEffect, useState } from "react";

export default function MagicCursorTrail() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.4) return; // Control particle spawn density

      const newParticle = {
        id: Math.random() + Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 1,
        alpha: 0.8,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8 - 0.5,
      };

      setParticles((prev) => [...prev.slice(-25), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            alpha: p.alpha - 0.04,
          }))
          .filter((p) => p.alpha > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.alpha,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
}
