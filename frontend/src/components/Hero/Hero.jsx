
import { motion } from "framer-motion";

import { TypeAnimation } from "react-type-animation";

import {

FaGithub,
FaLinkedinIn,
FaInstagram,
FaArrowRight

} from "react-icons/fa";

import Button from "../Common/Button";

import Container from "../Common/Container";

import GlassCard from "../Common/GlassCard";
import MagneticButton from "../Common/MagneticButton";


function Hero({ onOpenResume }) {

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  };


return(

<section
id="home"
className="
section

min-h-screen

flex
items-center
"
>

<Container>

<div
className="
grid
lg:grid-cols-2

gap-20

items-center
"
>

{/* =====================================
    LEFT
===================================== */}

<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.7
}}

>

{/* SYSTEM BADGE */}

<div
className="
inline-flex
items-center

gap-3

mb-8

px-5
py-3

rounded-full

border
border-white/10

bg-white/[0.03]
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


<p
className="
terminal-label
"
>

AI SYSTEM ONLINE

</p>

</div>



{/* HUGE TITLE */}

<h1
className="
text-[2.5rem]
sm:text-[3.5rem]
md:text-[5rem]
lg:text-[6rem]

leading-[0.95]

font-black

tracking-[-2px]
sm:tracking-[-4px]

mb-8
"

>
    
Code <span className="flow-code">{'</>'}</span><br />
  Create <br />
  Innovate
</h1>



{/* NAME */}

<div
className="
flex
items-center

gap-4

mb-8
"
>

<div
className="
w-16
h-[1px]

bg-white/10
"/>


<p
className="
terminal-label
"
>

SAI GANESH CHINNI

</p>

</div>



{/* TYPEWRITER */}

<div
className="
text-2xl
md:text-3xl

font-semibold

text-slate-300

mb-8

h-[50px]
"
>

<TypeAnimation

sequence={[

"Full Stack Developer",
2000,

"AI Explorer",
2000,

"System Architect",
2000,

"Flutter Developer",
2000

]}

speed={50}

repeat={Infinity}

/>

</div>



{/* DESCRIPTION */}

<p
className="
max-w-2xl

text-slate-400

text-lg

leading-[2]

mb-12
"
>

Designing intelligent digital systems,
future-focused interfaces and high-performance
technology experiences powered by
modern engineering and AI innovation.

</p>

<div
className="
flex
flex-wrap

gap-3

mb-10
"
>
  {[
    "React",
    "Flutter",
    "Python",
    "AI",
    "FastAPI",
  ].map((item) => (
    <span
      key={item}
      className="
      px-4
      py-2

      rounded-full

      border
      border-white/10

      bg-white/[0.03]

      text-sm

      backdrop-blur-xl

      hover:bg-white/[0.06]

      transition-all
      duration-300
      "
    >
      {item}
    </span>
  ))}
</div>

{/* BUTTONS */}

<div
  className="
  flex
  flex-wrap

  gap-5

  mb-12
  "
>
  <MagneticButton>
    <Button primary onClick={onOpenResume}>
      Inspect Resume
      <FaArrowRight />
    </Button>
  </MagneticButton>

  <MagneticButton>
    <Button
      onClick={scrollToProjects}
    >
      View Projects
    </Button>
  </MagneticButton>
</div>

<div
className="
grid
grid-cols-2
md:grid-cols-4

gap-4

mb-12
"
>
  <GlassCard className="p-4 text-center">
    <h3 className="text-2xl font-bold">
      10+
    </h3>

    <p className="terminal-label">
      PROJECTS
    </p>
  </GlassCard>

  <GlassCard className="p-4 text-center">
    <h3 className="text-2xl font-bold">
      AI
    </h3>

    <p className="terminal-label">
      ENGINEER
    </p>
  </GlassCard>

  <GlassCard className="p-4 text-center">
    <h3 className="text-2xl font-bold">
      IJAM
    </h3>

    <p className="terminal-label">
      AUTHOR
    </p>
  </GlassCard>

  <GlassCard className="p-4 text-center">
    <h3 className="text-2xl font-bold">
      FULL
    </h3>

    <p className="terminal-label">
      STACK
    </p>
  </GlassCard>
</div>

{/* SOCIALS */}

<div
className="
flex
items-center

gap-4
"
>

<a

href="https://github.com/Sai8143"

target="_blank"

rel="noreferrer"

className="
w-14
h-14

rounded-2xl

border
border-white/10

bg-white/[0.03]

flex
items-center
justify-center

text-slate-400

hover:text-white

transition-all
duration-300
"
>

<FaGithub/>

</a>


<a
href="#"
className="
w-14
h-14

rounded-2xl

border
border-white/10

bg-white/[0.03]

flex
items-center
justify-center

text-slate-400

hover:text-white

transition-all
duration-300
"
>

<FaLinkedinIn/>

</a>


<a
href="#"
className="
w-14
h-14

rounded-2xl

border
border-white/10

bg-white/[0.03]

flex
items-center
justify-center

text-slate-400

hover:text-white

transition-all
duration-300
"
>

<FaInstagram/>

</a>

</div>

</motion.div>



{/* =====================================
    RIGHT
===================================== */}

<motion.div

initial={{
opacity:0,
scale:.95
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:.8
}}

className="
relative

flex
justify-center
"
>

{/* AMBIENT GLOW */}

<div
className="
glow-orb

top-[-100px]
right-[-50px]
"
/>



{/* MAIN PANEL */}

<GlassCard
className="
relative

w-full
max-w-[520px]

aspect-square

flex
items-center
justify-center

overflow-hidden
"
>

{/* ROTATING RING */}

<motion.div

animate={{
rotate:360
}}

transition={{
duration:30,
repeat:Infinity,
ease:"linear"
}}

className="
absolute

w-[80%]
h-[80%]

rounded-full

border
border-dashed
border-white/10
"
/>


<motion.div

animate={{
rotate:-360
}}

transition={{
duration:25,
repeat:Infinity,
ease:"linear"
}}

className="
absolute

w-[60%]
h-[60%]

rounded-full

border
border-white/5
"
/>


{/* PROFILE IMAGE */}

<div
className="
relative

w-[260px]
md:w-[300px]

h-[340px]
md:h-[400px]

rounded-[32px]

overflow-hidden

border
border-white/10

bg-black

z-10
"
>
  <img
    src="/profile.png"
    alt="Sai Ganesh"
    className="
    w-full
    h-full

    object-cover
    "
  />

  {/* IMAGE OVERLAY */}

  <div
    className="
    absolute
    inset-0

    bg-gradient-to-t
    from-black/60
    via-transparent
    to-transparent

    pointer-events-none
    "
  />

  {/* PREMIUM EDGE GLOW */}

  <div
    className="
    absolute
    inset-0

    rounded-[32px]

    ring-1
    ring-white/10

    shadow-[0_0_60px_rgba(255,255,255,0.08)]

    pointer-events-none
    "
  />
</div>


{/* FLOATING LABEL */}

<div
className="
absolute

top-8
left-8

px-4
py-3

rounded-2xl

border
border-white/10

bg-black/40

backdrop-blur-xl
"
>

<p
className="
terminal-label
"
>

AI CORE ACTIVE

</p>

</div>



{/* FLOATING LABEL */}

<div
className="
absolute

bottom-8
right-8

px-4
py-3

rounded-2xl

border
border-white/10

bg-black/40

backdrop-blur-xl
"
>

<p
className="
terminal-label
"
>

SECURE NODE

</p>

</div>

</GlassCard>

</motion.div>

</div>

</Container>

</section>

)

}

export default Hero

