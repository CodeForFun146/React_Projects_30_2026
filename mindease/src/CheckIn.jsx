import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    id: 1,
    category: "mood",
    question: "How would you describe your mood over the past week?",
    options: [
      { text: "Happy and positive most of the time", score: 0 },
      { text: "Okay, had some ups and downs", score: 1 },
      { text: "Mostly low or sad", score: 2 },
      { text: "Very down, almost no joy", score: 3 },
    ],
  },
  {
    id: 2,
    category: "stress",
    question: "How often do you feel overwhelmed or under pressure?",
    options: [
      { text: "Rarely or never", score: 0 },
      { text: "Sometimes, but I manage", score: 1 },
      { text: "Often, it's hard to cope", score: 2 },
      { text: "Almost constantly", score: 3 },
    ],
  },
  {
    id: 3,
    category: "sleep",
    question: "How has your sleep been lately?",
    options: [
      { text: "Sleeping well, feel rested", score: 0 },
      { text: "Occasionally restless", score: 1 },
      { text: "Trouble sleeping most nights", score: 2 },
      { text: "Barely sleeping or sleeping too much", score: 3 },
    ],
  },
  {
    id: 4,
    category: "nervousness",
    question: "Do you experience nervousness or anxiety in daily situations?",
    options: [
      { text: "No, I feel calm and in control", score: 0 },
      { text: "Mild nervousness occasionally", score: 1 },
      { text: "Frequent anxiety that affects my day", score: 2 },
      { text: "Intense anxiety, hard to function", score: 3 },
    ],
  },
  {
    id: 5,
    category: "energy",
    question: "How are your energy levels throughout the day?",
    options: [
      { text: "High energy, feel motivated", score: 0 },
      { text: "Normal, occasional tiredness", score: 1 },
      { text: "Often fatigued and drained", score: 2 },
      { text: "Exhausted even after resting", score: 3 },
    ],
  },
  {
    id: 6,
    category: "social",
    question: "How do you feel about socializing or being around people?",
    options: [
      { text: "I enjoy it and seek it out", score: 0 },
      { text: "I'm okay with it, sometimes prefer alone time", score: 1 },
      { text: "I often avoid social situations", score: 2 },
      { text: "I've withdrawn from people almost completely", score: 3 },
    ],
  },
  {
    id: 7,
    category: "focus",
    question: "How is your ability to concentrate or make decisions?",
    options: [
      { text: "Sharp and focused as usual", score: 0 },
      { text: "Slightly distracted sometimes", score: 1 },
      { text: "Often can't focus, mind wanders", score: 2 },
      { text: "Very hard to think clearly or decide anything", score: 3 },
    ],
  },
  {
    id: 8,
    category: "physical",
    question: "Have you noticed physical symptoms like headaches, chest tightness, or stomach issues?",
    options: [
      { text: "No physical symptoms", score: 0 },
      { text: "Mild, occasional symptoms", score: 1 },
      { text: "Frequent physical discomfort", score: 2 },
      { text: "Severe or daily physical symptoms", score: 3 },
    ],
  },
  {
    id: 9,
    category: "hopeful",
    question: "How do you feel about the future?",
    options: [
      { text: "Optimistic and hopeful", score: 0 },
      { text: "Uncertain but okay", score: 1 },
      { text: "Mostly worried or pessimistic", score: 2 },
      { text: "Hopeless or like things won't improve", score: 3 },
    ],
  },
  {
    id: 10,
    category: "selfcare",
    question: "How well are you taking care of yourself (eating, hygiene, exercise)?",
    options: [
      { text: "Very well, maintaining healthy habits", score: 0 },
      { text: "Mostly okay, some slip-ups", score: 1 },
      { text: "Struggling to maintain basic self-care", score: 2 },
      { text: "Neglecting self-care significantly", score: 3 },
    ],
  },
];

