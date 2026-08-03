// import { useMemo, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function SpaceDust() {
//   const pointsRef = useRef();

//   const count = 2500;

//   const positions =
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
//           15 +
//           Math.random() * 90;

//         const angle =
//           Math.random() *
//           Math.PI *
//           2;

//         const height =
//           (Math.random() -
//             0.5) *
//           8;

//         pos[i * 3] =
//           Math.cos(angle) *
//           radius;

//         pos[i * 3 + 1] =
//           height;

//         pos[i * 3 + 2] =
//           Math.sin(angle) *
//           radius;
//       }

//       return pos;
//     }, []);

//   useFrame(() => {
//     if (!pointsRef.current)
//       return;

//     const array =
//       pointsRef.current.geometry
//         .attributes.position.array;

//     for (
//       let i = 0;
//       i < count;
//       i++
//     ) {
//       let x =
//         array[i * 3];

//       let y =
//         array[i * 3 + 1];

//       let z =
//         array[i * 3 + 2];

//       const radius =
//         Math.sqrt(
//           x * x +
//             z * z
//         );

//       const angle =
//         Math.atan2(
//           z,
//           x
//         );

//       const rotationSpeed =
//         0.0005 +
//         1 /
//           Math.max(
//             radius,
//             2
//           ) *
//           0.02;

//       const pullSpeed =
//         0.004 +
//         1 /
//           Math.max(
//             radius,
//             2
//           ) *
//           0.05;

//       const nextAngle =
//         angle +
//         rotationSpeed;

//       const nextRadius =
//         radius -
//         pullSpeed;

//       array[i * 3] =
//         Math.cos(
//           nextAngle
//         ) * nextRadius;

//       array[i * 3 + 1] =
//         y * 0.9998;

//       array[i * 3 + 2] =
//         Math.sin(
//           nextAngle
//         ) * nextRadius;

//       if (
//         nextRadius < 2
//       ) {
//         const spawnRadius =
//           90 +
//           Math.random() * 25;

//         const spawnAngle =
//           Math.random() *
//           Math.PI *
//           2;

//         array[i * 3] =
//           Math.cos(
//             spawnAngle
//           ) *
//           spawnRadius;

//         array[i * 3 + 1] =
//           (Math.random() -
//             0.5) *
//           8;

//         array[i * 3 + 2] =
//           Math.sin(
//             spawnAngle
//           ) *
//           spawnRadius;
//       }
//     }

//     pointsRef.current.geometry.attributes.position.needsUpdate =
//       true;
//   });

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={
//             positions.length / 3
//           }
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>

//       <pointsMaterial
//         color="#d8d8d8"
//         size={0.03}
//         transparent
//         opacity={0.06}
//         sizeAttenuation
//         depthWrite={false}
//         blending={
//           THREE.AdditiveBlending
//         }
//       />
//     </points>
//   );
// }
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SpaceDust() {
  const pointsRef = useRef(null);
  const count = 1500;

  const { particles, positions } = useMemo(() => {
    const list = [];
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 6.0 + Math.random() * 20.0;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 1.5;

      list.push({
        radius,
        angle,
        height,
        speed: 0.08 + Math.random() * 0.15,
        radialSpeed: 0.015 + Math.random() * 0.035,
        noiseOffset: Math.random() * 100,
      });

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const warpFactor =
        Math.pow(3.0 / radius, 1.6) * 2.2;

      let y = height;

      if (z < 0) {
        y += Math.sin(angle) * warpFactor * -1.2;
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    return {
      particles: list,
      positions: pos,
    };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;
    const posArray = posAttr.array;

    const dt = Math.min(delta, 0.1);

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      p.radius -= p.radialSpeed * dt * 4.5;

      const velocityMultiplier = Math.max(
        0.5,
        Math.min(6.5, 6.0 / p.radius)
      );

      p.angle +=
        p.speed *
        velocityMultiplier *
        dt *
        1.5;

      if (p.radius < 2.3) {
        p.radius =
          16.0 + Math.random() * 10.0;

        p.angle =
          Math.random() * Math.PI * 2;

        p.height =
          (Math.random() - 0.5) * 1.5;
      }

      const r = p.radius;
      const angle = p.angle;

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      const warpFactor =
        Math.pow(2.4 / r, 1.8) * 2.3;

      let y = p.height;

      if (z < 0) {
        y +=
          Math.sin(angle) *
          warpFactor *
          -1.3;
      } else {
        y +=
          Math.sin(angle) *
          warpFactor *
          0.1;
      }

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#c8c8c8"
        size={0.045}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}