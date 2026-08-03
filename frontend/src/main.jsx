
import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

// import Lenis from "lenis";

import App from "./App";

import "./styles/globals.css";


/* =====================================
    LENIS
===================================== */

// const lenis = new Lenis({

// duration:1.2,

// smoothWheel:true,

// smoothTouch:false,

// });


// function raf(time){

// lenis.raf(time);

// requestAnimationFrame(raf);

// }

// requestAnimationFrame(raf);


/* =====================================
    ROOT
===================================== */
window.history.scrollRestoration = "manual";

if (window.location.hash) {
  history.replaceState(
    null,
    "",
    window.location.pathname
  );
}
ReactDOM.createRoot(
document.getElementById("root")
).render(

<React.StrictMode>

<BrowserRouter>

<App/>

</BrowserRouter>

</React.StrictMode>

);

