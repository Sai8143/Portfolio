
// import { useEffect, useRef, useState } from "react";

// import { motion, AnimatePresence } from "framer-motion";

// import {
//   FaRobot,
//   FaMicrochip,
//   FaBrain,
//   FaShieldAlt,
//   FaPaperPlane,
//   FaMicrophone,
//   FaVolumeUp,
//   FaStop,
//   FaSatelliteDish,
//   FaDatabase,
//   FaWifi,
// } from "react-icons/fa";

// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// import Container from "../Common/Container";
// import GlassCard from "../Common/GlassCard";
// import Reveal from "../Common/Reveal";



// function AIAssistant() {

//   const [input, setInput] =
//     useState("");

//   const [isTyping, setIsTyping] =
//     useState(false);

//   const [streamingText,
//     setStreamingText] =
//     useState("");

//   const [speakerEnabled,
//     setSpeakerEnabled] =
//     useState(true);

//   const [messages,
//     setMessages] =
//     useState([
//       {
//         type: "system",
//         text:
//           "AI Core initialized successfully.",
//       },
//       {
//         type: "assistant",
//         text:
//           "Hello, I'm Sai's AI Assistant. Ask me about projects, skills, internships or career goals.",
//       },
//     ]);

//   const chatContainerRef =
//     useRef(null);

//   const chatEndRef =
//     useRef(null);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } =
//     useSpeechRecognition();

//   /* =====================================
//       AUTO SCROLL
//   ===================================== */

//   useEffect(() => {

//     if (
//       chatContainerRef.current
//     ) {

//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;

//     }

//   }, [
//     messages,
//     streamingText,
//   ]);

//   /* =====================================
//       SPEECH INPUT
//   ===================================== */

//   useEffect(() => {

//     if (transcript) {

//       setInput(transcript);

//     }

//   }, [transcript]);

//   /* =====================================
//       TEXT TO SPEECH
//   ===================================== */

//   const speakResponse = (
//     text
//   ) => {

//     if (
//       !speakerEnabled ||
//       !window.speechSynthesis
//     )
//       return;

//     window.speechSynthesis.cancel();

//     const utterance =
//       new SpeechSynthesisUtterance(
//         text
//       );

//     utterance.rate = 1;
//     utterance.pitch = 1;
//     utterance.volume = 1;

//     window.speechSynthesis.speak(
//       utterance
//     );

//   };
//     return (
//     <section
//       id="ai-assistant"
//       className="section"
//     >
//       <Reveal delay={0.3}>
//         <Container>

//           {/* HEADER */}

//           <div className="mb-20">

//             <p className="terminal-label mb-4">
//               AI CORE
//             </p>

//             <h2 className="section-title">
//               Advanced Intelligent Assistant
//             </h2>

//             <p className="section-subtitle">
//               Voice-enabled futuristic AI terminal
//               integrated into the portfolio.
//             </p>

//           </div>

//           <div
//             className="
//             grid
//             lg:grid-cols-2
//             gap-8
//             "
//           >

//             {/* =====================================
//                 LEFT PANEL
//             ===================================== */}

//             <GlassCard
//               className="
//               p-8
//               "
//             >

//               <div
//                 className="
//                 flex
//                 items-center
//                 justify-between
//                 mb-8
//                 "
//               >

//                 <div
//                   className="
//                   flex
//                   items-center
//                   gap-3
//                   "
//                 >
//                   <FaRobot />

//                   <p className="terminal-label">
//                     AI TERMINAL SYSTEM
//                   </p>

//                 </div>

//                 <div
//                   className="
//                   flex
//                   items-center
//                   gap-3
//                   "
//                 >

//                   <button
//                     onClick={() =>
//                       setSpeakerEnabled(
//                         !speakerEnabled
//                       )
//                     }
//                     className="
//                     w-10
//                     h-10
//                     rounded-xl
//                     border
//                     border-white/10
//                     flex
//                     items-center
//                     justify-center
//                     "
//                   >
//                     <FaVolumeUp />
//                   </button>

//                   <button
//                     onClick={
//                       stopSpeaker
//                     }
//                     className="
//                     w-10
//                     h-10
//                     rounded-xl
//                     border
//                     border-white/10
//                     flex
//                     items-center
//                     justify-center
//                     "
//                   >
//                     <FaStop />
//                   </button>

