
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";

function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
      relative

      pt-10
      pb-10
      "
    >
      <Container>

        <GlassCard
          className="
          relative

          overflow-hidden

          p-8
          lg:p-10
          "
        >
          {/* Glow Layer */}

          <div
            className="
            absolute
            inset-0

            bg-gradient-to-r
            from-white/[0.02]
            via-transparent
            to-white/[0.02]

            pointer-events-none
            "
          />

          {/* ============================
              TOP
          ============================ */}

          <div
            className="
            relative

            flex
            flex-col
            lg:flex-row

            lg:items-center
            justify-between

            gap-10

            pb-10

            border-b
            border-white/5
            "
          >

            {/* LEFT */}

            <div>

              <p
                className="
                terminal-label
                mb-4
                "
              >
                AI PORTFOLIO SYSTEM
              </p>

              <h2
                className="
                text-4xl
                md:text-5xl

                font-black

                tracking-tight

                leading-none

                mb-6
                "
              >
                <span className="block">
                  SAI GANESH
                </span>

                <span
                  className="
                  text-slate-500
                  "
                >
                  CHINNI
                </span>
              </h2>

              <p
                className="
                max-w-2xl

                text-slate-400

                leading-[2]
                "
              >
                Futuristic developer portfolio
                focused on Artificial Intelligence,
                Cybersecurity, Modern Full Stack
                Engineering and Next Generation
                Technology Experiences.
              </p>

            </div>

            {/* RIGHT */}

            <div
              className="
              flex
              items-center

              gap-4
              "
            >

              {/* GITHUB */}

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
                hover:bg-white/[0.08]

                transition-all
                duration-300
                "
              >
                <FaGithub />
              </a>

              {/* LINKEDIN */}

              <a
                href="https://www.linkedin.com"
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
                hover:bg-white/[0.08]

                transition-all
                duration-300
                "
              >
                <FaLinkedinIn />
              </a>

              {/* INSTAGRAM */}

              <a
                href="https://instagram.com"
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
                hover:bg-white/[0.08]

                transition-all
                duration-300
                "
              >
                <FaInstagram />
              </a>

              {/* SCROLL TOP */}

              <button
                onClick={scrollTop}
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
                hover:bg-white/[0.08]

                hover:-translate-y-1

                transition-all
                duration-300
                "
              >
                <FaArrowUp />
              </button>

            </div>

          </div>

          {/* ============================
              BOTTOM
          ============================ */}

          <div
            className="
            relative

            pt-8

            flex
            flex-col
            lg:flex-row

            lg:items-center
            justify-between

            gap-6
            "
          >

            {/* STATUS */}

            <div
              className="
              flex
              items-center

              gap-3
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

              <p className="terminal-label">
                SYSTEM STATUS : ONLINE
              </p>
            </div>

            {/* COPYRIGHT */}

            <p className="terminal-label">
              © 2026 SAI GANESH CHINNI
            </p>

            {/* ROLE */}

            <p className="terminal-label">
              FUTURE TECHNOLOGY ENGINEER
            </p>

          </div>

        </GlassCard>

      </Container>
    </footer>
  );
}

export default Footer;
