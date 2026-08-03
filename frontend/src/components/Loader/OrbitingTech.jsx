// import { useMemo, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// function createIconTexture(text) {
//   const canvas =
//     document.createElement("canvas");

//   canvas.width = 512;
//   canvas.height = 512;

//   const ctx =
//     canvas.getContext("2d");

//   ctx.clearRect(
//     0,
//     0,
//     512,
//     512
//   );

//   ctx.fillStyle =
//     "#ffffff";

//   ctx.shadowColor =
//     "#ffffff";

//   ctx.shadowBlur = 50;

//   ctx.font =
//     "bold 300px Arial";

//   ctx.textAlign =
//     "center";

//   ctx.textBaseline =
//     "middle";

//   ctx.fillText(
//     text,
//     256,
//     270
//   );

//   const texture =
//     new THREE.CanvasTexture(
//       canvas
//     );

//   texture.needsUpdate =
//     true;

//   return texture;
// }

// function TechIcon({
//   symbol,
//   offset,
//   startRadius,
//   progress,
// }) {
//   const ref = useRef();

//   const texture = useMemo(
//     () =>
//       createIconTexture(
//         symbol
//       ),
//     [symbol]
//   );

//   useFrame(({ clock }) => {
//     if (!ref.current)
//       return;

//     const t =
//       clock.getElapsedTime();

//     const absorb =
//       Math.max(
//         0,
//         (progress - 85) /
//           15
//       );

//     let radius;

//     if (
//       progress < 85
//     ) {
//       radius =
//         startRadius +
//         Math.sin(
//           t * 0.4 +
//             offset
//         ) *
//           0.25;
//     } else {
//       radius =
//         startRadius *
//         Math.pow(
//           1 -
//             absorb,
//           3
//         );
//     }

//     const angle =
//       t *
//         (0.25 +
//           absorb *
//             10) +
//       offset;

//     const x =
//       Math.cos(
//         angle
//       ) * radius;

//     const z =
//       Math.sin(
//         angle
//       ) * radius;

//     const y =
//       Math.sin(
//         angle * 2
//       ) * 0.03;

//     ref.current.position.set(
//       x,
//       y,
//       z
//     );

//     ref.current.lookAt(
//       0,
//       0,
//       0
//     );

//     if (
//       progress < 85
//     ) {
//       ref.current.scale.set(
//         1.4,
//         1.4,
//         1.4
//       );
//     } else {
//       const stretch =
//         1 +
//         absorb * 8;

//       const shrink =
//         Math.max(
//           0.05,
//           1 -
//             absorb
//         );

//       ref.current.scale.set(
//         shrink *
//           stretch,
//         shrink,
//         shrink
//       );
//     }

//     if (
//       progress >
//       94
//     ) {
//       ref.current.material.opacity =
//         0.8 +
//         Math.sin(
//           t * 45
//         ) *
//           0.2;
//     } else {
//       ref.current.material.opacity =
//         1;
//     }

//     if (
//       progress >=
//       99
//     ) {
//       ref.current.material.opacity =
//         0;
//     }
//   });

//   return (
//     <sprite ref={ref}>
//       <spriteMaterial
//         map={texture}
//         transparent
//         color="#ffffff"
//         depthWrite
//         depthTest
//         blending={
//           THREE.AdditiveBlending
//         }
//       />
//     </sprite>
//   );
// }

// export default function OrbitingTech({
//   progress = 0,
// }) {
//   return (
//     <>
//       <TechIcon
//         symbol="⚛"
//         offset={0}
//         startRadius={8}
//         progress={progress}
//       />

//       <TechIcon
//         symbol="F"
//         offset={1.57}
//         startRadius={10}
//         progress={progress}
//       />

//       <TechIcon
//         symbol="P"
//         offset={3.14}
//         startRadius={12}
//         progress={progress}
//       />

//       <TechIcon
//         symbol="G"
//         offset={4.71}
//         startRadius={14}
//         progress={progress}
//       />
//     </>
//   );
// }
// import { useMemo, useRef } from "react"; 
// import { useFrame } from "@react-three/fiber"; 
// import * as THREE from "three";
// function createIconTexture(type) {
//   const canvas = document.createElement("canvas");
//   canvas.width = 256;
//   canvas.height = 256;

//   const ctx = canvas.getContext("2d");

