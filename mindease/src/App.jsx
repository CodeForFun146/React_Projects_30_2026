import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 



const NAV_LINKS = ["How It Works", "Features", "Privacy", "Get Started"];

const HOW_IT_WORKS = [
  {
    icon: "💬",
    title: "Answer a few questions",
    desc: "Short, non-intrusive check-in questions about how you've been feeling — takes under 3 minutes.",
  },
  {
    icon: "🧠",
    title: "AI reads between the lines",
    desc: "Our model analyzes patterns in your responses to detect signs of stress, anxiety, or low mood.",
  },
  {
    icon: "🌿",
    title: "Get your insight",
    desc: "Receive a private, personalized mental health snapshot with actionable next steps.",
  },
];

const FEATURES = [
  { icon: "🔒", label: "100% Private", sub: "Nothing leaves your device without consent" },
  { icon: "⚡", label: "Instant Results", sub: "Real-time AI analysis in seconds" },
  { icon: "📊", label: "Track Over Time", sub: "See how your mental state shifts week to week" },
  { icon: "🤝", label: "Human-Backed", sub: "Built with licensed mental health professionals" },
  { icon: "🌍", label: "Always Available", sub: "Check in anytime, anywhere, any day" },
  { icon: "🎯", label: "Personalized", sub: "Insights tailored to your unique patterns" },
];

const TESTIMONIALS = [
  {
    quote: "I didn't realize how burnt out I was until MindEase showed me the pattern. It helped me talk to my doctor.",
    name: "Sara K.",
    role: "Product Designer",
  },
  {
    quote: "Three minutes a day changed how I understand myself. It felt like someone finally listened.",
    name: "Amir T.",
    role: "Graduate Student",
  },
  {
    quote: "As a therapist, I recommend it to clients between sessions. The tracking feature is genuinely useful.",
    name: "Dr. Lena M.",
    role: "Licensed Therapist",
  },
];

