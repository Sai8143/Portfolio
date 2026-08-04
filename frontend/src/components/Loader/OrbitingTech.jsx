import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import {
  FaReact,
  FaGithub,
  FaPython,
} from "react-icons/fa";

import {
  SiFlutter,
  SiJavascript,
  SiNodedotjs,
  SiOpenai,
  SiDocker,
} from "react-icons/si";

import { preloadWhooshSound, playIconWhooshSound } from "../../utils/whooshSound";

function AbsorbIcon({
  icon,
  startRadius,
  speed,
  phaseOffset,
  enableWhoosh = false,
}) {
  const groupRef = useRef(null);
  const hasWhooshedRef = useRef(false);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    const cycle = (t * speed + phaseOffset) % 1;

    const radius = Math.max(
      0.15,
      startRadius * (1 - cycle)
    );

    const angle = t * 1.15 + phaseOffset * Math.PI * 2;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 0;

    groupRef.current.position.set(x, y, z);

    // Smooth scale while spiraling inwards
    const scale = Math.max(
      0.12,
      (radius / startRadius) * 0.85
    );

    groupRef.current.scale.set(scale, scale, scale);

    // 🔊 ICON VERY CLOSE TO SCREEN AUDIO TRIGGER
    // Requirements:
    // 1. enableWhoosh is true (only key featured icons)
    // 2. z > radius * 0.94 (at peak front closest proximity to camera/screen)
    // 3. radius <= 7.5 (icon is physically close to the screen, NOT far in deep space)
    // 4. radius > 3.2 (before collapsing into event horizon)
    if (
      enableWhoosh &&
      z > radius * 0.94 &&
      radius <= 7.5 &&
      radius > 3.2 &&
      !hasWhooshedRef.current
    ) {
      hasWhooshedRef.current = true;
      playIconWhooshSound(0.30);
    } else if (z < 0) {
      // Reset trigger flag when icon swings to the back half of orbit
      hasWhooshedRef.current = false;
    }

    // Flash near event horizon
    if (radius < 3.5 && radius > 2.1) {
      const flicker = Math.sin(t * 40) > 0 ? 1 : 0.25;
      groupRef.current.visible = flicker > 0.2;
    }

    // Absorb into black hole
    if (radius < 2.1) {
      groupRef.current.visible = false;
    } else {
      groupRef.current.visible = true;
    }
  });

  return (
    <group ref={groupRef}>
      <Html center transform distanceFactor={8}>
        <div
          style={{
            color: "white",
            fontSize: "38px",
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
            pointerEvents: "none",
          }}
        >
          {icon}
        </div>
      </Html>
    </group>
  );
}

export default function OrbitingTech() {
  useEffect(() => {
    preloadWhooshSound();
  }, []);

  return (
    <>
      {/* React — Close Orbit Whoosh Enabled */}
      <AbsorbIcon
        icon={<FaReact />}
        startRadius={8.5}
        speed={0.040}
        phaseOffset={0.00}
        enableWhoosh={true}
      />

      {/* Flutter — Close Orbit Whoosh Enabled */}
      <AbsorbIcon
        icon={<SiFlutter />}
        startRadius={9.5}
        speed={0.045}
        phaseOffset={0.25}
        enableWhoosh={true}
      />

      {/* Python — Close Orbit Whoosh Enabled */}
      <AbsorbIcon
        icon={<FaPython />}
        startRadius={10.5}
        speed={0.042}
        phaseOffset={0.50}
        enableWhoosh={true}
      />

      {/* GitHub — Outer Silent Orbit */}
      <AbsorbIcon
        icon={<FaGithub />}
        startRadius={12}
        speed={0.047}
        phaseOffset={0.36}
        enableWhoosh={false}
      />

      {/* JavaScript — Close Orbit Whoosh Enabled */}
      <AbsorbIcon
        icon={<SiJavascript />}
        startRadius={11.5}
        speed={0.043}
        phaseOffset={0.75}
        enableWhoosh={true}
      />

      {/* NodeJS — Outer Silent Orbit */}
      <AbsorbIcon
        icon={<SiNodedotjs />}
        startRadius={14}
        speed={0.046}
        phaseOffset={0.60}
        enableWhoosh={false}
      />

      {/* OpenAI — Outer Silent Orbit */}
      <AbsorbIcon
        icon={<SiOpenai />}
        startRadius={15}
        speed={0.041}
        phaseOffset={0.72}
        enableWhoosh={false}
      />

      {/* Docker — Outer Silent Orbit */}
      <AbsorbIcon
        icon={<SiDocker />}
        startRadius={16}
        speed={0.044}
        phaseOffset={0.84}
        enableWhoosh={false}
      />
    </>
  );
}