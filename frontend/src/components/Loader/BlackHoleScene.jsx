
// // import { Canvas, useFrame } from "@react-three/fiber";

// // import {
// //   Points,
// //   PointMaterial,
// //   Html,
// // } from "@react-three/drei";

// // import {
// //   useMemo,
// //   useRef,
// // } from "react";

// // import * as THREE from "three";

// // import {
// //   FaReact,
// //   FaGithub,
// //   FaPython,
// // } from "react-icons/fa";

// // import {
// //   SiFlutter,
// // } from "react-icons/si";

// // /* =====================================
// //     BLACK HOLE CORE
// // ===================================== */

// // function BlackHoleCore() {
// //   const diskRef = useRef();

// //   useFrame(() => {
// //     if (!diskRef.current) return;

// //     diskRef.current.rotation.z +=
// //       0.003;
// //   });

// //   return (
// //     <group>
// //       {/* EVENT HORIZON */}

// //       <mesh>
// //         <circleGeometry
// //           args={[2.6, 128]}
// //         />

// //         <meshBasicMaterial
// //           color="#000000"
// //         />
// //       </mesh>

// //       {/* INNER DISK */}

// //       <mesh ref={diskRef}>
// //         <ringGeometry
// //           args={[
// //             2.8,
// //             5.2,
// //             256,
// //           ]}
// //         />

// //         <meshBasicMaterial
// //           color="#ffffff"
// //           transparent
// //           opacity={0.06}
// //           side={
// //             THREE.DoubleSide
// //           }
// //         />
// //       </mesh>

// //       {/* OUTER GLOW */}

// //       <mesh>
// //         <sphereGeometry
// //           args={[8, 64, 64]}
// //         />

// //         <meshBasicMaterial
// //           color="#ffffff"
// //           transparent
// //           opacity={0.01}
// //         />
// //       </mesh>
// //     </group>
// //   );
// // }

// // /* =====================================
// //     ACCRETION PARTICLES
// // ===================================== */

// // function AccretionParticles() {
// //   const ref = useRef();

// //   const positions =
// //     useMemo(() => {

// //       const count = 60000;

// //       const pos =
// //         new Float32Array(
// //           count * 3
// //         );

// //       for (
// //         let i = 0;
// //         i < count;
// //         i++
// //       ) {
// //         const radius =
// //           3 +
// //           Math.random() * 12;

// //         const angle =
// //           Math.random() *
// //           Math.PI *
// //           2;

// //         pos[i * 3] =
// //           Math.cos(angle) *
// //           radius;

// //         pos[i * 3 + 1] =
// //           (Math.random() - 0.5) *
// //           0.12;

// //         pos[i * 3 + 2] =
// //           Math.sin(angle) *
// //           radius;
// //       }

// //       return pos;
// //     }, []);

// //   useFrame(() => {
// //     if (!ref.current) return;

// //     ref.current.rotation.z +=
// //       0.0015;
// //   });

// //   return (
// //     <Points
// //       ref={ref}
// //       positions={positions}
// //       stride={3}
// //     >
// //       <PointMaterial
// //         transparent
// //         color="#ffffff"
// //         size={0.025}
// //         opacity={0.9}
// //         sizeAttenuation
// //         depthWrite={false}
// //       />
// //     </Points>
// //   );
// // }

// // /* =====================================
// //     ICON ABSORPTION SYSTEM
// // ===================================== */

// // function OrbitingIcon({
// //   icon,
// //   startRadius,
// //   speed,
// //   offset,
// // }) {
// //   const ref = useRef();

// //   useFrame(({ clock }) => {
// //     if (!ref.current) return;

// //     const t =
// //       clock.getElapsedTime();

// //     const cycle =
// //       (t * 0.08 + offset) % 1;

// //     const radius =
// //       startRadius *
// //       (1 - cycle);

// //     const angle =
// //       t * speed +
// //       offset * Math.PI * 2;

// //     ref.current.position.x =
// //       Math.cos(angle) *
// //       radius;

// //     ref.current.position.z =
// //       Math.sin(angle) *
// //       radius;

// //     ref.current.position.y =
// //       Math.sin(angle * 2) *
// //       0.15;

// //     const scale =
// //       Math.max(
// //         0.2,
// //         radius /
// //           startRadius
// //       );

// //     ref.current.scale.set(
// //       scale,
// //       scale,
// //       scale
// //     );

