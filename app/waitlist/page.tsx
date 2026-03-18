import { useState } from "react";
import Head from "next/head";

const SUPABASE_URL = "https://qgrttewmbpgzavrcladl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFncnR0ZXdtYnBnemF2cmNsYWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxODg0MjEsImV4cCI6MjA4Nzc2NDQyMX0.GwBAAJmdBy8PKMr9tAyXbj0MWNx5RiKtF_ChmBjPYR8";

export default function Waitlist() {
  const [form, setForm] = useState({ first_name: "", email: "", role: "", priority: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const { first_name, email, role, priority } = form;
    if (!first_name || !email || !role || !priority) {
      setErrorMsg("Please complete all fields to join the waitlist.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({ first_name, email, role, priority }),
      });

      if (res.status === 409) {
        setErrorMsg("This email is already on the waitlist.");
        setStatus("idle");
        return;
      }

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <>
      <Head>
        <title>Join the Waitlist — Esplorare Sens</title>
        <meta name="description" content="Early access to Sens — monthly intelligence for independent luxury accommodation operators." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0e0d0b; }
        .wl-wrap { font-family: 'DM Sans', sans-serif; background: #0e0d0b; min-height: 100vh; color: #e8e4dc; }
        .wl-nav { display: flex; justify-content: space-between; align-items: center; padding: 2rem 3rem; border-bottom: 0.5px solid rgba(232,228,220,0.12); }
        .wl-logo { font-family: 'Libre Baskerville', serif; font-size: 15px; letter-spacing: 0.08em; color: #e8e4dc; text-transform: uppercase; }
        .wl-logo em { font-style: italic; font-weight: 400; }
        .wl-nav-tag { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,228,220,0.4); }
        .wl-main { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 73px); }
        .wl-left { padding: 5rem 3rem 4rem; border-right: 0.5px solid rgba(232,228,220,0.12); display: flex; flex-direction: column; justify-content: space-between; }
        .wl-eyebrow { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(232,228,220,0.45); margin-bottom: 2rem; }
        .wl-heading { font-family: 'Libre Baskerville', serif; font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 400; line-height: 1.2; color: #e8e4dc; margin: 0 0 2rem; }
        .wl-heading em { font-style: italic; color: rgba(232,228,220,0.6); }
        .wl-desc { font-size: 15px; font-weight: 300; line-height: 1.75; color: rgba(232,228,220,0.6); max-width: 420px; margin-bottom: 3rem; }
        .wl-pillars { display: flex; flex-direction: column; gap: 1rem; }
        .wl-pillar { display: flex; align-items: flex-start; gap: 1rem; }
        .wl-pillar-num { font-family: 'Libre Baskerville', serif; font-size: 11px; color: rgba(232,228,220,0.3); padding-top: 2px; min-width: 20px; }
        .wl-pillar-text { font-size: 13px; font-weight: 300; color: rgba(232,228,220,0.55); line-height: 1.5; }
        .wl-pillar-text strong { font-weight: 500; color: rgba(232,228,220,0.85); }
        .wl-left-footer { font-size: 11px; color: rgba(232,228,220,0.25); letter-spacing: 0.06em; border-top: 0.5px solid rgba(232,228,220,0.08); padding-top: 1.5rem; }
        .wl-right { padding: 5rem 3rem 4rem; display: flex; flex-direction: column; justify-content: center; }
        .wl-form-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,228,220,0.4); display: block; margin-bottom: 0.5rem; }
        .wl-field { margin-bottom: 1.5rem; }
        .wl-input { width: 100%; background: rgba(232,228,220,0.04); border: 0.5px solid rgba(232,228,220,0.18); color: #e8e4dc; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; padding: 0.85rem 1rem; border-radius: 2px; outline: none; transition: border-color 0.2s; appearance: none; -webkit-appearance: none; }
        .wl-input::placeholder { color: rgba(232,228,220,0.25); }
        .wl-input:focus { border-color: rgba(232,228,220,0.5); background: rgba(232,228,220,0.06); }
        select.wl-input { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(232,228,220,0.4)' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; cursor: pointer; }
        select.wl-input option { background: #1a1916; color: #e8e4dc; }
        .wl-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .wl-submit { width: 100%; background: #e8e4dc; color: #0e0d0b; border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem; cursor: pointer; border-radius: 2px; margin-top: 0.5rem; transition: background 0.2s, transform 0.15s; }
        .wl-submit:hover { background: #f5f2ea; }
        .wl-submit:active { transform: scale(0.99); }
        .wl-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .wl-disclaimer { font-size: 11px; color: rgba(232,228,220,0.25); text-align: center; margin-top: 1rem; line-height: 1.6; }
        .wl-error { font-size: 12px; color: #e87c6a; margin-top: 0.75rem; text-align: center; }
        .wl-divider { height: 0.5px; background: rgba(232,228,220,0.1); margin: 1.5rem 0; }
        .wl-success { text-align: center; padding: 3rem 0; }
        .wl-success-mark { font-family: 'Libre Baskerville', serif; font-size: 2.5rem; color: rgba(232,228,220,0.3); margin-bottom: 1.5rem; }
        .wl-success h3 { font-family: 'Libre Baskerville', serif; font-size: 1.4rem; font-weight: 400; color: #e8e4dc; margin-bottom: 0.75rem; }
        .wl-success p { font-size: 14px; font-weight: 300; color: rgba(232,228,220,0.5); line-height: 1.7; }
        @media (max-width: 768px) {
          .wl-nav { padding: 1.5rem; }
          .wl-main { grid-template-columns: 1fr; }
          .wl-left { border-right: none; border-bottom: 0.5px solid rgba(232,228,220,0.12); padding: 3rem 1.5rem 2.5rem; }
          .wl-right { padding: 3rem 1.5rem; }
          .wl-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="wl-wrap">
        <nav className="wl-nav">
          <div className="wl-logo">Esplorare <em>Sens</em></div>
          <div className="wl-nav-tag">Pre-launch waitlist</div>
        </nav>

        <div className="wl-main">
          <div className="wl-left">
            <div>
              <div className="wl-eyebrow">Launching 2026</div>
              <h1 className="wl-heading">Intelligence the independent<br />operator has <em>never had.</em></h1>
              <p className="wl-desc">Sens is a monthly intelligence publication for independent boutique hotels, premium retreats, and luxury lodges. Join the waitlist for early access and founding subscriber pricing.</p>
              <div className="wl-pillars">
                {[
                  ["I", "Commercial", "Revenue, pricing, and distribution signals your compset isn't reading."],
                  ["II", "Design", "What the best-performing properties are building and why it's working."],
                  ["III", "Consumer", "How the premium traveller is changing their mind, before your competitors notice."],
                  ["IV", "Forward", "Evidenced signals from adjacent fields, on an 18-month horizon."],
                ].map(([num, title, desc]) => (
                  <div className="wl-pillar" key={num}>
                    <span className="wl-pillar-num">{num}</span>
                    <span className="wl-pillar-text"><strong>{title}</strong> — {desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="wl-left-footer">No advertising. No sponsors. Entirely subscription-funded.</div>
          </div>

          <div className="wl-right">
            {status === "success" ? (
              <div className="wl-success">
                <div className="wl-success-mark">✦</div>
                <h3>You&apos;re on the list.</h3>
                <p>We&apos;ll be in touch with early access details<br />and your founding subscriber offer.</p>
              </div>
            ) : (
              <>
                <div className="wl-row">
                  <div className="wl-field">
                    <label className="wl-form-label" htmlFor="first_name">First name</label>
                    <input className="wl-input" type="text" id="first_name" placeholder="Gabrielle" value={form.first_name} onChange={handleChange} />
                  </div>
                  <div className="wl-field">
                    <label className="wl-form-label" htmlFor="email">Professional email</label>
                    <input className="wl-input" type="email" id="email" placeholder="you@property.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="wl-field">
                  <label className="wl-form-label" htmlFor="role">Your role</label>
                  <select className="wl-input" id="role" value={form.role} onChange={handleChange}>
                    <option value="" disabled>Select your role</option>
                    <option>Owner-Operator</option>
                    <option>Creative Director / Designer</option>
                    <option>Investor / Developer</option>
                    <option>General Manager</option>
                    <option>Executive / Director</option>
                  </select>
                </div>

                <div className="wl-field">
                  <label className="wl-form-label" htmlFor="priority">What&apos;s most important to your strategic decision-making right now?</label>
                  <select className="wl-input" id="priority" value={form.priority} onChange={handleChange}>
                    <option value="" disabled>Select your priority</option>
                    <option>Revenue &amp; pricing strategy</option>
                    <option>Guest experience &amp; design</option>
                    <option>Direct booking &amp; distribution</option>
                    <option>Investment &amp; capital allocation</option>
                    <option>Technology &amp; innovation</option>
                  </select>
                </div>

                <div className="wl-divider" />

                <button className="wl-submit" onClick={handleSubmit} disabled={status === "loading"}>
                  {status === "loading" ? "Submitting..." : "Join the waitlist →"}
                </button>

                {errorMsg && <div className="wl-error">{errorMsg}</div>}
                <div className="wl-disclaimer">Founding subscriber pricing locked at sign-up. No payment required now.</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
