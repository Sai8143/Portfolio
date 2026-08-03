// import { useMemo, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Points } from "@react-three/drei";
// import * as THREE from "three";

// export default function StarsField() {
//   const starsRef = useRef();

//   const positions =
//     useMemo(() => {
//       const count = 1800;

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
//           60 +
//           Math.random() * 250;

//         const theta =
//           Math.random() *
//           Math.PI *
//           2;

//         const phi =
//           Math.acos(
//             2 *
//               Math.random() -
//               1
//           );

//         pos[i * 3] =
//           radius *
//           Math.sin(phi) *
//           Math.cos(theta);

//         pos[i * 3 + 1] =
//           radius *
//           Math.sin(phi) *
//           Math.sin(theta);

//         pos[i * 3 + 2] =
//           radius *
//           Math.cos(phi);
//       }

//       return pos;
//     }, []);

//   useFrame(() => {
//     if (!starsRef.current)
//       return;

//     starsRef.current.rotation.y +=
//       0.00002;

//     starsRef.current.rotation.x +=
//       0.000005;
//   });

//   return (
//     <Points
//       ref={starsRef}
//       positions={positions}
//       stride={3}
//     >
//       <pointsMaterial
//         color="#ffffff"
//         size={0.12}
//         transparent
//         opacity={0.55}
//         sizeAttenuation
//         depthWrite={false}
//         blending={
//           THREE.AdditiveBlending
//         }
//       />
//     </Points>
//   );
// }
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

export default function StarsField() {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const count = 3500;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();

      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);

      const r = 80 + Math.random() * 180;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const elapsed = state.clock.getElapsedTime();

    ref.current.rotation.y = elapsed * 0.004;
    ref.current.rotation.x = elapsed * 0.002;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.06}
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}