//   if (!ctx) return new THREE.Texture();

//   ctx.clearRect(0, 0, 256, 256);

//   ctx.strokeStyle = "#ffffff";
//   ctx.fillStyle = "#ffffff";
//   ctx.lineWidth = 10;
//   ctx.lineCap = "round";
//   ctx.lineJoin = "round";
//   ctx.shadowColor = "#ffffff";
//   ctx.shadowBlur = 24;

//   if (type === "react") {
//     ctx.beginPath();
//     ctx.arc(128, 128, 20, 0, Math.PI * 2);
//     ctx.fill();

//     const drawEllipse = (angle) => {
//       ctx.save();
//       ctx.translate(128, 128);
//       ctx.rotate(angle);
//       ctx.beginPath();
//       ctx.ellipse(0, 0, 88, 30, 0, 0, Math.PI * 2);
//       ctx.stroke();
//       ctx.restore();
//     };

//     drawEllipse(0);
//     drawEllipse(Math.PI / 3);
//     drawEllipse(-Math.PI / 3);
//   }

//   const texture = new THREE.CanvasTexture(canvas);
//   texture.minFilter = THREE.LinearFilter;
//   return texture;
// }

// function AbsorbIcon({
//   texture,
//   startRadius,
//   speed,
//   phaseOffset,
// }) {
//   const meshRef = useRef(null);
//   const materialRef = useRef(null);

//   useFrame((state, delta) => {
//     if (!meshRef.current || !materialRef.current) return;

//     const t = state.clock.getElapsedTime();

//     const cycle = (t * speed + phaseOffset) % 1.0;

//     const radius = Math.max(
//       0.1,
//       startRadius * (1.0 - cycle)
//     );

//     const angle =
//       t * 1.1 + phaseOffset * Math.PI * 2;

//     const x = Math.cos(angle) * radius;
//     const z = Math.sin(angle) * radius;

//     const r = radius;
//     const warpFactor =
//       Math.pow(2.8 / r, 1.8) * 2.3;

//     let y =
//       Math.sin(angle * 2.0) * 0.1;

//     if (z < 0) {
//       y +=
//         Math.sin(angle) *
//         warpFactor *
//         -1.3;
//     } else {
//       y +=
//         Math.sin(angle) *
//         warpFactor *
//         0.12;
//     }

//     meshRef.current.position.set(
//       x,
//       y,
//       z
//     );

//     meshRef.current.lookAt(
//       state.camera.position
//     );

//     const gravityStretch =
//       1.0 +
//       Math.pow(2.5 / r, 2) * 1.5;

//     const baseScale = Math.max(
//       0.18,
//       (r / startRadius) * 0.85
//     );

//     meshRef.current.scale.set(
//       baseScale * gravityStretch,
//       baseScale,
//       1
//     );

//     if (r <= 3.8 && r >= 2.2) {
//       const flickerFreq = 48.0;

//       const waveFlicker =
//         Math.sin(t * flickerFreq) > 0.1
//           ? 1.0
//           : 0.05;

//       const noiseFlicker =
//         Math.random() > 0.4
//           ? 1.4
//           : 0.1;

//       const combinedFlicker =
//         waveFlicker * 0.35 +
//         noiseFlicker * 0.65;

//       materialRef.current.opacity =
//         Math.max(
//           0.0,
//           ((r - 2.2) / 1.6) *
//             0.9 *
//             combinedFlicker
//         );

//       const thermalEnergyMultiplier =
//         1.0 +
//         (1.0 -
//           (r - 2.2) / 1.6) *
//           2.5;

//       materialRef.current.color.setRGB(
//         thermalEnergyMultiplier,
//         thermalEnergyMultiplier,
//         thermalEnergyMultiplier
//       );
//     } else if (r < 2.2) {
//       materialRef.current.opacity = 0;
//     } else {
//       materialRef.current.color.setRGB(
//         1,
//         1,
//         1
//       );

//       const initialFade = Math.min(
//         1,
//         (startRadius - r) / 2
//       );

