// import { useMemo, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function AccretionDisk() {
//   const frontRef = useRef();
//   const backRef = useRef();

//   const count = 22000;

//   const frontPositions =
//     useMemo(() => {
//       const pos =
//         new Float32Array(
//           count * 3
//         );

//       for (
//         let i = 0;
//         i < count;
//         i++
//       ) {
//         const radius =
//           4.2 +
//           Math.random() * 12;

//         const angle =
//           Math.random() *
//           Math.PI *
//           2;

//         pos[i * 3] =
//           Math.cos(angle) *
//           radius;

//         pos[i * 3 + 1] =
//           (Math.random() -
//             0.5) *
//           0.05;

//         pos[i * 3 + 2] =
//           Math.sin(angle) *
//           radius;
//       }

//       return pos;
//     }, []);

//   const backPositions =
//     useMemo(() => {
//       const pos =
//         new Float32Array(
//           count * 3
//         );

//       for (
//         let i = 0;
//         i < count;
//         i++
//       ) {
//         const radius =
//           4.8 +
//           Math.random() * 10;

//         const angle =
//           Math.random() *
//           Math.PI *
//           2;

//         pos[i * 3] =
//           Math.cos(angle) *
//           radius;

//         pos[i * 3 + 1] =
//           0.9 +
//           (Math.random() -
//             0.5) *
//             0.04;

//         pos[i * 3 + 2] =
//           Math.sin(angle) *
//           radius;
//       }

//       return pos;
//     }, []);

//   useFrame(() => {
//     if (
//       !frontRef.current ||
//       !backRef.current
//     )
//       return;

//     const front =
//       frontRef.current
//         .geometry
//         .attributes.position
//         .array;

//     const back =
//       backRef.current
//         .geometry
//         .attributes.position
//         .array;

//     const updateDisk =
//       (array, lift = 0) => {
//         for (
//           let i = 0;
//           i < count;
//           i++
//         ) {
//           const x =
//             array[i * 3];

//           const z =
//             array[i * 3 + 2];

//           const radius =
//             Math.sqrt(
//               x * x +
//                 z * z
//             );

//           const angle =
//             Math.atan2(
//               z,
//               x
//             );

//           const spin =
//             0.001 +
//             0.08 /
//               Math.max(
//                 radius,
//                 1
//               );

//           const pull =
//             0.002 +
//             0.04 /
//               Math.max(
//                 radius,
//                 1
//               );

//           const r =
//             radius - pull;

//           const a =
//             angle + spin;

//           array[i * 3] =
//             Math.cos(a) *
//             r;

//           array[
//             i * 3 + 1
//           ] =
//             lift +
//             (Math.random() -
//               0.5) *
//               0.03;

//           array[
//             i * 3 + 2
//           ] =
//             Math.sin(a) *
//             r;

//           if (
//             r < 4
//           ) {
//             const newR =
//               16 +
//               Math.random() *
//                 3;

//             const newA =
//               Math.random() *
//               Math.PI *
//               2;

//             array[
//               i * 3
//             ] =
//               Math.cos(
//                 newA
//               ) * newR;

//             array[
//               i * 3 + 1
//             ] =
//               lift;

//             array[
//               i * 3 + 2
//             ] =
//               Math.sin(
//                 newA
//               ) * newR;
//           }
//         }
//       };

//     updateDisk(front, 0);
//     updateDisk(back, 0.9);

//     frontRef.current.geometry.attributes.position.needsUpdate =
//       true;

//     backRef.current.geometry.attributes.position.needsUpdate =
//       true;
//   });

//   return (
//     <group
//       rotation={[
//         Math.PI / 2,
//         0,
//         0,
//       ]}
//     >
//       {/* UPPER LENS */}