function getResult(totalScore) {
  const max = QUESTIONS.length * 3;
  const pct = (totalScore / max) * 100;

  if (pct <= 20) {
    return {
      level: "Doing Well",
      emoji: "🌟",
      color: "#A8C5B8",
      bg: "#A8C5B811",
      border: "#A8C5B844",
      description:
        "Your responses suggest you're in a good mental space. You show healthy emotional patterns, stable energy, and positive coping. Keep nurturing these habits.",
      tips: [
        "Maintain your current routine and sleep habits",
        "Continue staying connected with people you care about",
        "Practice gratitude or journaling to sustain your mindset",
      ],
      cta: "Keep checking in weekly to track your wellbeing.",
    };
  } else if (pct <= 45) {
    return {
      level: "Mild Stress",
      emoji: "🌤️",
      color: "#C4B5FD",
      bg: "#C4B5FD11",
      border: "#C4B5FD44",
      description:
        "You're experiencing some stress and emotional fatigue, but you're managing. These feelings are common and addressable with the right habits.",
      tips: [
        "Try 10 minutes of daily mindfulness or deep breathing",
        "Reduce screen time before bed to improve sleep quality",
        "Talk to a trusted friend or family member about how you feel",
      ],
      cta: "Consider checking in daily for the next week.",
    };
  } else if (pct <= 65) {
    return {
      level: "Moderate Concern",
      emoji: "🌧️",
      color: "#E8A598",
      bg: "#E8A59811",
      border: "#E8A59844",
      description:
        "Your responses indicate moderate levels of stress, anxiety, or low mood. These feelings are real and deserve attention — you don't have to push through alone.",
      tips: [
        "Consider speaking with a counselor or therapist",
        "Establish a daily routine to create structure and stability",
        "Limit news and social media — protect your mental energy",
      ],
      cta: "We recommend speaking with a mental health professional.",
    };
  } else {
    return {
      level: "High Distress",
      emoji: "🌩️",
      color: "#F87171",
      bg: "#F8717111",
      border: "#F8717144",
      description:
        "Your answers suggest you may be experiencing significant depression, anxiety, or emotional distress. This is important — please reach out for support.",
      tips: [
        "Reach out to a mental health professional as soon as possible",
        "Talk to someone you trust today about how you're feeling",
        "In Pakistan: Umang helpline 0317-4288665 (free, confidential)",
      ],
      cta: "You are not alone. Help is available and things can get better.",
    };
  }
}

const CATEGORY_ICONS = {
  mood: "😔",
  stress: "😤",
  sleep: "😴",
  nervousness: "😰",
  energy: "⚡",
  social: "👥",
  focus: "🎯",
  physical: "🫀",
  hopeful: "🔭",
  selfcare: "🌿",
};

