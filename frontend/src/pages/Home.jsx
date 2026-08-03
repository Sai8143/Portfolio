import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Publications from "../components/Publications/Publications";
import VisitorCounter from "../components/VisitorCounter/VisitorCounter";
import AIAssistant from "../components/AIAssistant/AIAssistant";
import Contact from "../components/Contact/Contact";

function Home({ onSelectProject, onLaunchSimulator, onOpenResume, onOpenAnalytics, onToast }) {
  return (
    <main id="home" className="relative w-full overflow-hidden">
      {/* HERO */}
      <section id="hero">
        <Hero onOpenResume={onOpenResume} />
      </section>

      {/* ABOUT */}
      <section id="about">
        <About />
      </section>

      {/* SKILLS */}
      <section id="skills">
        <Skills />
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <Projects onSelectProject={onSelectProject} onLaunchSimulator={onLaunchSimulator} />
      </section>

      {/* PUBLICATIONS */}
      <section id="publications">
        <Publications />
      </section>

      {/* VISITOR COUNTER */}
      <section id="visitor-counter">
        <VisitorCounter onOpenAnalytics={onOpenAnalytics} />
      </section>

      {/* AI ASSISTANT */}
      <section id="ai-assistant">
        <AIAssistant />
      </section>

      {/* CONTACT */}
      <section id="contact">
        <Contact onToast={onToast} />
      </section>
    </main>
  );
}

export default Home;
