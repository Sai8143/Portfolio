
import { useEffect, useState } from "react";


function useTypingEffect(

words=[],
speed=120,
delay=2000

){

const [index,setIndex]=
useState(0);

const [subIndex,setSubIndex]=
useState(0);

const [reverse,setReverse]=
useState(false);


useEffect(()=>{

if(index===words.length){

setIndex(0);

}


if(
subIndex===words[index]?.length+1 &&
!reverse
){

setTimeout(()=>{

setReverse(true);

},delay);

return;

}


if(
subIndex===0 &&
reverse
){

setReverse(false);

setIndex((prev)=>
prev+1
);

return;

}


const timeout=
setTimeout(()=>{

setSubIndex((prev)=>

prev+(reverse?-1:1)

);

},reverse?50:speed);

return()=>clearTimeout(timeout);

},[
subIndex,
index,
reverse,
words,
speed,
delay
]);


return words[index]?.substring(
0,
subIndex
);

}

export default useTypingEffect