export default function CheckIn() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  const [animating, setAnimating] = useState(false);

  const progress = ((current) / QUESTIONS.length) * 100;
  const q = QUESTIONS[current];
  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  function handleSelect(score) {
    setSelected(score);
  }

  function handleNext() {
    if (selected === null) return;
    setAnimating(true);
    setTimeout(() => {
      const newAnswers = [...answers, selected];
      setAnswers(newAnswers);
      setSelected(null);
      if (current + 1 >= QUESTIONS.length) {
        setDone(true);
      } else {
        setCurrent((c) => c + 1);
      }
      setAnimating(false);
    }, 300);
  }

  function handleRestart() {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setDone(false);
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0D1B2A", color: "#F0EEF8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .question-wrap {
          animation: fadeUp 0.4s ease both;
        }
        .question-wrap.leaving {
          animation: fadeOut 0.3s ease both;
        }
        .result-wrap {
          animation: scaleIn 0.5s ease both;
        }
        .option-btn {
          width: 100%;
          background: #ffffff06;
          border: 1.5px solid #ffffff12;
          border-radius: 14px;
          padding: 16px 20px;
          color: #F0EEF8;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1.5;
        }
        .option-btn:hover {
          border-color: #C4B5FD66;
          background: #C4B5FD0a;
        }
        .option-btn.selected {
          border-color: #C4B5FD;
          background: #C4B5FD18;
          color: #F0EEF8;
        }
        .next-btn {
          background: linear-gradient(135deg, #7C3AED, #C4B5FD);
          color: #0D1B2A;
          border: none;
          padding: 14px 36px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          opacity: 1;
        }
        .next-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .next-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px #7C3AED44;
        }
        .tip-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: #ffffff06;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.6;
          color: #F0EEF8cc;
        }
      `}</style>

      {/* Top bar */}
      <div style={{ padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ffffff08" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #C4B5FD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🧠</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700 }}>MindEase</span>
        </div>
        {!done && (
          <span style={{ fontSize: 13, color: "#F0EEF8aa", fontWeight: 500 }}>
            Question {current + 1} of {QUESTIONS.length}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {!done && (
        <div style={{ height: 3, background: "#ffffff0a" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #7C3AED, #C4B5FD)", transition: "width 0.4s ease", borderRadius: "0 2px 2px 0" }} />
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 620 }}>

          {!done ? (
            <div className={`question-wrap ${animating ? "leaving" : ""}`}>
              {/* Category label */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <span style={{ fontSize: 22 }}>{CATEGORY_ICONS[q.category]}</span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4B5FD" }}>
                  {q.category}
                </span>
              </div>

              {/* Question */}
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, lineHeight: 1.3, marginBottom: 32 }}>
                {q.question}
              </h2>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn ${selected === opt.score ? "selected" : ""}`}
                    onClick={() => handleSelect(opt.score)}
                  >
                    <span style={{ marginRight: 12, color: selected === opt.score ? "#C4B5FD" : "#ffffff33", fontWeight: 600 }}>
                      {["A", "B", "C", "D"][i]}
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>

              {/* Next */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="next-btn" onClick={handleNext} disabled={selected === null}>
                  {current + 1 === QUESTIONS.length ? "See My Results →" : "Next →"}
                </button>
              </div>
            </div>

          ) : (
            <div className="result-wrap">
              {/* Result card */}
              <div style={{ background: result.bg, border: `1.5px solid ${result.border}`, borderRadius: 24, padding: "36px 32px", marginBottom: 24, textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>{result.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: result.color, marginBottom: 8 }}>
                  Your Result
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: result.color, marginBottom: 16 }}>
                  {result.level}
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "#F0EEF8cc", maxWidth: 480, margin: "0 auto" }}>
                  {result.description}
                </p>
              </div>

              {/* Score bar */}
              <div style={{ background: "#ffffff06", borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#F0EEF8aa", marginBottom: 10 }}>
                  <span>Wellness Score</span>
                  <span style={{ color: result.color, fontWeight: 600 }}>
                    {Math.round(((QUESTIONS.length * 3 - totalScore) / (QUESTIONS.length * 3)) * 100)}%
                  </span>
                </div>
                <div style={{ height: 8, background: "#ffffff0a", borderRadius: 100 }}>
                  <div style={{
                    height: "100%",
                    width: `${((QUESTIONS.length * 3 - totalScore) / (QUESTIONS.length * 3)) * 100}%`,
                    background: `linear-gradient(90deg, ${result.color}88, ${result.color})`,
                    borderRadius: 100,
                    transition: "width 1s ease",
                  }} />
                </div>
              </div>

              {/* Tips */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#F0EEF8aa", marginBottom: 14 }}>
                  What you can do
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {result.tips.map((tip, i) => (
                    <div key={i} className="tip-item">
                      <span style={{ color: result.color, fontSize: 16, flexShrink: 0 }}>→</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA note */}
              <div style={{ textAlign: "center", padding: "16px", background: "#ffffff04", borderRadius: 12, marginBottom: 28, fontSize: 14, color: "#C4B5FDaa", fontStyle: "italic" }}>
                {result.cta}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={handleRestart}
                  style={{ background: "transparent", border: "1.5px solid #ffffff20", color: "#F0EEF8aa", padding: "12px 24px", borderRadius: 100, fontSize: 14, cursor: "pointer", fontFamily: "Inter", transition: "all 0.2s" }}
                >
                  Retake Check-In
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="next-btn"
                  style={{ padding: "12px 28px" }}
                >
                  Back to Home
                </button>
              </div>

              {/* Disclaimer */}
              <p style={{ textAlign: "center", fontSize: 12, color: "#ffffff33", marginTop: 28, lineHeight: 1.6 }}>
                This is not a clinical diagnosis. MindEase is a screening tool only.<br />
                Always consult a licensed mental health professional for medical advice.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
