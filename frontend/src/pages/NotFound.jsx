
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import Button from "../components/Common/Button";


function NotFound(){

return(

<div
className="
min-h-screen

flex
items-center
justify-center

px-6

text-center
"
>

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

<p
className="
terminal-label

mb-6
"
>

ERROR 404

</p>


<h1
className="
text-6xl
md:text-8xl

font-black

tracking-[-5px]

mb-6
"
>

PAGE
NOT
FOUND

</h1>


<p
className="
max-w-xl

mx-auto

text-slate-400

leading-[2]

mb-10
"
>

The requested system endpoint could not be located
inside this futuristic portfolio architecture.

</p>


<Link to="/">

<Button primary>

Return Home

</Button>

</Link>

</motion.div>

</div>

)

}

export default NotFound