// Breathing orb component
function BreathingOrb() {
  return (
    <div style={{ position: "relative", width: 220, height: 220, margin: "0 auto" }}>
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.35); opacity: 0.05; }
        }
        @keyframes breatheCore {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes breatheRing {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.55); opacity: 0; }
        }
        .orb-outer {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, #C4B5FD33 0%, transparent 70%);
          animation: breathe 4s ease-in-out infinite;
        }
        .orb-core {
          position: absolute;
          top: 50%; left: 50%;
          width: 120px; height: 120px;
          margin: -60px 0 0 -60px;
          border-radius: 50%;
          background: radial-gradient(circle at 38% 38%, #C4B5FD, #7C3AED 60%, #0D1B2A);
          box-shadow: 0 0 60px #C4B5FD55, 0 0 120px #7C3AED22;
          animation: breatheCore 4s ease-in-out infinite;
        }
        .orb-ring {
          position: absolute;
          top: 50%; left: 50%;
          width: 140px; height: 140px;
          margin: -70px 0 0 -70px;
          border-radius: 50%;
          border: 1.5px solid #C4B5FD88;
          animation: breatheRing 4s ease-in-out infinite;
        }
      `}</style>
      <div className="orb-outer" />
      <div className="orb-ring" />
      <div className="orb-core" />
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const navigate = useNavigate();  // ← add this line here

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0D1B2A", color: "#F0EEF8", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #C4B5FD44; }
        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .hero-headline { animation: fadeUp 0.9s ease both; }
        .hero-sub { animation: fadeUp 0.9s 0.15s ease both; }
        .hero-cta { animation: fadeUp 0.9s 0.3s ease both; }
        .orb-wrap { animation: float 6s ease-in-out infinite; }

        .nav-link {
          color: #C4B5FDaa;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover { color: #F0EEF8; }

        .btn-primary {
          background: linear-gradient(135deg, #7C3AED, #C4B5FD);
          color: #0D1B2A;
          border: none;
          padding: 14px 32px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px #7C3AED55;
        }

        .btn-ghost {
          background: transparent;
          color: #C4B5FD;
          border: 1.5px solid #C4B5FD55;
          padding: 13px 28px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          border-color: #C4B5FD;
          background: #C4B5FD11;
        }

        .card {
          background: #ffffff08;
          border: 1px solid #ffffff10;
          border-radius: 20px;
          padding: 28px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .card:hover {
          border-color: #C4B5FD44;
          transform: translateY(-4px);
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C4B5FD;
          margin-bottom: 12px;
        }

        .testimonial-card {
          animation: slideIn 0.5s ease both;
        }

        .mood-dot {
          width: 8px; height: 8px; border-radius: 50%;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; text-align: center; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "#0D1B2Aee" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #ffffff10" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #7C3AED, #C4B5FD)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14,
          }}>🧠</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>
            MindEase
          </span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.slice(0, 3).map((l) => (
            <span key={l} className="nav-link">{l}</span>
          ))}
          <button className="btn-primary" onClick={() => navigate('/checkin')}>
  Start Check-In
</button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 48px 80px", position: "relative" }}>
        {/* bg glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED18 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 80, maxWidth: 1100, width: "100%" }}>
          <div style={{ flex: 1 }}>
            <div className="section-label hero-headline">Mental Wellness Intelligence</div>
            <h1 className="hero-headline" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}>
              Know how you're{" "}
              <em style={{ fontStyle: "italic", color: "#C4B5FD" }}>really</em>{" "}
              feeling.
            </h1>
            <p className="hero-sub" style={{ fontSize: 18, lineHeight: 1.7, color: "#F0EEF8bb", maxWidth: 480, marginBottom: 40 }}>
              MindEase uses AI to detect signs of depression, stress, and nervousness — giving you honest mental health insights in minutes, not months.
            </p>
            <div className="hero-cta" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => navigate('/checkin')}>
  Start Free Check-In →
</button>
              <button className="btn-ghost">See How It Works</button>
            </div>

            {/* trust strip */}
            <div style={{ marginTop: 48, display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { dot: "#A8C5B8", text: "10k+ people checked in this week" },
                { dot: "#C4B5FD", text: "Backed by clinical research" },
                { dot: "#E8A598", text: "No account required" },
              ].map(({ dot, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#F0EEF8aa" }}>
                  <span className="mood-dot" style={{ background: dot }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="orb-wrap" style={{ flexShrink: 0 }}>
            <BreathingOrb />
            <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#C4B5FD88", letterSpacing: "0.08em", fontWeight: 500 }}>
              BREATHE. WE'RE LISTENING.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label" style={{ textAlign: "center" }}>The Process</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 44px)", textAlign: "center", marginBottom: 64, fontWeight: 700 }}>
          Simple. Private. Honest.
        </h2>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={i} className="card" style={{ position: "relative" }}>
              <div style={{
                position: "absolute", top: -1, left: 28,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                color: "#C4B5FD44", fontFamily: "'Playfair Display', serif",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 36, marginBottom: 16, marginTop: 8 }}>{step.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ fontSize: 15, color: "#F0EEF8aa", lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MOOD PREVIEW STRIP */}
      <section style={{ padding: "60px 48px", background: "#ffffff04", borderTop: "1px solid #ffffff08", borderBottom: "1px solid #ffffff08" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4B5FD88", marginBottom: 20 }}>
            We detect signals across
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Depression", color: "#7C3AED" },
              { label: "Chronic Stress", color: "#C4B5FD" },
              { label: "Anxiety", color: "#A8C5B8" },
              { label: "Nervousness", color: "#E8A598" },
              { label: "Burnout", color: "#7C3AED" },
              { label: "Low Mood", color: "#C4B5FD" },
              { label: "Social Withdrawal", color: "#A8C5B8" },
            ].map(({ label, color }) => (
              <div key={label} style={{
                padding: "8px 18px",
                borderRadius: 100,
                border: `1.5px solid ${color}44`,
                fontSize: 13,
                fontWeight: 500,
                color: color,
                background: `${color}11`,
              }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label" style={{ textAlign: "center" }}>Why MindEase</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 44px)", textAlign: "center", marginBottom: 60, fontWeight: 700 }}>
          Built for people, not metrics.
        </h2>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {FEATURES.map((f) => (
            <div key={f.label} className="card" style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <span style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontSize: 14, color: "#F0EEF8aa", lineHeight: 1.55 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 48px", background: "linear-gradient(180deg, transparent 0%, #7C3AED0a 100%)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label">Real Experiences</div>
          <div key={activeTestimonial} className="testimonial-card" style={{ marginTop: 24 }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(18px, 2.5vw, 26px)",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "#F0EEF8dd",
              marginBottom: 28,
            }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{TESTIMONIALS[activeTestimonial].name}</div>
            <div style={{ fontSize: 13, color: "#C4B5FD88", marginTop: 4 }}>{TESTIMONIALS[activeTestimonial].role}</div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 32 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: i === activeTestimonial ? 24 : 8,
                  height: 8, borderRadius: 100,
                  background: i === activeTestimonial ? "#C4B5FD" : "#C4B5FD33",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: "100px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🌿</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 700, marginBottom: 20, lineHeight: 1.15 }}>
            Your mind deserves attention.
          </h2>
          <p style={{ fontSize: 17, color: "#F0EEF8aa", lineHeight: 1.7, marginBottom: 40 }}>
            Start your free mental health check-in right now. No account, no judgment, no data sold. Just honest insight.
          </p>
          <button className="btn-primary" onClick={() => navigate('/checkin')}>
  Check In For Free →
</button>
          <p style={{ fontSize: 13, color: "#F0EEF8aa", marginTop: 16 }}>
            Takes 3 minutes · Completely private · Built with care
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ffffff0a", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #C4B5FD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🧠</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>MindEase</span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privacy Policy", "Terms", "Research", "Contact"].map((l) => (
            <span key={l} className="nav-link" style={{ fontSize: 13 }}>{l}</span>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#F0EEF8aa" }}>
          Not a substitute for professional mental health care.
        </p>
      </footer>
    </div>
  );
}
