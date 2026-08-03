
// import { motion } from "framer-motion";

// import Container from "../Common/Container";

// import GlassCard from "../Common/GlassCard";

// import SectionTitle from "../Common/SectionTitle";


// const stats=[

// {
// value:"10+",
// label:"Projects Built"
// },

// {
// value:"5+",
// label:"Tech Domains"
// },

// {
// value:"24/7",
// label:"Learning Mode"
// },

// {
// value:"100%",
// label:"Future Focused"
// }

// ];


// function About(){

// return(

// <section
// id="about"
// className="
// section
// "
// >

// <Container>

// {/* =====================================
//     HEADER
// ===================================== */}

// <SectionTitle

// tag="SYSTEM PROFILE"

// title="Engineering Intelligent Future Systems"

// description="
// Passionate Computer Science Engineering student
// focused on AI systems, secure applications,
// modern full stack development and futuristic technologies.
// "

// />



// {/* =====================================
//     MAIN GRID
// ===================================== */}

// <div
// className="
// grid
// lg:grid-cols-[1.1fr_.9fr]

// gap-14

// items-center
// "
// >

// {/* =====================================
//     LEFT SIDE
// ===================================== */}

// <motion.div

// initial={{
// opacity:0,
// y:40
// }}

// whileInView={{
// opacity:1,
// y:0
// }}

// transition={{
// duration:.7
// }}

// viewport={{
// once:true
// }}

// >

// <GlassCard
// className="
// p-10
// lg:p-14
// "
// >

// {/* LABEL */}

// <p
// className="
// terminal-label

// mb-10
// "
// >

// ABOUT ME

// </p>



// {/* BIG STORY */}

// <div
// className="
// space-y-8
// "
// >

// <p
// className="
// text-2xl
// md:text-3xl

// leading-[1.6]

// font-semibold

// text-slate-100
// "
// >

// Creating futuristic digital experiences
// through intelligent engineering,
// minimal design and secure technology systems.

// </p>


// <p
// className="
// text-slate-400

// leading-[2]

// text-lg
// "
// >

// I am Sai Ganesh Chinni,
// a Computer Science Engineering student
// passionate about building next-generation
// applications powered by AI,
// cybersecurity and modern development technologies.

// </p>


// <p
// className="
// text-slate-400

// leading-[2]

// text-lg
// "
// >

// My interests include Artificial Intelligence,
// Quantum Computing,
// Flutter Development,
// Full Stack Engineering
// and futuristic operating system experiences.

// </p>

// </div>



// {/* DIVIDER */}

// <div
// className="
// w-full
// h-[1px]

// bg-white/5

// my-12
// "
// />



// {/* FOOTER */}

// <div
// className="
// flex
// flex-wrap

// gap-6
// "
// >

// <div>

// <p
// className="
// terminal-label

// mb-2
// "
// >

// LOCATION

// </p>


// <h3
// className="
// text-lg

// font-medium
// "
// >

// India

// </h3>

// </div>


// <div>

// <p
// className="
// terminal-label

// mb-2
// "
// >

// SPECIALIZATION

// </p>


// <h3
// className="
// text-lg

// font-medium
// "
// >

// AI + Security + Full Stack

// </h3>

// </div>

// </div>

// </GlassCard>

// </motion.div>



// {/* =====================================
//     RIGHT SIDE
// ===================================== */}

// <motion.div

// initial={{
// opacity:0,
// y:40
// }}

// whileInView={{
// opacity:1,
// y:0
// }}

// transition={{
// duration:.7,
// delay:.1
// }}

// viewport={{
// once:true
// }}

// className="
// grid
// grid-cols-2

// gap-6
// "
// >

// {

// stats.map((item,index)=>(

// <GlassCard

// key={index}

// className="
// h-[220px]

// p-8

// flex
// flex-col
// justify-between
// "
// >

// {/* TOP */}

// <div
// className="
// w-12
// h-12

// rounded-2xl

// border
// border-white/10

// bg-white/[0.03]
// "
// />



// {/* BOTTOM */}

// <div>

// <h2
// className="
// text-5xl

// font-black

// tracking-tight

// mb-4
// "
// >

// {item.value}

// </h2>


// <p
// className="
// text-slate-400

// text-sm

// tracking-[2px]

// uppercase
// "
// >

// {item.label}

// </p>

// </div>

// </GlassCard>

// ))

// }

// </motion.div>

// </div>

// </Container>

// </section>

// )

// }

// export default About


import { motion } from "framer-motion";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";
import Reveal from "../Common/Reveal";

function About() {
  return (
    <section
      id="about"
      className="section"
    >
      <Reveal>
      <Container>

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mb-20"
        >
          <p className="terminal-label mb-4">
            ABOUT ME
          </p>

          <h2 className="section-title">
            Building intelligent systems
            for the next generation.
          </h2>

          <p className="section-subtitle">
            Passionate developer focused on
            Artificial Intelligence,
            Cloud Technologies,
            Full Stack Development
            and Flutter applications.
          </p>
        </motion.div>

        {/* Content */}

        <div
          className="
          grid
          lg:grid-cols-3
          gap-8
          "
        >

          {/* Card 1 */}

          <GlassCard className="p-8">
            <h3
              className="
              text-2xl
              font-bold
              mb-6
              "
            >
              Education
            </h3>

            <p
              className="
              text-slate-400
              leading-8
              "
            >
              B.Tech in Computer Science &
              Engineering.
            </p>
          </GlassCard>

          {/* Card 2 */}

          <GlassCard className="p-8">
            <h3
              className="
              text-2xl
              font-bold
              mb-6
              "
            >
              Experience
            </h3>

            <p
              className="
              text-slate-400
              leading-8
              "
            >
              Internship experience at
              Ordnance Factory (AVNL),
              working on web technologies,
              UI development and modern
              engineering workflows.
            </p>
          </GlassCard>

          {/* Card 3 */}

          <GlassCard className="p-8">
            <h3
              className="
              text-2xl
              font-bold
              mb-6
              "
            >
              Mission
            </h3>

            <p
              className="
              text-slate-400
              leading-8
              "
            >
              Create futuristic products
              combining AI, Cloud Computing,
              Interactive Engineering and
              Human-Centered Design.
            </p>
          </GlassCard>

        </div>

      </Container>
      </Reveal>
    </section>
  );
}

export default About;
