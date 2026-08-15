import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

import {
  FaUsers,
  FaBroadcastTower,
  FaChartLine,
} from "react-icons/fa";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://backend-ruby-nine-62.vercel.app";


function VisitorCounter({ onOpenAnalytics }) {

  const [count, setCount] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [status, setStatus] =
    useState("loading");


  useEffect(() => {

    let cancelled = false;


    const registerVisitor = async () => {

      try {

        // ====================================================
        // GET / CREATE DEVICE ID
        // ====================================================

        let deviceId =
          localStorage.getItem(
            "portfolio_device_id"
          );


        if (!deviceId) {

          deviceId =
            crypto.randomUUID();

          localStorage.setItem(
            "portfolio_device_id",
            deviceId
          );
        }


        // ====================================================
        // REGISTER VISITOR
        // ====================================================

        const registerResponse =
          await fetch(
            `${API_URL}/api/visitor/register`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                device_id:
                  deviceId,

                browser:
                  navigator.userAgent,

                operating_system:
                  navigator.platform ||
                  "Unknown",
              }),
            }
          );


        if (!registerResponse.ok) {

          throw new Error(
            `Registration failed: ${registerResponse.status}`
          );
        }


        // ====================================================
        // GET REAL COUNT
        // ====================================================

        const response =
          await fetch(
            `${API_URL}/api/visitor`
          );


        if (!response.ok) {

          throw new Error(
            `Visitor count failed: ${response.status}`
          );
        }


        const data =
          await response.json();


        if (
          !cancelled &&
          typeof data.count === "number" &&
          Number.isFinite(data.count)
        ) {

          setCount(data.count);

          setStatus("online");

        } else if (!cancelled) {

          setCount(null);

          setStatus("degraded");
        }

      } catch (error) {

        console.error(
          "Visitor telemetry unavailable:",
          error
        );


        if (!cancelled) {

          setCount(null);

          setStatus("degraded");
        }

      } finally {

        if (!cancelled) {

          setLoading(false);
        }
      }
    };


    registerVisitor();


    return () => {

      cancelled = true;

    };

  }, []);


  const isOnline =
    status === "online" &&
    typeof count === "number";


  return (

    <section
      id="reach"
      className="py-20 relative"
    >

      <Container>

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="text-center mb-14">

          <p className="terminal-label mb-4">
            PORTFOLIO REACH
          </p>


          <h2 className="
          text-4xl md:text-5xl
          font-black mb-5 text-white">

            Live Global Engagement

          </h2>


          <p className="
          text-slate-400
          max-w-2xl mx-auto
          leading-8
          text-sm md:text-base">

            Real-time visitor telemetry,
            device analytics, and portfolio
            engagement metrics powered by
            a live FastAPI database engine.

          </p>

        </div>


        {/* ==================================================
            MAIN CARD
        ================================================== */}

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
            relative overflow-hidden
            p-8 lg:p-12
            border border-white/10"
          >

            {/* AMBIENT GLOW */}

            <motion.div

              animate={{
                scale: [1, 1.08, 1],
              }}

              transition={{
                duration: 6,
                repeat: Infinity,
              }}

              className="
              absolute top-1/2 left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[500px] h-[500px]
              rounded-full
              bg-white/[0.03]
              blur-[150px]
              pointer-events-none"
            />


            <div className="
            grid
            lg:grid-cols-[1fr_1.2fr]
            gap-12
            items-center
            relative z-10">


              {/* ==================================================
                  ORBITAL COUNTER
              ================================================== */}

              <div className="
              flex justify-center">

                <div className="
                relative
                w-[280px]
                h-[280px]
                flex items-center
                justify-center">


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
                    absolute inset-0
                    rounded-full
                    border
                    border-dashed
                    border-white/20"
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
                    border-white/10"
                  />


                  {/* CORE GLOW */}

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
                    bg-white/[0.06]
                    blur-[40px]"
                  />


                  {/* NUMBER */}

                  <div className="
                  relative
                  text-center
                  z-10">

                    <div className="
                    text-5xl
                    md:text-6xl
                    font-black
                    text-white">

                      {loading ? (

                        "--"

                      ) : isOnline ? (

                        <CountUp
                          end={count}
                          duration={2.5}
                        />

                      ) : (

                        "—"

                      )}

                    </div>


                    <p className="
                    mt-3
                    text-xs
                    font-mono
                    text-zinc-400
                    uppercase
                    tracking-widest">

                      Unique Visitors

                    </p>


                    {!loading &&
                      !isOnline && (

                        <p className="
                        mt-2
                        text-[9px]
                        font-mono
                        text-zinc-500">

                          TELEMETRY UNAVAILABLE

                        </p>

                      )}

                  </div>

                </div>

              </div>


              {/* ==================================================
                  RIGHT CONTENT
              ================================================== */}

              <div className="
              text-center
              lg:text-left">

                <p className="
                terminal-label
                mb-4">

                  LIVE SYSTEM TELEMETRY

                </p>


                <h3 className="
                text-3xl
                md:text-4xl
                font-black
                leading-tight
                mb-5
                text-white">

                  Real-time activity &<br />
                  global visitor reach

                </h3>


                <p className="
                text-slate-400
                leading-8
                mb-8
                text-sm
                md:text-base">

                  Track unique portfolio
                  visitors, browser environments,
                  operating systems, and visitor
                  activity synchronized with the
                  backend database.

                </p>


                <div className="
                flex
                flex-wrap
                items-center
                gap-4
                justify-center
                lg:justify-start">


                  {/* ANALYTICS BUTTON */}

                  <button

                    onClick={() =>
                      onOpenAnalytics &&
                      onOpenAnalytics(count)
                    }

                    className="
                    px-6
                    py-3.5
                    rounded-2xl
                    border
                    border-white/20
                    bg-white/10
                    text-white
                    hover:bg-white/20
                    font-mono
                    text-xs
                    font-semibold
                    transition-all
                    duration-300
                    flex
                    items-center
                    gap-2"
                  >

                    <FaChartLine
                      className="w-4 h-4"
                    />

                    <span>
                      View Analytics & Visitor Logs
                    </span>

                  </button>


                  {/* DATABASE STATUS */}

                  <div className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-xs
                  font-mono
                  text-zinc-400">

                    <div
                      className={`
                      w-2 h-2 rounded-full
                      ${
                        isOnline
                          ? "bg-white animate-pulse"
                          : "bg-red-400"
                      }`}
                    />

                    <span>

                      {isOnline
                        ? "Database Synced"
                        : "Database Unavailable"}

                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* ==================================================
                STATUS BAR
            ================================================== */}

            <div className="
            mt-12
            pt-8
            border-t
            border-white/10
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            relative z-10">


              {/* SYSTEM STATUS */}

              <div className="
              flex
              items-center
              gap-3">

                <div
                  className={`
                  w-2.5
                  h-2.5
                  rounded-full
                  ${
                    isOnline
                      ? "bg-white animate-pulse"
                      : "bg-red-400"
                  }`}
                />

                <div>

                  <p className="
                  terminal-label">

                    SYSTEM STATUS

                  </p>

                  <p className="
                  text-xs
                  font-mono
                  text-slate-300
                  mt-0.5">

                    {isOnline
                      ? "Tracking Active"
                      : "Telemetry Degraded"}

                  </p>

                </div>

              </div>


              {/* VISITOR MODE */}

              <div className="
              flex
              items-center
              gap-3">

                <FaUsers
                  className="
                  w-4 h-4
                  text-zinc-400"
                />

                <div>

                  <p className="
                  terminal-label">

                    VISITOR MODE

                  </p>

                  <p className="
                  text-xs
                  font-mono
                  text-slate-300
                  mt-0.5">

                    Unique Browser Tracking

                  </p>

                </div>

              </div>


              {/* DATABASE */}

              <div className="
              flex
              items-center
              gap-3">

                <FaBroadcastTower
                  className="
                  w-4 h-4
                  text-zinc-400"
                />

                <div>

                  <p className="
                  terminal-label">

                    DATABASE NODE

                  </p>

                  <p className="
                  text-xs
                  font-mono
                  text-slate-300
                  mt-0.5">

                    FastAPI Real-Time Telemetry

                  </p>

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