//       <points ref={backRef}>
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             count={
//               backPositions.length /
//               3
//             }
//             array={
//               backPositions
//             }
//             itemSize={3}
//           />
//         </bufferGeometry>

//         <pointsMaterial
//           color="#ffffff"
//           size={0.035}
//           opacity={0.18}
//           transparent
//           depthWrite={false}
//           blending={
//             THREE.AdditiveBlending
//           }
//         />
//       </points>

//       {/* MAIN DISK */}

//       <points ref={frontRef}>
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             count={
//               frontPositions.length /
//               3
//             }
//             array={
//               frontPositions
//             }
//             itemSize={3}
//           />
//         </bufferGeometry>

//         <pointsMaterial
//           color="#ffffff"
//           size={0.045}
//           opacity={1}
//           transparent
//           depthWrite={false}
//           blending={
//             THREE.AdditiveBlending
//           }
//         />
//       </points>

//       {/* INNER HOT RING */}

//       <mesh>
//         <ringGeometry
//           args={[
//             3.9,
//             4.7,
//             256,
//           ]}
//         />

//         <meshBasicMaterial
//           color="#ffffff"
//           transparent
//           opacity={0.12}
//           side={
//             THREE.DoubleSide
//           }
//         />
//       </mesh>

//       {/* OUTER GLOW */}

//       <mesh>
//         <ringGeometry
//           args={[
//             5,
//             8,
//             256,
//           ]}
//         />

//         <meshBasicMaterial
//           color="#d9d9d9"
//           transparent
//           opacity={0.02}
//           side={
//             THREE.DoubleSide
//           }
//         />
//       </mesh>
//     </group>
//   );
// }
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AccretionDisk() {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);

  const count = 75000;

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 11.5;
      const angle = Math.random() * Math.PI * 2;
      const thickness = (Math.random() - 0.5) * 0.12;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = thickness;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      ph[i] = Math.random() * 100.0;
    }

    return [pos, ph];
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uEventHorizon: { value: 2.3 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value =
        state.clock.getElapsedTime();
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y =
        state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />

        <bufferAttribute
          attach="attributes-phase"
          args={[phases, 1]}
        />
      </bufferGeometry>

      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform float uTime;
          uniform float uEventHorizon;

          attribute float phase;

          varying float vRadius;
          varying float vOpacity;

          float hash(float n){
            return fract(sin(n) * 43758.5453123);
          }

          void main() {
            vec3 pos = position;

            float r = length(pos.xz);
            float orbitSpeed = 0.52 / sqrt(r);
            float angle = uTime * orbitSpeed + phase;

            pos.x = cos(angle) * r;
            pos.z = sin(angle) * r;

            pos.y += hash(phase) * 0.05 - 0.025;

            vec4 mvPosition =
              modelViewMatrix * vec4(pos, 1.0);

            float depth = -mvPosition.z;

            float localZ = pos.z;

            float flareIntensity =
              pow(uEventHorizon / r, 1.8) * 2.8;

            if (localZ < 0.0) {
              float signX =
                pos.x >= 0.0 ? 1.0 : -1.0;

              pos.y +=
                signX *
                flareIntensity *
                1.55 *
                (abs(localZ) / r);

              pos.x *=
                1.0 -
                (flareIntensity * 0.06);
            } else {
              float signX =
                pos.x >= 0.0 ? 1.0 : -1.0;

              pos.y -=
                signX *
                flareIntensity *
                0.15 *
                (localZ / r);
            }

            mvPosition =
              modelViewMatrix * vec4(pos, 1.0);

            gl_Position =
              projectionMatrix * mvPosition;

            float sizeMultiplier =
              1.0 +
              (1.0 /
                (r - uEventHorizon + 0.1));

            gl_PointSize =
              (15.5 / depth) * sizeMultiplier;

            vRadius = r;

            float fringeFade =
              smoothstep(15.0, 10.0, r);

            float innerCrush =
              smoothstep(
                uEventHorizon,
                uEventHorizon + 0.8,
                r
              );

            vOpacity =
              innerCrush *
              fringeFade *
              0.9;
          }
        `}
        fragmentShader={`
          varying float vRadius;
          varying float vOpacity;

          void main() {

            vec2 ptCoord =
              gl_PointCoord - vec2(0.5);

            float d = length(ptCoord);

            if(d > 0.5) discard;

            float intensity =
              smoothstep(0.5, 0.01, d);

            vec3 coreColor =
              vec3(1.0, 1.0, 1.0);

            vec3 fringeColor =
              vec3(0.85, 0.85, 0.85);

            float blendFactor =
              clamp(
                (vRadius - 3.2) / 10.0,
                0.0,
                1.0
              );

            vec3 finalColor =
              mix(
                coreColor,
                fringeColor,
                blendFactor
              ) * intensity;

            gl_FragColor =
              vec4(
                finalColor,
                intensity * vOpacity
              );
          }
        `}
      />
    </points>
  );
}