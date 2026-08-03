
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// import {
//   FaUsers,
//   FaHeartbeat,
//   FaBroadcastTower,
// } from "react-icons/fa";

// import Container from "../Common/Container";
// import GlassCard from "../Common/GlassCard";

// function VisitorCounter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let visits = parseInt(
//       localStorage.getItem("portfolioVisitors") || "12842"
//     );

//     visits += 1;

//     localStorage.setItem(
//       "portfolioVisitors",
//       visits
//     );

//     setCount(visits);
//   }, []);

//   const formatNumber = (num) => {
//     return num.toLocaleString();
//   };

//   return (
//     <section
//       className="
//       py-10
//       "
//     >
//       <Container>

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 40,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           viewport={{
//             once: true,
//           }}
//           transition={{
//             duration: 0.8,
//           }}
//         >
//           <GlassCard
//             className="
//             p-8
//             lg:p-10

//             overflow-hidden
//             relative
//             "
//           >
//             {/* Glow */}

//             <div
//               className="
//               absolute

//               top-0
//               left-1/2

//               -translate-x-1/2

//               w-[300px]
//               h-[300px]

//               rounded-full

//               bg-white/[0.03]

//               blur-[120px]

//               pointer-events-none
//               "
//             />

//             <div
//               className="
//               grid
//               lg:grid-cols-3

//               gap-8

//               items-center
//               "
//             >
//               {/* LEFT */}

//               <div
//                 className="
//                 flex
//                 items-center
//                 gap-4
//                 "
//               >
//                 <div
//                   className="
//                   w-16
//                   h-16

//                   rounded-2xl

//                   border
//                   border-white/10

//                   bg-white/[0.03]

//                   flex
//                   items-center
//                   justify-center

//                   text-white
//                   text-xl
//                   "
//                 >
//                   <FaUsers />
//                 </div>

//                 <div>
//                   <p className="terminal-label">
//                     ACTIVE VISITORS
//                   </p>

//                   <h3
//                     className="
//                     text-3xl
//                     font-bold
//                     "
//                   >
//                     {formatNumber(count)}
//                   </h3>
//                 </div>
//               </div>

//               {/* CENTER */}

//               <div className="text-center">
//                 <p
//                   className="
//                   terminal-label
//                   mb-3
//                   "
//                 >
//                   TELEMETRY CORE
//                 </p>

//                 <div
//                   className="
//                   text-5xl
//                   font-black
//                   "
//                 >
//                   {formatNumber(count)}
//                 </div>

//                 <p
//                   className="
//                   mt-3
//                   text-slate-400
//                   "
//                 >
//                   Portfolio Interactions
//                 </p>
//               </div>

//               {/* RIGHT */}

//               <div
//                 className="
//                 flex
//                 flex-col
//                 gap-4
//                 "
//               >
//                 <div
//                   className="
//                   flex
//                   items-center
//                   gap-3
//                   "
//                 >
//                   <FaHeartbeat />
//                   <span>
//                     System Online
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   items-center
//                   gap-3
//                   "
//                 >
//                   <FaBroadcastTower />
//                   <span>
//                     Global Access Enabled
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   items-center
//                   gap-3
//                   "
//                 >
//                   <div
//                     className="
//                     w-2
//                     h-2

//                     rounded-full

//                     bg-white

//                     animate-pulse
//                     "
//                   />

//                   <span>
//                     Real-Time Tracking
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </GlassCard>
//         </motion.div>

//       </Container>
//     </section>
//   );
// }

// export default VisitorCounter;




import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import CountUp from "react-countup";

import {
  FaUsers,
  FaHeartbeat,
  FaBroadcastTower,
  FaGlobe,
} from "react-icons/fa";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";



const API_URL = import.meta.env.VITE_API_URL || "https://backend-ruby-nine-62.vercel.app";

function VisitorCounter({ onOpenAnalytics }) {
  const [count, setCount] = useState(42);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const registerVisitor = async () => {
      try {
        let deviceId = localStorage.getItem("portfolio_device_id");
        if (!deviceId) {
          deviceId = crypto.randomUUID();
          localStorage.setItem("portfolio_device_id", deviceId);
        }

        await fetch(`${API_URL}/api/visitor/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            device_id: deviceId,
            browser: navigator.userAgent,
            operating_system: navigator.platform,
          }),
        }).catch(() => {});

        const response = await fetch(`${API_URL}/api/visitor`);
        if (response.ok) {
          const data = await response.json();
          setCount(data.count || 42);
        }
      } catch (error) {
        console.error("Visitor tracking offline:", error);
      } finally {
        setLoading(false);
      }
    };

    registerVisitor();
  }, []);

  const formatNumber = (num) =>
    num.toLocaleString();

  return (
    <section
      className="
        py-16
      "
    >
      <Container>
        
{/* HEADER */}

<div
  className="
  text-center
  mb-14
  "
>
  <p
    className="
    terminal-label
    mb-4
    "
  >
    PORTFOLIO REACH
  </p>

  <h2
    className="
    text-4xl
    md:text-5xl

    font-black

    mb-5
    "
  >
    Portfolio Reach
  </h2>

  <p
    className="
    text-slate-400

    max-w-2xl
    mx-auto

    leading-8
    "
  >
    Real-time visitor activity and
    portfolio engagement across
    devices and networks.
  </p>
</div>



        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <GlassCard
            className="
              relative
              overflow-hidden
              p-8
              lg:p-12
            "
          >
            {/* AMBIENT GLOW */}

            
{/* PRIMARY GLOW */}

<motion.div

  animate={{
    scale: [1, 1.08, 1],
  }}

  transition={{
    duration: 6,
    repeat: Infinity,
  }}

  className="
  absolute

  top-1/2
  left-1/2

  -translate-x-1/2
  -translate-y-1/2

  w-[500px]
  h-[500px]

  rounded-full

  bg-white/[0.03]

  blur-[150px]

  pointer-events-none
  "
/>


{/* SECONDARY GLOW */}

<div
  className="
  absolute

  bottom-0
  right-0

  w-[250px]
  h-[250px]

  rounded-full

  bg-white/[0.02]

  blur-[100px]

  pointer-events-none
  "
/>


              
{/* LEFT */}

<div
  className="
  flex
  justify-center
  "
>

  <div
    className="
    relative

    w-[280px]
    h-[280px]

    flex
    items-center
    justify-center
    "
  >

    {/* OUTER RING */}

    <motion.div

      animate={{
        rotate: 360,
      }}

      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}

      className="
      absolute

      inset-0

      rounded-full

      border
      border-dashed
      border-white/10
      "
    />

    {/* INNER RING */}

    <motion.div

      animate={{
        rotate: -360,
      }}

      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "linear",
      }}

      className="
      absolute

      w-[220px]
      h-[220px]

      rounded-full

      border
      border-white/5
      "
    />

    {/* GLOW */}

    <motion.div

      animate={{
        scale: [1, 1.08, 1],
      }}

      transition={{
        duration: 4,
        repeat: Infinity,
      }}

      className="
      absolute

      w-[160px]
      h-[160px]

      rounded-full

      bg-white/[0.05]

      blur-[40px]
      "
    />

    {/* COUNT */}

    <div
      className="
      relative

      text-center

      z-10
      "
    >

      <div
        className="
        text-5xl
        md:text-6xl

        font-black
        "
      >

        {loading ? (
          "--"
        ) : (
          <CountUp
            end={count}
            duration={2}
          />
        )}

      </div>

      <p
        className="
        mt-3

        text-slate-400
        "
      >
        Unique Visitors
      </p>

    </div>

  </div>

</div>



             
{/* CENTER */}

<div
  className="
  text-center
  lg:text-left
  "
>

  <p
    className="
    terminal-label
    mb-4
    "
  >
    LIVE INSIGHTS
  </p>

  <h3
    className="
    text-3xl
    md:text-4xl

    font-black

    leading-tight

    mb-5
    "
  >
    Portfolio activity
    <br />
    and visitor reach
  </h3>

  <p
    className="
    text-slate-400

    leading-8

    mb-8
    "
  >
    Monitor visitor growth,
    engagement and overall
    portfolio visibility in
    real time.
  </p>

  <div
    className="
    flex
    items-center

    gap-3
    "
  >

    <div
      className="
      w-2
      h-2

      rounded-full

      bg-white

      animate-pulse
      "
    />

    <span
      className="
      text-sm
      text-slate-400
      "
    >
      Tracking Active
    </span>

  </div>

  <button
    onClick={() => onOpenAnalytics && onOpenAnalytics(count)}
    className="mt-6 px-5 py-2.5 rounded-2xl border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] font-mono text-xs transition-all"
  >
    Inspect System Telemetry Dashboard
  </button>

</div>


            
                  
{/* BOTTOM STATUS BAR */}

<div
  className="
  mt-12

  pt-8

  border-t
  border-white/10
  "
>

  <div
    className="
    grid
    md:grid-cols-3

    gap-6
    "
  >

    {/* STATUS */}

    <div
      className="
      flex
      items-center

      gap-3
      "
    >

      <div
        className="
        w-2
        h-2

        rounded-full

        bg-white

        animate-pulse
        "
      />

      <div>

        <p className="terminal-label">
          STATUS
        </p>

        <p className="text-sm text-slate-400">
          Tracking Active
        </p>

      </div>

    </div>


    {/* VISITOR MODE */}

    <div
      className="
      flex
      items-center

      gap-3
      "
    >

      <FaUsers />

      <div>

        <p className="terminal-label">
          VISITOR MODE
        </p>

        <p className="text-sm text-slate-400">
          Unique Visitor Tracking
        </p>

      </div>

    </div>


    {/* DATA */}

    <div
      className="
      flex
      items-center

      gap-3
      "
    >

      <FaBroadcastTower />

      <div>

        <p className="terminal-label">
          DATA
        </p>

        <p className="text-sm text-slate-400">
          Live Synchronization
        </p>

      </div>

    </div>

  </div>

</div>



          </GlassCard>

        </motion.div>

      </Container>

    </section>
  );
}

export default VisitorCounter;