//                 </div>

//               </div>

//               {/* CHAT AREA */}

//               <div
//                 ref={chatContainerRef}
//                 className="
//                 h-[500px]
//                 overflow-y-auto
//                 pr-2
//                 space-y-5
//                 "
//               >

//                 <AnimatePresence>

//                   {messages.map(
//                     (
//                       message,
//                       index
//                     ) => (

//                       <motion.div
//                         key={index}
//                         initial={{
//                           opacity: 0,
//                           y: 20,
//                         }}
//                         animate={{
//                           opacity: 1,
//                           y: 0,
//                         }}
//                         exit={{
//                           opacity: 0,
//                         }}
//                       >

//                         <div
//                           className="
//                           flex
//                           gap-4
//                           "
//                         >

//                           <div
//                             className="
//                             w-10
//                             h-10
//                             rounded-xl
//                             border
//                             border-white/10
//                             bg-white/[0.03]
//                             flex
//                             items-center
//                             justify-center
//                             "
//                           >

//                             {message.type ===
//                             "user" ? (
//                               <FaBrain />
//                             ) : message.type ===
//                               "system" ? (
//                               <FaMicrochip />
//                             ) : (
//                               <FaRobot />
//                             )}

//                           </div>

//                           <div
//                             className="
//                             flex-1
//                             p-5
//                             rounded-2xl
//                             border
//                             border-white/10
//                             bg-black/20
//                             whitespace-pre-line
//                             "
//                           >
//                             {message.text}
//                           </div>

//                         </div>

//                       </motion.div>

//                     )
//                   )}

//                 </AnimatePresence>

//                 {/* STREAMING RESPONSE */}

//                 {isTyping && (

//                   <motion.div
//                     initial={{
//                       opacity: 0,
//                     }}
//                     animate={{
//                       opacity: 1,
//                     }}
//                   >

//                     <div
//                       className="
//                       flex
//                       gap-4
//                       "
//                     >

//                       <div
//                         className="
//                         w-10
//                         h-10
//                         rounded-xl
//                         border
//                         border-white/10
//                         bg-white/[0.03]
//                         flex
//                         items-center
//                         justify-center
//                         "
//                       >
//                         <FaRobot />
//                       </div>

//                       <div
//                         className="
//                         flex-1
//                         p-5
//                         rounded-2xl
//                         border
//                         border-white/10
//                         bg-black/20
//                         whitespace-pre-line
//                         "
//                       >

//                         {streamingText}

//                         <motion.span
//                           animate={{
//                             opacity: [
//                               1,
//                               0,
//                               1,
//                             ],
//                           }}
//                           transition={{
//                             duration: 0.8,
//                             repeat:
//                               Infinity,
//                           }}
//                         >
//                           ▋
//                         </motion.span>

//                       </div>

//                     </div>

//                   </motion.div>

//                 )}

//                 <div
//                   ref={chatEndRef}
//                 />

//               </div>
//                             {/* QUICK QUESTIONS */}

//               <div
//                 className="
//                 mt-6
//                 mb-6

//                 flex
//                 flex-wrap

//                 gap-3
//                 "
//               >

//                 <button
//                   onClick={() =>
//                     handleQuickPrompt(
//                       "Tell me about your projects"
//                     )
//                   }
//                   className="
//                   px-4
//                   py-2

//                   rounded-xl

//                   border
//                   border-white/10

//                   bg-white/[0.03]

//                   text-sm

//                   hover:bg-white/[0.08]

//                   transition-all
//                   duration-300
//                   "
//                 >
//                   Projects
//                 </button>

//                 <button
//                   onClick={() =>
//                     handleQuickPrompt(
//                       "What are your skills?"
//                     )
//                   }
//                   className="
//                   px-4
//                   py-2

//                   rounded-xl

//                   border
//                   border-white/10

//                   bg-white/[0.03]

//                   text-sm

//                   hover:bg-white/[0.08]

//                   transition-all
//                   duration-300
//                   "
//                 >
//                   Skills
//                 </button>

