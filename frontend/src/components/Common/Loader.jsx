import { motion } from "framer-motion";

function Loader(){

return(

<div
className="
fixed
inset-0

bg-[#020617]

flex
items-center
justify-center

z-[99999]
"
>

<motion.div

animate={{
rotate:360
}}

transition={{
duration:2,
repeat:Infinity,
ease:"linear"
}}

className="
w-20
h-20

rounded-full

border
border-white/10

border-t-white
"
/>

</div>

)

}

export default Loader