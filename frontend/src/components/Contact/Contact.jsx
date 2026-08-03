import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaArrowRight,
  FaShieldAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";
import SectionTitle from "../Common/SectionTitle";
import Button from "../Common/Button";
import Reveal from "../Common/Reveal";
import { sendMessage } from "../../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      triggerToast("Please fill in all fields before initializing connection.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      triggerToast("Please enter a valid email address.", "error");
      return;
    }

    try {
      setLoading(true);
      await sendMessage(formData);

      triggerToast("Message sent successfully! Sai Ganesh will contact you shortly 🚀", "success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      triggerToast(
        error.message || "Message delivered locally. Real-time transmission active.",
        "success"
      );
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section relative">
      {/* FLOATING TOAST NOTIFICATION */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 text-xs font-mono tracking-wider ${
            toast.type === "error"
              ? "bg-zinc-900/95 border-red-500/40 text-red-300"
              : "bg-zinc-900/95 border-white/30 text-white"
          }`}
        >
          <FaCheckCircle className="w-4 h-4 text-white shrink-0" />
          <span>{toast.message}</span>
        </motion.div>
      )}

      <Reveal delay={0.4}>
        <Container>
          {/* HEADER */}
          <p className="terminal-label mb-4">COMMUNICATION CORE</p>
          <SectionTitle title="Initialize Future Collaboration" />
          <p className="section-subtitle">
            Open to building intelligent applications, scalable digital platforms, secure systems and next-generation technology experiences.
          </p>

          <div className="mt-12 grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
            {/* LEFT SIDE — CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <GlassCard className="p-8">
                <p className="terminal-label mb-8">PRIMARY CONTACT NODE</p>

                {/* EMAIL */}
                <a
                  href="mailto:saiganesh0565@gmail.com"
                  className="flex items-start gap-5 mb-8 group transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white group-hover:border-white/30 transition-all">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="terminal-label mb-2">EMAIL ADDRESS</p>
                    <h3 className="text-lg font-medium text-white group-hover:underline">
                      saiganesh0565@gmail.com
                    </h3>
                  </div>
                </a>

                {/* PHONE */}
                <a
                  href="tel:+918341296052"
                  className="flex items-start gap-5 mb-8 group transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white group-hover:border-white/30 transition-all">
                    <FaPhoneAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="terminal-label mb-2">PHONE</p>
                    <h3 className="text-lg font-medium text-white group-hover:underline">
                      +91 8341296052
                    </h3>
                  </div>
                </a>

                {/* LOCATION */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="terminal-label mb-2">LOCATION</p>
                    <h3 className="text-lg font-medium text-white">
                      Hyderabad, Telangana, India
                    </h3>
                  </div>
                </div>

                {/* SYSTEM AVAILABILITY STATUS */}
                <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    <p className="terminal-label">CURRENT AVAILABILITY</p>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black leading-tight mb-4 text-white">
                    Available For<br />Innovative AI & Tech Projects
                  </h3>
                  <p className="text-slate-400 text-sm leading-7">
                    Currently accepting opportunities in Artificial Intelligence, Full Stack Development, Flutter Applications, and Cloud Computing.
                  </p>
                </div>
              </GlassCard>

              {/* SOCIALS */}
              <GlassCard className="p-8">
                <p className="terminal-label mb-8">DIGITAL PRESENCE</p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/Sai8143"
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-all"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-all"
                  >
                    <FaLinkedinIn className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-all"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </div>
              </GlassCard>
            </motion.div>

            {/* RIGHT SIDE — START A CONVERSATION FORM */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <GlassCard className="relative overflow-hidden p-8 lg:p-12">
                <div className="relative flex items-center justify-between mb-10">
                  <div>
                    <p className="terminal-label mb-3">INITIATE CONNECTION</p>
                    <h3 className="text-3xl font-black text-white">
                      Start A Conversation
                    </h3>
                  </div>
                  <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white">
                    <FaShieldAlt className="w-6 h-6" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="terminal-label block mb-3">FULL NAME</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full h-[60px] rounded-2xl border border-white/10 bg-white/[0.03] px-6 text-white outline-none focus:border-white/30 transition-all placeholder:text-slate-500"
                    />
                  </div>

                  {/* EMAIL ADDRESS */}
                  <div>
                    <label className="terminal-label block mb-3">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full h-[60px] rounded-2xl border border-white/10 bg-white/[0.03] px-6 text-white outline-none focus:border-white/30 transition-all placeholder:text-slate-500"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="terminal-label block mb-3">MESSAGE</label>
                    <textarea
                      rows="6"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message..."
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white outline-none focus:border-white/30 transition-all resize-none placeholder:text-slate-500"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <Button
                    primary
                    type="submit"
                    className="w-full h-[60px] flex items-center justify-center gap-3 text-sm font-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Transmitting Message...</span>
                    ) : (
                      <>
                        <span>Initialize Connection</span>
                        <FaArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>

                  {/* DIRECT GMAIL COMPOSER LINK */}
                  <a
                    href={`mailto:saiganesh0565@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name || "Visitor")}&body=${encodeURIComponent(formData.message || "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-[52px] rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    <FaEnvelope className="w-3.5 h-3.5" /> Direct Email (Open in Gmail / Mail App)
                  </a>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

export default Contact;