//                 <button
//                   onClick={() =>
//                     handleQuickPrompt(
//                       "Tell me about your internship"
//                     )
//                   }
//                   className="
//                   px-4
//                   py-2

//                   rounded-xl

//                   border
//                   border-white/10

//                   bg-white/[0.03]

//                   text-sm

//                   hover:bg-white/[0.08]

//                   transition-all
//                   duration-300
//                   "
//                 >
//                   Internship
//                 </button>

//                 <button
//                   onClick={() =>
//                     handleQuickPrompt(
//                       "How can I contact Sai?"
//                     )
//                   }
//                   className="
//                   px-4
//                   py-2

//                   rounded-xl

//                   border
//                   border-white/10

//                   bg-white/[0.03]

//                   text-sm

//                   hover:bg-white/[0.08]

//                   transition-all
//                   duration-300
//                   "
//                 >
//                   Contact
//                 </button>

//               </div>

//               {/* INPUT AREA */}

//               <div
//                 className="
//                 mt-8

//                 flex
//                 gap-3
//                 "
//               >

//                 <input
//                   value={input}
//                   onChange={(e) =>
//                     setInput(
//                       e.target.value
//                     )
//                   }
//                   onKeyDown={
//                     handleKeyDown
//                   }
//                   placeholder="Ask AI Core..."
//                   className="
//                   flex-1

//                   h-[60px]

//                   rounded-2xl

//                   bg-white/5

//                   border
//                   border-white/10

//                   px-5

//                   outline-none

//                   focus:border-white/20
//                   "
//                 />

//                 <button
//                   onClick={
//                     handleSend
//                   }
//                   className="
//                   w-[60px]
//                   h-[60px]

//                   rounded-2xl

//                   bg-white

//                   text-black

//                   flex
//                   items-center
//                   justify-center
//                   "
//                 >
//                   <FaPaperPlane />
//                 </button>

//                 {browserSupportsSpeechRecognition && (

//                   <button
//                     onClick={
//                       startVoice
//                     }
//                     className={`
//                     w-[60px]
//                     h-[60px]

//                     rounded-2xl

//                     border
//                     border-white/10

//                     flex
//                     items-center
//                     justify-center

//                     ${
//                       listening
//                         ? "bg-white text-black"
//                         : "bg-white/5"
//                     }
//                     `}
//                   >
//                     <FaMicrophone />
//                   </button>

//                 )}

//               </div>

//             </GlassCard>

//             {/* =====================================
//                 RIGHT PANEL
//             ===================================== */}

//             <GlassCard
//               className="
//               relative

//               min-h-[650px]

//               overflow-hidden

//               p-8
//               "
//             >

//               <motion.div
//                 animate={{
//                   rotate: 360,
//                 }}
//                 transition={{
//                   duration: 35,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//                 className="
//                 absolute

//                 top-1/2
//                 left-1/2

//                 -translate-x-1/2
//                 -translate-y-1/2

//                 w-[80%]
//                 h-[80%]

//                 rounded-full

//                 border
//                 border-dashed
//                 border-white/10
//                 "
//               />

//               <motion.div
//                 animate={{
//                   rotate: -360,
//                 }}
//                 transition={{
//                   duration: 28,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//                 className="
//                 absolute

//                 top-1/2
//                 left-1/2

//                 -translate-x-1/2
//                 -translate-y-1/2

//                 w-[60%]
//                 h-[60%]

//                 rounded-full

//                 border
//                 border-white/10
//                 "
//               />

//               <div
//                 className="
//                 absolute

//                 top-1/2
//                 left-1/2

//                 -translate-x-1/2
//                 -translate-y-1/2

//                 flex
//                 flex-col
//                 items-center
//                 "
//               >

//                 <motion.div
//                   animate={{
//                     scale: [
//                       1,
//                       1.12,
//                       1,
//                     ],
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                   }}
//                   className="
//                   w-32
//                   h-32

//                   rounded-full

//                   bg-white

//                   shadow-[0_0_100px_rgba(255,255,255,.35)]
//                   "
//                 />

//                 <p
//                   className="
//                   mt-6

//                   terminal-label
//                   "
//                 >
//                   NEURAL CORE
//                 </p>

//               </div>

//               <div
//                 className="
//                 absolute

