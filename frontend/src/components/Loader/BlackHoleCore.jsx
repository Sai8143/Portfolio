// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function BlackHoleCore() {
//   const haloRef = useRef();
//   const glowRef = useRef();
//   const ringRef = useRef();

//   useFrame(({ clock }) => {
//     const t =
//       clock.getElapsedTime();

//     if (haloRef.current) {
//       haloRef.current.rotation.y =
//         t * 0.01;
//     }

//     if (glowRef.current) {
//       const pulse =
//         1 +
//         Math.sin(t * 0.4) *
//           0.02;

//       glowRef.current.scale.set(
//         pulse,
//         pulse,
//         pulse
//       );
//     }

//     if (ringRef.current) {
//       ringRef.current.rotation.z =
//         t * 0.03;
//     }
//   });

//   return (
//     <group>
//       {/* FAR HALO */}

//       <mesh ref={haloRef}>
//         <sphereGeometry
//           args={[11, 64, 64]}
//         />

//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.002}
//           side={
//             THREE.BackSide
//           }
//           depthWrite={false}
//           blending={
//             THREE.AdditiveBlending
//           }
//         />
//       </mesh>

//       {/* GRAVITATIONAL LENS */}

//       <mesh>
//         <sphereGeometry
//           args={[5.2, 64, 64]}
//         />

//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.015}
//           blending={
//             THREE.AdditiveBlending
//           }
//           depthWrite={false}
//         />
//       </mesh>

//       {/* EVENT HORIZON GLOW */}

//       <mesh ref={glowRef}>
//         <sphereGeometry
//           args={[3.4, 128, 128]}
//         />

//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.06}
//           depthWrite={false}
//           blending={
//             THREE.AdditiveBlending
//           }
//         />
//       </mesh>

//       {/* OUTER WHITE RIM */}

//       <mesh
//         ref={ringRef}
//         rotation={[
//           Math.PI / 2,
//           0,
//           0,
//         ]}
//       >
//         <ringGeometry
//           args={[
//             2.9,
//             3.15,
//             256,
//           ]}
//         />

//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.22}
//           side={
//             THREE.DoubleSide
//           }
//           blending={
//             THREE.AdditiveBlending
//           }
//         />
//       </mesh>

//       {/* INNER WHITE RIM */}

//       <mesh
//         rotation={[
//           Math.PI / 2,
//           0,
//           0,
//         ]}
//       >
//         <ringGeometry
//           args={[
//             2.55,
//             2.75,
//             256,
//           ]}
//         />

//         <meshBasicMaterial
//           color="#d8d8d8"
//           transparent
//           opacity={0.15}
//           side={
//             THREE.DoubleSide
//           }
//           blending={
//             THREE.AdditiveBlending
//           }
//         />
//       </mesh>

//       {/* BLACK EVENT HORIZON */}

//       <mesh
//         renderOrder={999}
//       >
//         <sphereGeometry
//           args={[2.55, 256, 256]}
//         />

//         <meshBasicMaterial
//           color="#000000"
//         />
//       </mesh>

//       {/* DEEP VOID */}

//       <mesh
//         renderOrder={1000}
//       >
//         <sphereGeometry
//           args={[2.15, 256, 256]}
//         />

//         <meshBasicMaterial
//           color="#000000"
//         />
//       </mesh>

//       {/* ABSOLUTE CENTER */}

//       <mesh
//         renderOrder={1001}
//       >
//         <sphereGeometry
//           args={[1.7, 256, 256]}
//         />

//         <meshBasicMaterial
//           color="#000000"
//         />
//       </mesh>

//       {/* ABSORPTION FLASH */}

//       <mesh>
//         <sphereGeometry
//           args={[2.9, 128, 128]}
//         />

//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.015}
//           depthWrite={false}
//           blending={
//             THREE.AdditiveBlending
//           }
//         />
//       </mesh>
//     </group>
//   );
// }
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BlackHoleCore() {
  const ringRef1 = useRef(null);
  const ringRef2 = useRef(null);
  const ringRef3 = useRef(null);
  const coronaRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.08;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.05;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.z = t * 0.12;
    }
    if (coronaRef.current) {
      coronaRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group>
      {/* 1. PHYSICAL BLACK HOLE CORE - THE EVENT HORIZON */}
      {/* Completely absorbs all light, perfectly black */}
      <mesh renderOrder={1}>
        <sphereGeometry args={[2.3, 64, 64]} />
        <meshBasicMaterial color="#000000" depthWrite={true} depthTest={true} />
      </mesh>

      {/* 2. OPTICALLY PERFECT CORONA BILLBOARD (EINSTEIN RING) */}
      {/* Faces the camera and glows outward from the event horizon boundary */}
      <mesh ref={coronaRef} renderOrder={0}>
        <planeGeometry args={[7.0, 7.0]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              vec2 uv = vUv - vec2(0.5);
              float dist = length(uv) * 2.0; // 0 at center, 1 at edge

              // Create peak intensity exactly outside Event Horizon (~2.3 world radius -> dist ~0.65)
              float ring = smoothstep(0.45, 0.65, dist) * smoothstep(1.0, 0.65, dist);
              
              // Exponential dropoff for a realistic hot plasma look
              float intensity = pow(ring, 1.6) * 1.8;

              // Silvery white plasma accent
              vec3 color = vec3(1.0, 1.0, 1.0);

              gl_FragColor = vec4(color * intensity, intensity * 0.9);
            }
          `}
        />
      </mesh>

      {/* 3. PRIMARY ACCRETION INNER RING */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]} renderOrder={2}>
        <torusGeometry args={[4.8, 0.08, 16, 200]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 4. SECONDARY HIGH-ACCELERATION ION BOUNDARY */}
      <mesh ref={ringRef2} rotation={[Math.PI / 2.05, 0.02, 0.02]} renderOrder={2}>
        <torusGeometry args={[5.8, 0.04, 8, 150]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 5. EXTENDED GRAVITATIONAL DIFFRACT RIMS */}
      <mesh ref={ringRef3} rotation={[Math.PI / 1.95, -0.02, -0.01]} renderOrder={2}>
        <torusGeometry args={[6.8, 0.02, 8, 120]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
