
import { useRef } from "react";


function useMagnetic(){

const ref=useRef(null);


/* =====================================
    MOVE
===================================== */

const handleMouseMove=(e)=>{

const element=ref.current;

if(!element) return;

const rect=
element.getBoundingClientRect();

const x=
e.clientX-
(rect.left+rect.width/2);

const y=
e.clientY-
(rect.top+rect.height/2);

element.style.transform=
`translate(${x*.12}px,${y*.12}px)`;

};


/* =====================================
    LEAVE
===================================== */

const handleMouseLeave=()=>{

if(ref.current){

ref.current.style.transform=
"translate(0px,0px)";

}

};


return{

ref,

handleMouseMove,

handleMouseLeave

};

}

export default useMagnetic
