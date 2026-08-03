
// import { Canvas, useFrame } from "@react-three/fiber";

// import {
//   Points,
//   PointMaterial,
//   Html,
// } from "@react-three/drei";

// import { useMemo, useRef } from "react";

// import * as THREE from "three";

// import {
//   FaReact,
//   FaGithub,
//   FaPython,
// } from "react-icons/fa";

// import {
//   SiFlutter,
// } from "react-icons/si";

// /* =====================================
//     CYCLONE PARTICLES
// ===================================== */

// function VortexParticles() {
//   const ref = useRef();


// const positions = useMemo(() => {
//   const particleCount = 45000;
//   const arms = 12;

//   const pos = new Float32Array(
//     particleCount * 3
//   );

//   for (
//     let i = 0;
//     i < particleCount;
//     i++
//   ) {
//     const arm =
//       i % arms;

//     const radius =
//       Math.random() * 12;

//     const armAngle =
//       (arm / arms) *
//       Math.PI *
//       2;

//     const angle =
//       armAngle +
//       radius * 4.2 +
//       (Math.random() - 0.5) *
//         0.12;

//     const pull =
//       Math.pow(
//         1 - radius / 14,
//         0.25
//       );

//     pos[i * 3] =
//       Math.cos(angle) *
//       radius *
//       pull;

//     pos[i * 3 + 1] =
//       (Math.random() - 0.5) *
//       0.04;

//     pos[i * 3 + 2] =
//       Math.sin(angle) *
//       radius *
//       pull;
//   }

//   return pos;
// }, []);

//   useFrame(() => {
//     if (!ref.current) return;

//     ref.current.rotation.y +=
//       0.004;

//     ref.current.rotation.z +=
//       0.0015;
//   });

//   return (
//     <Points
//       ref={ref}
//       positions={positions}
//       stride={3}
//     >
//       <PointMaterial
//         transparent
//         color="#ffffff"
//         size={0.03}
//         opacity={0.95}
//         sizeAttenuation
//         depthWrite={false}
//       />
//     </Points>
//   );
// }

// /* =====================================
//     ORBITING ICONS
// ===================================== */

// function OrbitingIcon({
//   icon,
//   radius,
//   speed,
//   offset = 0,
// }) {
//   const ref = useRef();

//   useFrame(({ clock }) => {
//     const t =
//       clock.getElapsedTime();

//     const angle =
//       t * speed + offset;

//     const shrink =
//       1 -
//       ((t * 0.08) % 1);

//     const r =
//       radius * shrink;

//     if (!ref.current) return;

//     ref.current.position.x =
//       Math.cos(angle) * r;

//     ref.current.position.z =
//       Math.sin(angle) * r;

//     ref.current.position.y =
//       Math.sin(angle * 2) *
//       0.35;

//     ref.current.rotation.z +=
//       0.01;
//   });

//   return (
//     <group ref={ref}>
//       <Html center>
//         <div
//           className="
//           text-white

//           text-3xl

//           drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]
//           "
//         >
//           {icon}
//         </div>
//       </Html>
//     </group>
//   );
// }

// /* =====================================
//     BLACK HOLE CORE
// ===================================== */

// function BlackHoleCore() {
//   const ringRef = useRef();

//   useFrame(() => {
//     if (!ringRef.current) return;

//     ringRef.current.rotation.z +=
//       0.01;
//   });

//   return (
//     <group>
//       {/* EYE */}

//       <mesh>
//         <circleGeometry
//           args={[3.4, 64]}
//         />

//         <meshBasicMaterial
//           color="#000000"
//         />
//       </mesh>

//       {/* RING */}

//       <mesh ref={ringRef}>
        
// <ringGeometry
//   args={[
//     3.6,
//     6.5,
//     128,
//   ]}
// />



//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.08}
//           side={
//             THREE.DoubleSide
//           }
//         />
//       </mesh>

//       {/* SOFT GLOW */}

//       <mesh>
//         <sphereGeometry
//           args={[5, 64, 64]}
//         />

//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.015}
//         />
//       </mesh>
//     </group>
//   );
// }

// /* =====================================
//     MAIN SCENE
// ===================================== */

// export default function VortexScene() {
//   return (
//     <Canvas
//       camera={{
//         position: [0, 0, 5],
//         fov: 60,
//       }}
//     >
//       <ambientLight
//         intensity={0.4}
//       />

//       <VortexParticles />

//       <BlackHoleCore />

//       <OrbitingIcon
//         icon={<FaReact />}
//         radius={5}
//         speed={0.6}
//         offset={0}
//       />

//       <OrbitingIcon
//         icon={<SiFlutter />}
//         radius={5.5}
//         speed={0.8}
//         offset={2}
//       />

//       <OrbitingIcon
//         icon={<FaPython />}
//         radius={6}
//         speed={1}
//         offset={4}
//       />

//       <OrbitingIcon
//         icon={<FaGithub />}
//         radius={6.5}
//         speed={0.5}
//         offset={6}
//       />
//     </Canvas>
//   );
// }
