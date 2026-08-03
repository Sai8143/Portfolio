
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

  const getAIResponse = (
    userText
  ) => {

    const text =
      userText.toLowerCase();

    if (
      text.includes("project") ||
      text.includes("projects")
    ) {
      return `
Sai has developed several major projects:

1. Fake News Detection System
2. Accident-Detection-AcciSense
3. Online Tambola Game
4. AI Based E-Learning Video Recommendation System

These projects demonstrate expertise in Artificial Intelligence, Full Stack Development and modern software engineering.
      `;
    }

    if (
      text.includes("skill") ||
      text.includes("skills") ||
      text.includes("technology")
    ) {
      return `
Sai's core technical skills include:

• React.js
• JavaScript
• Tailwind CSS
• Flutter
• Dart
• Python
• FastAPI
• Artificial Intelligence
• Machine Learning
• Firebase
• MySQL
• Git & GitHub
• Full Stack Development
      `;
    }

    if (
      text.includes("internship") ||
      text.includes("experience")
    ) {
      return `
Sai completed internship training at:

AVNL Ordnance Factory
Hyderabad

He gained practical industry exposure and technical experience.
      `;
    }

    if (
      text.includes("contact") ||
      text.includes("email")
    ) {
      return `
You can connect with Sai through:

Email:
saiganesh0565@gmail.com

GitHub:
github.com/Sai8143

Use the Contact section for more details.
      `;
    }

    if (
      text.includes("resume")
    ) {
      return `
You can download Sai's resume directly from the Hero section.
      `;
    }

    return `
I can help you explore:

• Projects
• Skills
• Technologies
• Internship Experience
• Resume
• Contact Information
• Career Goals

Try asking:
• Tell me about your projects
• What are your skills?
• Describe your internship
• How can I contact Sai?
    `;
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
      const res = await fetch(`${API_URL}/ai/chat`, {
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
      START VOICE
  ===================================== */

  const startVoice = () => {

    SpeechRecognition.startListening(
      {
        continuous: false,
        language: "en-IN",
      }
    );

  };

  /* =====================================
      STOP SPEAKER
  ===================================== */

const stopSpeaker = () => {

  window.speechSynthesis.cancel();

  setVoiceLevel(1);

  setIsSpeaking(false);

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
                    onClick={() =>
                      setSpeakerEnabled(
                        !speakerEnabled
                      )
                    }
                    className="
                    w-10
                    h-10
                    rounded-xl
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    "
                  >
                    <FaVolumeUp />
                  </button>

                  <button
                    onClick={
                      stopSpeaker
                    }
                    className="
                    w-10
                    h-10
                    rounded-xl
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    "
                  >
                    <FaStop />
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

              <div
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
                  placeholder="Ask AI Core..."
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
                  "
                />

                <button
                  onClick={
                    handleSend
                  }
                  className="
                  w-[60px]
                  h-[60px]
                  rounded-2xl
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                  "
                >
                  <FaPaperPlane />
                </button>

                {browserSupportsSpeechRecognition && (

                  <button
                    onClick={
                      startVoice
                    }
                    className={`
                    w-[60px]
                    h-[60px]
                    rounded-2xl
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    ${
                      listening
                        ? "bg-white text-black"
                        : "bg-white/5"
                    }
                    `}
                  >
                    <FaMicrophone />
                  </button>

                )}

              </div>

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