//                 top-8
//                 left-8

//                 p-4

//                 rounded-2xl

//                 border
//                 border-white/10

//                 bg-black/40

//                 backdrop-blur-xl
//                 "
//               >
//                 <p className="terminal-label">
//                   AI MODULE
//                 </p>

//                 <h3
//                   className="
//                   mt-2
//                   text-lg
//                   "
//                 >
//                   Neural Engine
//                 </h3>
//               </div>

//               <div
//                 className="
//                 absolute

//                 top-1/2
//                 right-8

//                 -translate-y-1/2

//                 p-4

//                 rounded-2xl

//                 border
//                 border-white/10

//                 bg-black/40

//                 backdrop-blur-xl

//                 flex
//                 items-center
//                 gap-3
//                 "
//               >
//                 <FaShieldAlt />
//                 <span>
//                   Encrypted Core
//                 </span>
//               </div>

//               <div
//                 className="
//                 absolute

//                 bottom-8
//                 right-8

//                 p-4

//                 rounded-2xl

//                 border
//                 border-white/10

//                 bg-black/40

//                 backdrop-blur-xl
//                 "
//               >
//                 <p className="terminal-label">
//                   SECURITY
//                 </p>

//                 <h3
//                   className="
//                   mt-2
//                   text-lg
//                   "
//                 >
//                   Protected System
//                 </h3>
//               </div>

//               <div
//                 className="
//                 absolute

//                 bottom-8
//                 left-8

//                 space-y-3
//                 "
//               >

//                 <div
//                   className="
//                   flex
//                   items-center
//                   gap-3
//                   "
//                 >
//                   <FaWifi />
//                   <span>
//                     STATUS ONLINE
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   items-center
//                   gap-3
//                   "
//                 >
//                   <FaSatelliteDish />
//                   <span>
//                     LATENCY 42ms
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   items-center
//                   gap-3
//                   "
//                 >
//                   <FaDatabase />
//                   <span>
//                     DATA ACTIVE
//                   </span>
//                 </div>

//               </div>

//             </GlassCard>

//           </div>

//         </Container>
//       </Reveal>
//     </section>
//   );
// }

// export default AIAssistant;

import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  FaRobot,
  FaMicrochip,
  FaBrain,
  FaShieldAlt,
  FaPaperPlane,
  FaMicrophone,
  FaVolumeUp,
  FaVolumeMute,
  FaStop,
  FaSatelliteDish,
  FaDatabase,
  FaWifi,
} from "react-icons/fa";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";
import Reveal from "../Common/Reveal";
import Bot3DCanvas from "./Bot3DCanvas";



function AIAssistant() {

  const [input, setInput] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const [streamingText,
    setStreamingText] =
    useState("");

    const [speakerEnabled,
  setSpeakerEnabled] =
  useState(true);

const [voiceLevel,
  setVoiceLevel] =
  useState(1);

const [isSpeaking,
  setIsSpeaking] =
  useState(false);

  const [messages,
    setMessages] =
    useState([
      {
        type: "system",
        text:
          "AI Core initialized successfully.",
      },
      {
        type: "assistant",
        text:
          "Hello, I'm Sai's AI Assistant. Ask me about projects, skills, internships or career goals.",
      },
    ]);

  const chatContainerRef =
    useRef(null);

  const chatEndRef =
    useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } =
    useSpeechRecognition();
  /* =====================================
      AUTO SCROLL
  ===================================== */

  useEffect(() => {

    if (
      chatContainerRef.current
    ) {

      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;

    }

  }, [
    messages,
    streamingText,
  ]);

  /* =====================================
      SPEECH INPUT
  ===================================== */

  useEffect(() => {

    if (transcript) {

      setInput(transcript);

    }

  }, [transcript]);

useEffect(() => {

  if (!isSpeaking) {

    setVoiceLevel(1);

    return;
  }

  const interval =
    setInterval(() => {

      setVoiceLevel(
        1 +
        Math.sin(
          Date.now() * 0.004
        ) * 0.05
      );

    }, 50);

  return () =>
    clearInterval(interval);

}, [isSpeaking]);

  /* =====================================
      LOAD AVAILABLE VOICES
  ===================================== */

  useEffect(() => {

    speechSynthesis.onvoiceschanged =
      () => {

        speechSynthesis.getVoices();

      };

    return () => {

      speechSynthesis.onvoiceschanged =
        null;

    };

  }, []);

  /* =====================================
      TEXT TO SPEECH
  ===================================== */