// //     ref.current.rotation.z +=
// //       0.02;
// //   });

// //   return (
// //     <group ref={ref}>
// //       <Html center>
// //         <div
// //           className="
// //           text-white

// //           text-4xl

// //           select-none

// //           drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]
// //           "
// //         >
// //           {icon}
// //         </div>
// //       </Html>
// //     </group>
// //   );
// // }

// // /* =====================================
// //     TECH ICONS
// // ===================================== */

// // function TechIcons() {
// //   return (
// //     <>
// //       <OrbitingIcon
// //         icon={<FaReact />}
// //         startRadius={12}
// //         speed={0.9}
// //         offset={0}
// //       />

// //       <OrbitingIcon
// //         icon={<SiFlutter />}
// //         startRadius={10}
// //         speed={1.1}
// //         offset={0.25}
// //       />

// //       <OrbitingIcon
// //         icon={<FaPython />}
// //         startRadius={11}
// //         speed={1.3}
// //         offset={0.5}
// //       />

// //       <OrbitingIcon
// //         icon={<FaGithub />}
// //         startRadius={13}
// //         speed={0.7}
// //         offset={0.75}
// //       />
// //     </>
// //   );
// // }

// // /* =====================================
// //     DUST FIELD
// // ===================================== */

// // function DustField() {
// //   const ref = useRef();

// //   const positions = useMemo(() => {
// //     const count = 12000;

// //     const pos =
// //       new Float32Array(
// //         count * 3
// //       );

// //     for (
// //       let i = 0;
// //       i < count;
// //       i++
// //     ) {
// //       pos[i * 3] =
// //         (Math.random() - 0.5) *
// //         80;

// //       pos[i * 3 + 1] =
// //         (Math.random() - 0.5) *
// //         20;

// //       pos[i * 3 + 2] =
// //         (Math.random() - 0.5) *
// //         80;
// //     }

// //     return pos;
// //   }, []);

// //   useFrame(() => {
// //     if (!ref.current) return;

// //     ref.current.rotation.z +=
// //       0.0002;
// //   });

// //   return (
// //     <Points
// //       ref={ref}
// //       positions={positions}
// //       stride={3}
// //     >
// //       <PointMaterial
// //         transparent
// //         color="#ffffff"
// //         size={0.015}
// //         opacity={0.15}
// //         sizeAttenuation
// //         depthWrite={false}
// //       />
// //     </Points>
// //   );
// // }

// // /* =====================================
// //     MAIN SCENE
// // ===================================== */

// // export default function BlackHoleScene() {
// //   return (
// //     <Canvas
// //       camera={{
// //         position: [0, 0, 18],
// //         fov: 45,
// //       }}
// //     >
// //       <ambientLight
// //         intensity={0.4}
// //       />

// //       {/* FAR DUST */}

// //       <DustField />

// //       {/* ACCRETION DISK */}

// //       <AccretionParticles />

// //       {/* BLACK HOLE */}

// //       <BlackHoleCore />

// //       {/* TECH ICONS */}

// //       <TechIcons />

// //     </Canvas>
// //   );
// // }

// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   EffectComposer,
//   Bloom,
//   Vignette,
// } from "@react-three/postprocessing";

// import BlackHoleCore from "./BlackHoleCore";
// import AccretionDisk from "./AccretionDisk";
// import OrbitingTech from "./OrbitingTech";
// import StarsField from "./StarsField";
// import SpaceDust from "./SpaceDust";

// function PostFX() {
//   return (
//     <EffectComposer>
//       <Bloom
//         intensity={3.5}
//         luminanceThreshold={0.005}
//         luminanceSmoothing={0.95}
//         mipmapBlur
//       />

//       <Vignette
//         eskil={false}
//         offset={0.06}
//         darkness={0.98}
//       />
//     </EffectComposer>
//   );
// }

// function CameraDrift() {
//   useFrame((state) => {
//     const t =
//       state.clock.getElapsedTime();

//     state.camera.position.x =
//       Math.sin(t * 0.08) *
//       0.35;

//     state.camera.position.y =
//       0.8 +
//       Math.sin(t * 0.12) *
//         0.12;

//     state.camera.lookAt(
//       0,
//       0,
//       0
//     );
//   });

//   return null;
// }