//       materialRef.current.opacity =
//         0.85 * initialFade;
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       <planeGeometry args={[1, 1]} />
//       <meshBasicMaterial
//         ref={materialRef}
//         map={texture}
//         transparent
//         depthWrite={false}
//         blending={THREE.AdditiveBlending}
//         side={THREE.DoubleSide}
//       />
//     </mesh>
//   );
// }
// export default function OrbitingTech() {
//   const textures = useMemo(() => {
//     return {
//       react: createIconTexture("react"),
//       flutter: createIconTexture("flutter"),
//       python: createIconTexture("python"),
//       github: createIconTexture("github"),
//     };
//   }, []);

//   return (
//     <group>
//       <AbsorbIcon
//         texture={textures.react}
//         startRadius={14.0}
//         speed={0.065}
//         phaseOffset={0.05}
//       />

//       <AbsorbIcon
//         texture={textures.flutter}
//         startRadius={12.5}
//         speed={0.075}
//         phaseOffset={0.3}
//       />

//       <AbsorbIcon
//         texture={textures.python}
//         startRadius={13.5}
//         speed={0.058}
//         phaseOffset={0.55}
//       />

//       <AbsorbIcon
//         texture={textures.github}
//         startRadius={14.5}
//         speed={0.07}
//         phaseOffset={0.8}
//       />
//     </group>
//   );
// }

import { useRef } from "react";
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

function AbsorbIcon({
  icon,
  startRadius,
  speed,
  phaseOffset,
}) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t =
      state.clock.getElapsedTime();

    const cycle =
      (t * speed +
        phaseOffset) %
      1;

    const radius =
      Math.max(
        0.15,
        startRadius *
          (1 - cycle)
      );

    const angle =
      t * 1.15 +
      phaseOffset *
        Math.PI *
        2;

    const x =
      Math.cos(angle) *
      radius;

    const z =
      Math.sin(angle) *
      radius;

    /*
      FLAT ORBIT PLANE
      No bouncing
      No jumping
    */

    const y = 0;

    groupRef.current.position.set(
      x,
      y,
      z
    );

    /*
      Smooth shrink
      while approaching center
    */

    const scale =
      Math.max(
        0.12,
        (radius /
          startRadius) *
          0.85
      );

    groupRef.current.scale.set(
      scale,
      scale,
      scale
    );

    /*
      Flash near horizon
    */

    if (
      radius < 3.5 &&
      radius > 2.1
    ) {
      const flicker =
        Math.sin(
          t * 40
        ) > 0
          ? 1
          : 0.25;

      groupRef.current.visible =
        flicker > 0.2;
    }

    /*
      Absorb
    */

    if (radius < 2.1) {
      groupRef.current.visible =
        false;
    } else {
      groupRef.current.visible =
        true;
    }
  });

  return (
    <group ref={groupRef}>
      <Html
        center
        transform
        distanceFactor={8}
      >
        <div
          style={{
            color: "white",
            fontSize: "38px",
            filter:
              "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
            pointerEvents:
              "none",
          }}
        >
          {icon}
        </div>
      </Html>
    </group>
  );
}
export default function OrbitingTech() {
  return (
    <>
      {/* React */}
      <AbsorbIcon
        icon={<FaReact />}
        startRadius={9}
        speed={0.040}
        phaseOffset={0.00}
      />

      {/* Flutter */}
      <AbsorbIcon
        icon={<SiFlutter />}
        startRadius={10}
        speed={0.045}
        phaseOffset={0.12}
      />

      {/* Python */}
      <AbsorbIcon
        icon={<FaPython />}
        startRadius={11}
        speed={0.042}
        phaseOffset={0.24}
      />

      {/* GitHub */}
      <AbsorbIcon
        icon={<FaGithub />}
        startRadius={12}
        speed={0.047}
        phaseOffset={0.36}
      />

      {/* JavaScript */}
      <AbsorbIcon
        icon={<SiJavascript />}
        startRadius={13}
        speed={0.043}
        phaseOffset={0.48}
      />

      {/* NodeJS */}
      <AbsorbIcon
        icon={<SiNodedotjs />}
        startRadius={14}
        speed={0.046}
        phaseOffset={0.60}
      />

      {/* OpenAI */}
      <AbsorbIcon
        icon={<SiOpenai />}
        startRadius={15}
        speed={0.041}
        phaseOffset={0.72}
      />

      {/* Docker */}
      <AbsorbIcon
        icon={<SiDocker />}
        startRadius={16}
        speed={0.044}
        phaseOffset={0.84}
      />
    </>
  );
}