const speakResponse = (
  text
) => {

  if (
    !speakerEnabled ||
    !window.speechSynthesis
  ) return;

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(
      text
    );

  utterance.rate = 0.9;
  utterance.pitch = 0.85;
  utterance.volume = 1;

  setIsSpeaking(true);

  const voiceInterval =
    setInterval(() => {
setVoiceLevel(
  prev =>
    prev * 0.8 +
    (1+Math.random() * 0.08) * 0.2
);
    }, 60);

  utterance.onend =
    () => {

      clearInterval(
        voiceInterval
      );

      setVoiceLevel(1);

      setIsSpeaking(false);

    };

  speechSynthesis.speak(
    utterance
  );

};
    /* =====================================
      AI RESPONSE ENGINE
  ===================================== */

  const getAIResponse = (userText) => {
    const q = userText.toLowerCase().trim();

    // 1. GREETINGS
    if (["hi", "hello", "hey", "greetings", "good morning", "good evening", "sup"].some((w) => q.includes(w))) {
      return `Hello! 👋 I am SaiAI, your interactive AI Assistant for Sai Ganesh's portfolio.

You can ask me about:
• 📄 Research Publications & Papers
• 🚀 Featured Projects (AcciSense, Fake News, Tambola, E-Learning)
• 🏢 Internship at AVNL Ordnance Factory
• 💻 Technical Skills & Stack
• 📬 Contact Details & Resume`;
    }

    // 2. WHO IS SAI / ABOUT
    if (["who is sai", "about sai", "who are you", "tell me about", "bio", "background"].some((w) => q.includes(w))) {
      return `👤 About Sai Ganesh Chinni:

Sai Ganesh is an AI Engineer & Full Stack Developer based in Hyderabad / Andhra Pradesh, India.

• 🚀 Specialization: Machine Learning, Computer Vision, React, Flutter, and FastAPI backends.
• 💡 Goal: Architecting intelligent, scalable digital experiences to solve complex problems.`;
    }

    // 3. RESEARCH PUBLICATIONS & PAPERS (SINGLE PUBLICATION)
    if (["paper", "publication", "publications", "research", "ijam", "journal", "published", "article", "cityadapt"].some((w) => q.includes(w))) {
      return `📄 Single Published Research Paper:

• Title: CITYADAPTAI – AI-Driven Smart City Personalization System
• Journal: International Journal of Applied Mathematics (IJAM), Vol. 38, No. 4, 2025
• DOI: https://doi.org/10.12732/ijam.v38i12s.1693
• Contribution & Role: Assisted in frontend development and AI model integration for an AI-driven smart city personalization system.
• Key Tags: AI Personalization, Smart City, AI Model Integration, Frontend Engineering, IJAM`;
    }

    // 4. PROJECTS OVERVIEW
    if (["project", "projects", "work", "built", "apps", "creations"].some((w) => q.includes(w))) {
      return `🚀 Featured Engineering Projects:

1. 🚨 Accident-Detection-AcciSense: AI-powered road safety system (Published Research Paper).
2. 📰 Fake News Detection System: NLP classifier model for identifying misinformation.
3. 🎲 Online Tambola Game: Real-time multiplayer Flutter app with automated ticket sync.
4. 🎓 AI E-Learning Recommendation System: Smart YouTube & tutorial recommendation engine.`;
    }

    // 5. ACCISENSE
    if (q.includes("accisense") || q.includes("accident") || q.includes("road safety")) {
      return `🚨 Accident-Detection-AcciSense:

An AI road safety platform leveraging Computer Vision (YOLO) to analyze live video feeds, detect vehicular accidents instantly, extract GPS locations, and alert emergency dispatch teams in real time.`;
    }

    // 6. FAKE NEWS
    if (q.includes("fake news") || q.includes("news") || q.includes("nlp")) {
      return `📰 Fake News Detection System:

An AI system using Natural Language Processing (NLP) and Machine Learning classifiers to evaluate news article patterns and flag misleading information.`;
    }

    // 7. TAMBOLA
    if (q.includes("tambola") || q.includes("game")) {
      return `🎲 Online Tambola Game:

A real-time multiplayer mobile game developed using Flutter, Dart, and Firebase Realtime DB, featuring automated ticket validation and live number calling sync.`;
    }

    // 8. E-LEARNING
    if (q.includes("learning") || q.includes("youtube") || q.includes("recommendation")) {
      return `🎓 AI Based E-Learning Video Recommendation System:

An EdTech platform that analyzes student goals to curate YouTube educational videos, courses, and interactive assessments.`;
    }

    // 9. SKILLS & STACK
    if (["skill", "skills", "technology", "technologies", "stack", "python", "react", "flutter", "fastapi"].some((w) => q.includes(w))) {
      return `💻 Technical Skills & Stack:

• Frontend: React.js, JavaScript, Tailwind CSS, Framer Motion, HTML5/CSS3
• Mobile: Flutter, Dart, Firebase
• Backend & API: Python, FastAPI, REST APIs, SQLAlchemy
• Database: MySQL, SQLite, Firebase Realtime DB
• AI & Data: Machine Learning, Computer Vision (YOLO), NLP
• Tools: Git, GitHub, Vercel, Docker`;
    }

    // 10. INTERNSHIP & EXPERIENCE
    if (["internship", "experience", "avnl", "ordnance", "training", "company"].some((w) => q.includes(w))) {
      return `🏢 Industrial Internship Experience:

• Company: AVNL Ordnance Factory (Armoured Vehicles Nigam Limited), Hyderabad
• Exposure: Industrial software workflows, defense system exposure, and production engineering processes.`;
    }

    // 11. CONTACT & SOCIALS
    if (["contact", "email", "phone", "reach", "hire", "message", "linkedin", "github"].some((w) => q.includes(w))) {
      return `📬 Get in Touch with Sai Ganesh:

• Email: saiganesh0565@gmail.com
• Phone: +91 8341296052
• GitHub: github.com/Sai8143
• Contact Form: Send a message directly in the "Start A Conversation" section below!`;
    }

    // 12. RESUME
    if (q.includes("resume") || q.includes("cv")) {
      return `📄 Resume Download:

You can view and download Sai's official resume by clicking the "Download Resume" button in the Hero section!`;
    }

    // 13. DEFAULT FALLBACK
    return `🤖 I am SaiAI, your intelligent portfolio assistant!

Try asking:
• "Tell me about Sai's research publication"
• "What projects has Sai built?"
• "What are Sai's core skills and tech stack?"
• "Describe Sai's internship at AVNL Ordnance Factory"
• "How can I contact Sai Ganesh?"`;
  };

  /* =====================================
      SEND PROMPT
  ===================================== */

  const API_URL = import.meta.env.VITE_API_URL || "https://backend-ruby-nine-62.vercel.app";

  const sendPrompt = async (userText) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userText,
      },
    ]);

    setIsTyping(true);
    setStreamingText("");

    let aiReply = "";
    try {
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      if (res.ok) {
        const data = await res.json();
        aiReply = data.reply;
      }
    } catch {
      // Fallback to local intelligence if backend offline
    }

    if (!aiReply) {
      aiReply = getAIResponse(userText);
    }

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setStreamingText(aiReply.slice(0, index));

      if (index >= aiReply.length) {
        clearInterval(interval);

        setMessages((prev) => [
          ...prev,
          {
            type: "assistant",
            text: aiReply,
          },
        ]);

        setStreamingText("");
        speakResponse(aiReply);
        setIsTyping(false);
      }
    }, 6);
  };

  /* =====================================
      QUICK PROMPTS
  ===================================== */

  const handleQuickPrompt = (
    prompt
  ) => {

    sendPrompt(
      prompt
    );

  };

  /* =====================================
      SEND MESSAGE
  ===================================== */

  const handleSend = () => {

    if (!input.trim())
      return;

    const userText =
      input;

    setInput("");

    resetTranscript();

    sendPrompt(
      userText
    );

  };

  /* =====================================
      ENTER KEY
  ===================================== */

  const handleKeyDown = (
    e
  ) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend();

    }

  };

  /* =====================================
      START / STOP VOICE INPUT
  ===================================== */

  const toggleVoiceInput = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: false,
        language: "en-IN",
      });
    }
  };

  /* =====================================
      TOGGLE / STOP SPEAKER
  ===================================== */

  const toggleSpeaker = () => {
    setSpeakerEnabled((prev) => {
      const nextState = !prev;
      if (!nextState && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setVoiceLevel(1);
      }
      return nextState;
    });
  };

  const stopSpeaker = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setVoiceLevel(1);
    setIsSpeaking(false);
    setIsTyping(false);
    setStreamingText("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };
    return (
    <section
      id="ai-assistant"
      className="section"
    >
      <Reveal delay={0.3}>
        <Container>

          {/* HEADER */}

          <div className="mb-20">

            <p className="terminal-label mb-4">
              AI CORE
            </p>

            <h2 className="section-title">
              Advanced Intelligent Assistant
            </h2>

            <p className="section-subtitle">
              Voice-enabled futuristic AI terminal
              integrated into the portfolio.
            </p>

          </div>

          <div
            className="
            grid
            lg:grid-cols-2
            gap-8
            "
          >

            {/* =====================================
                LEFT PANEL
            ===================================== */}

            <GlassCard
              className="p-8"
            >

              <div
                className="
                flex
                items-center
                justify-between
                mb-8
                "
              >

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >
                  <FaRobot />

                  <p className="terminal-label">
                    AI TERMINAL SYSTEM
                  </p>

                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >

                  <button
                    onClick={toggleSpeaker}
                    title={speakerEnabled ? "Mute AI Audio" : "Enable AI Audio"}
                    className={`
                    w-11
                    h-11
                    rounded-2xl
                    border
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    ${
                      speakerEnabled
                        ? "border-white/20 bg-white/10 text-white shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                        : "border-white/10 bg-white/[0.03] text-zinc-500 hover:text-zinc-300"
                    }
                    `}
                  >
                    {speakerEnabled ? <FaVolumeUp className="w-4 h-4" /> : <FaVolumeMute className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={stopSpeaker}
                    title="Stop AI Output & Voice"
                    className="
                    w-11
                    h-11
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    hover:bg-white/10
                    text-zinc-300
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    "
                  >
                    <FaStop className="w-4 h-4" />
                  </button>

                </div>

              </div>

              {/* CHAT AREA */}

              <div
                ref={chatContainerRef}
                className="
                h-[500px]
                overflow-y-auto
                pr-2
                space-y-5
                "
              >

                <AnimatePresence>

                  {messages.map(
                    (
                      message,
                      index
                    ) => (

                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >

                        <div
                          className="
                          flex
                          gap-4
                          "
                        >

                          <div
                            className="
                            w-10
                            h-10
                            rounded-xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            flex
                            items-center
                            justify-center
                            "
                          >

                            {message.type ===
                            "user" ? (
                              <FaBrain />
                            ) : message.type ===
                              "system" ? (
                              <FaMicrochip />
                            ) : (
                              <FaRobot />
                            )}

                          </div>

                          <div
                            className="
                            flex-1
                            p-5
                            rounded-2xl
                            border
                            border-white/10
                            bg-black/20
                            whitespace-pre-line
                            "
                          >
                            {message.text}
                          </div>

                        </div>

                      </motion.div>

                    )
                  )}

                </AnimatePresence>

                {/* STREAMING RESPONSE */}

                {isTyping && (

                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  >

                    <div
                      className="
                      flex
                      gap-4
                      "
                    >

                      <div
                        className="
                        w-10
                        h-10
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        flex
                        items-center
                        justify-center
                        "
                      >
                        <FaRobot />
                      </div>

                      <div
                        className="
                        flex-1
                        p-5
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        whitespace-pre-line
                        "
                      >

                        {streamingText}

                        <motion.span
                          animate={{
                            opacity: [
                              1,
                              0,
                              1,
                            ],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat:
                              Infinity,
                          }}
                        >
                          ▋
                        </motion.span>

                      </div>

                    </div>

                  </motion.div>

                )}

                <div
                  ref={chatEndRef}
                />

              </div>
                            {/* QUICK QUESTIONS */}

              <div
                className="
                mt-6
                mb-6
                flex
                flex-wrap
                gap-3
                "
              >

                <button
                  onClick={() =>
                    handleQuickPrompt(
                      "Tell me about your projects"
                    )
                  }
                  className="
                  px-4
                  py-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-sm
                  hover:bg-white/[0.08]
                  transition-all
                  duration-300
                  "
                >
                  Projects
                </button>

                <button
                  onClick={() =>
                    handleQuickPrompt(
                      "What are your skills?"
                    )
                  }
                  className="
                  px-4
                  py-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-sm
                  hover:bg-white/[0.08]
                  transition-all
                  duration-300
                  "
                >
                  Skills
                </button>

                <button
                  onClick={() =>
                    handleQuickPrompt(
                      "Tell me about your internship"
                    )
                  }
                  className="
                  px-4
                  py-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-sm
                  hover:bg-white/[0.08]
                  transition-all
                  duration-300
                  "
                >
                  Internship
                </button>

                <button
                  onClick={() =>
                    handleQuickPrompt(
                      "How can I contact Sai?"
                    )
                  }
                  className="
                  px-4
                  py-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-sm
                  hover:bg-white/[0.08]
                  transition-all
                  duration-300
                  "
                >
                  Contact
                </button>

              </div>

              {/* INPUT AREA */}

              <form
                onSubmit={handleFormSubmit}
                className="
                mt-8
                flex
                gap-3
                "
              >

                <input
                  value={input}
                  onChange={(e) =>
                    setInput(
                      e.target.value
                    )
                  }
                  onKeyDown={
                    handleKeyDown
                  }
                  placeholder="Ask AI Core... (Press Enter to send)"
                  className="
                  flex-1
                  h-[60px]
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  px-5
                  outline-none
                  focus:border-white/20
                  text-white
                  placeholder:text-zinc-500
                  "
                />

                <button
                  type="submit"
                  title="Send Message (Enter)"
                  className="
                  w-[60px]
                  h-[60px]
                  rounded-2xl
                  bg-white
                  text-black
                  hover:bg-zinc-200
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  shrink-0
                  "
                >
                  <FaPaperPlane />
                </button>

                {browserSupportsSpeechRecognition && (

                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    title={listening ? "Stop Voice Listening" : "Start Voice Input"}
                    className={`
                    w-[60px]
                    h-[60px]
                    rounded-2xl
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    shrink-0
                    ${
                      listening
                        ? "bg-white text-black animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
                    }
                    `}
                  >
                    <FaMicrophone />
                  </button>

                )}

              </form>

            </GlassCard>

            {/* RIGHT PANEL */}

            <GlassCard
              className="
              relative
              min-h-[650px]
              overflow-hidden
              p-8
              "
            >

              {/* Elegant Static Ambient HUD Rings (No shaking or scaling jumps) */}
              <div
                className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[80%]
                h-[80%]
                rounded-full
                border
                border-dashed
                border-white/10
                pointer-events-none
                "
              />

              <div
                className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[60%]
                h-[60%]
                rounded-full
                border
                border-white/10
                pointer-events-none
                "
              />

              <div
                className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                flex
                flex-col
                items-center
                w-full
                "
              >
                <Bot3DCanvas className="w-full h-[380px]" isSpeaking={isSpeaking} />
              </div>

              <div
                className="
                absolute
                bottom-8
                right-8
                p-4
                rounded-2xl
                border
                border-white/10
                bg-black/40
                backdrop-blur-xl
                "
              >
                <p className="terminal-label">
                  SECURITY
                </p>

                <h3 className="mt-2 text-lg">
                  Protected System
                </h3>
              </div>

              <div
                className="
                absolute
                bottom-8
                left-8
                space-y-3
                "
              >

                <div className="flex items-center gap-3">
                  <FaWifi />
                  <span>STATUS ONLINE</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaSatelliteDish />
                  <span>LATENCY 42ms</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaDatabase />
                  <span>DATA ACTIVE</span>
                </div>

              </div>

            </GlassCard>

          </div>

        </Container>

      </Reveal>

    </section>
  );

}

export default AIAssistant;