// export default function BlackHoleScene({
//   progress = 0,
// }) {
//   return (
//     <Canvas
//       dpr={[1, 2]}
//       gl={{
//         antialias: true,
//         alpha: true,
//         powerPreference:
//           "high-performance",
//       }}
//       camera={{
//         position: [
//           0,
//           0.8,
//           30,
//         ],
//         fov: 18,
//       }}
//     >
//       <CameraDrift />

//       {/* LIGHT */}

//       <ambientLight
//         intensity={0.02}
//       />

//       <pointLight
//         position={[
//           0,
//           0,
//           0,
//         ]}
//         intensity={5}
//         color="#ffffff"
//       />

//       {/* BACKGROUND */}

//       <StarsField />

//       <SpaceDust />

//       {/* BLACK HOLE SYSTEM */}

//       <group
//         position={[
//           0,
//           0,
//           0,
//         ]}
//         rotation={[
//           -0.025,
//           0,
//           0,
//         ]}
//         scale={1.55}
//       >
//         <AccretionDisk />

//         <BlackHoleCore />

//         <OrbitingTech
//           progress={progress}
//         />
//       </group>

//       <PostFX />
//     </Canvas>
//   );
// }
// import { Canvas } from "@react-three/fiber";
// import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
// import BlackHoleCore from "./BlackHoleCore";
// import AccretionDisk from "./AccretionDisk";
// import StarsField from "./StarsField";
// import OrbitingTech from "./OrbitingTech";
// import SpaceDust from "./SpaceDust";

// export default function BlackHoleScene() {
//   return (
//     <div className="w-full h-full bg-black select-none pointer-events-none">
//       <Canvas
//         camera={{
//           position: [0, 1.1, 21.5],
//           fov: 36,
//           near: 0.1,
//           far: 1000,
//         }}
//         gl={{
//           antialias: true,
//           alpha: false,
//           powerPreference: "high-performance",
//           toneMapping: 0, // Bypass default toneMapping of R3F to let bloom parameters flourish
//         }}
//       >
//         {/* Key backdrop illuminator */}
//         <ambientLight intensity={0.65} />

//         {/* Backdrop stars plane */}
//         <StarsField />

//         {/* Swarms of fine space grains spiraling inwards */}
//         <SpaceDust />

//         {/* High-Performance, Relativistically Lensed Accretion Disk on GPU */}
//         <AccretionDisk />

//         {/* Event Horizon, light halos and surrounding corona boundaries */}
//         <BlackHoleCore />

//         {/* Relativistic mesh plane tech nodes */}
//         <OrbitingTech />

//         {/* CINEMATIC POST-PROCESSING GASEOUS PIPELINE */}
//         <EffectComposer enableNormalPass={false}>
//           <Bloom
//             intensity={2.0} // High-intensity volumetric light bloom
//             luminanceThreshold={0.12} // Restrict bloom flare to star grains and accretion disks
//             luminanceSmoothing={0.8} // Smooth light diffusion borders
//             mipmapBlur
//           />
//           <Noise
//             opacity={0.038} // Fine retro interstellar film grain
//             premultiply
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }

import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Noise,
} from "@react-three/postprocessing";

import BlackHoleCore from "./BlackHoleCore";
import AccretionDisk from "./AccretionDisk";
import StarsField from "./StarsField";
import OrbitingTech from "./OrbitingTech";
import SpaceDust from "./SpaceDust";

export default function BlackHoleScene({
  progress = 0,
}) {
  const reveal =
    Math.min(progress, 100) / 100;

  return (
    <div className="w-full h-full bg-black select-none pointer-events-none">
      <Canvas
        camera={{
          position: [0, 1.1, 21.5],
          fov: 36,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference:
            "high-performance",
          toneMapping: 0,
        }}
      >
        {/* Ambient Space Light */}
        <ambientLight
          intensity={0.45}
        />

        {/* Always Visible */}
        <StarsField
          progress={progress}
        />

        {/* Always Moving */}
        <SpaceDust
          progress={progress}
        />

        {/* Always Rotating */}
        <AccretionDisk
          progress={progress}
        />

        {/* Event Horizon */}
        <BlackHoleCore
          progress={progress}
        />

        {/* Orbiting Technologies */}
        <OrbitingTech
          progress={progress}
        />

        <EffectComposer
          enableNormalPass={false}
        >
          <Bloom
            intensity={
              0.8 +
              reveal * 1.4
            }
            luminanceThreshold={0.12}
            luminanceSmoothing={0.8}
            mipmapBlur
          />

          <Noise
            opacity={0.03}
            premultiply
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}