
import { useEffect, useState } from "react";

import {
  HiOutlineMenuAlt3,
  HiX,
} from "react-icons/hi";

import {
  FiUser,
  FiArrowUpRight,
} from "react-icons/fi";

import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    name: "Home",
    id: "home",
  },
  {
    name: "About",
    id: "about",
  },
  {
    name: "Skills",
    id: "skills",
  },
  {
    name: "Projects",
    id: "projects",
  },
  {
    name: "Papers",
    id: "publications",
  },
  {
    name: "Reach",
    id: "visitor-counter",
  },
  {
    name: "Assistant",
    id: "ai-assistant",
  },
  {
    name: "Contact",
    id: "contact",
  },
];

function Navbar() {

  const [active, setActive] =
    useState("home");

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  /* =====================================
      SCROLL DETECTION
  ===================================== */

  useEffect(() => {

  const handleScroll = () => {

    setScrolled(
      window.scrollY > 30
    );

    const scrollPosition =
      window.scrollY +
      window.innerHeight / 3;

    let currentSection =
      "home";

    navItems.forEach((item) => {

      const section =
        document.getElementById(
          item.id
        );

      if (!section) return;

      if (
        scrollPosition >=
        section.offsetTop
      ) {
        currentSection =
          item.id;
      }

    });

    setActive(
      currentSection
    );

  };

  handleScroll();

  window.addEventListener(
    "scroll",
    handleScroll
  );

  return () => {

    window.removeEventListener(
      "scroll",
      handleScroll
    );

  };

}, []);

  /* =====================================
      SCROLL TO SECTION
  ===================================== */

const scrollToSection = (
  id
) => {

  setActive(id);

  const section =
    document.getElementById(id);

  if (section) {

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  }

  setMobileOpen(false);

};

  return (

    <header
      className={`
      fixed
      top-0
      left-0

      w-full

      z-[999]

      transition-all
      duration-500

      ${
        scrolled
          ? "py-4"
          : "py-6"
      }
      `}
    >

      <div
        className="
        max-w-[1400px]

        mx-auto

        px-5
        lg:px-8
        "
      >

        {/* =====================================
            MAIN NAVBAR
        ===================================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: -20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: .6,
          }}

          className={`
          relative

          h-[78px]

          rounded-[30px]

          border

          flex
          items-center
          justify-between

          px-5
          lg:px-8

          overflow-hidden

          transition-all
          duration-500

          ${
            scrolled
              ? `
                border-white/[0.08]

                bg-black/55

                backdrop-blur-2xl

                shadow-[0_10px_40px_rgba(0,0,0,0.45)]
              `
              : `
                border-white/[0.04]

                bg-black/30

                backdrop-blur-xl
              `
          }
          `}
        >

          {/* =====================================
              BACKGROUND GLOW
          ===================================== */}

          <div
            className="
            absolute

            inset-0

            bg-gradient-to-r
            from-white/[0.015]
            via-transparent
            to-white/[0.015]

            pointer-events-none
            "
          />

          {/* =====================================
              LEFT LOGO
          ===================================== */}

          <button

            onClick={() =>
              scrollToSection(
                "home"
              )
            }

            className="
            relative

            flex
            items-center

            gap-4

            shrink-0

            z-10
            "
          >

            {/* ICON */}

            <div
              className="
              relative

              w-12
              h-12

              rounded-2xl

              border
              border-white/[0.08]

              bg-white/[0.03]

              flex
              items-center
              justify-center

              overflow-hidden
              "
            >

              <div
                className="
                absolute

                inset-0

                bg-gradient-to-br
                from-white/[0.05]
                to-transparent
                "
              />

              <FiUser
                className="
                text-[20px]

                text-white

                relative
                z-10
                "
              />

            </div>

            {/* TEXT */}

            <div
              className="
              flex
              flex-col

              items-start
              "
            >

              <h2
                className="
                text-[22px]

                font-black

                tracking-[-1px]

                text-white

                leading-none
                "
              >
                SAI GANESH
              </h2>

              <span
                className="
                mt-1

                text-[10px]

                uppercase

                tracking-[4px]

                text-slate-500

                font-mono
                "
              >
                SYSTEM ACTIVE
              </span>

            </div>

          </button>

          {/* =====================================
              DESKTOP NAV
          ===================================== */}

          <div
            className="
            hidden
            lg:flex
            items-center
            gap-1.5
            h-[52px]
            px-2.5
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.02]
            backdrop-blur-2xl
            "
          >
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className={`
                relative
                h-[40px]
                px-3.5
                xl:px-4
                rounded-full
                font-medium
                text-[13px]
                tracking-wide
                transition-all
                duration-300
                overflow-hidden
                whitespace-nowrap
                ${
                  active === item.id
                    ? "text-black font-semibold"
                    : "text-slate-400 hover:text-white"
                }
                `}
              >
                {/* ACTIVE BG */}
                {active === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="
                    absolute
                    inset-0
                    bg-white
                    rounded-full
                    shadow-[0_0_20px_rgba(255,255,255,0.15)]
                    "
                  />
                )}

                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </div>

          {/* =====================================
              RIGHT SIDE ACTION / MOBILE TOGGLE
          ===================================== */}

          <div
            className="
            flex
            items-center
            gap-3
            relative
            z-10
            "
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="
              hidden
              xl:flex
              items-center
              gap-2
              h-[42px]
              px-4
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              hover:bg-white/[0.08]
              text-xs
              font-mono
              text-zinc-300
              hover:text-white
              transition-all
              "
            >
              <span>Get In Touch</span>
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </button>
            {/* MOBILE MENU */}

            <button

              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }

              className="
              lg:hidden

              w-12
              h-12

              rounded-2xl

              border
              border-white/[0.08]

              bg-white/[0.03]

              flex
              items-center
              justify-center

              text-white
              "
            >

              {
                mobileOpen
                  ? (
                    <HiX
                      className="
                      text-[24px]
                      "
                    />
                  )
                  : (
                    <HiOutlineMenuAlt3
                      className="
                      text-[24px]
                      "
                    />
                  )
              }

            </button>

          </div>

        </motion.div>

        {/* =====================================
            MOBILE MENU
        ===================================== */}

        <AnimatePresence>

          {
            mobileOpen && (

              <motion.div

                initial={{
                  opacity: 0,
                  y: -20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                  y: -20,
                }}

                transition={{
                  duration: .3,
                }}

                className="
                lg:hidden

                mt-4
                "
              >

                <div
                  className="
                  rounded-[30px]

                  border
                  border-white/[0.08]

                  bg-black/85

                  backdrop-blur-2xl

                  p-5

                  space-y-2.5

                  max-h-[75vh]

                  overflow-y-auto

                  custom-scrollbar
                  "
                >

                  {navItems.map(
                    (item, index) => (

                      <button

                        key={index}

                        onClick={() =>
                          scrollToSection(
                            item.id
                          )
                        }

                        className={`
                        w-full

                        h-[56px]

                        rounded-2xl

                        text-[15px]

                        font-medium

                        transition-all
                        duration-300

                        ${
                          active ===
                          item.id
                            ? `
                              bg-white

                              text-black
                            `
                            : `
                              bg-white/[0.03]

                              text-slate-300
                            `
                        }
                        `}
                      >

                        {item.name}

                      </button>

                    )
                  )}

                </div>

              </motion.div>

            )
          }

        </AnimatePresence>

      </div>

    </header>

  );

}

export default Navbar;

