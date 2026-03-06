import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff, Key, Shield, Lock, HelpCircle, ArrowRight } from "lucide-react";

// ── Replace with your actual image import ──────────────────────────────────
import loginHero from "@/assets/about-whoweare.jpg";

const AgentPortalAuth = () => {
  const [agentCode, setAgentCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: agentCode,
      password,
    });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome, Agent." });
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }

        .agent-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f3f4f6;
        }

        /* ── LEFT PANEL ── */
        .left-panel {
          display: none;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .left-panel { display: flex; flex-direction: column; width: 45%; }
        }

        .left-bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.55);
        }

        /* top green accent bar */
        .top-accent-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #16a34a, #4ade80, #eab308);
          z-index: 20;
        }

        .left-content {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          height: 100%; padding: 0;
        }

        /* Logo area */
        .left-logo-bar {
          padding: 28px 36px;
          display: flex; align-items: center;
        }

        /* Center body */
        .left-body {
          flex: 1;
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 0 48px;
        }

        /* Verified badge */
        .verified-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(22, 163, 74, 0.25);
          border: 1px solid rgba(74, 222, 128, 0.5);
          border-radius: 999px;
          padding: 6px 14px;
          width: fit-content;
          margin-bottom: 18px;
          backdrop-filter: blur(8px);
        }
        .verified-badge span {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em;
          color: #4ade80;
          text-transform: uppercase;
        }

        .hero-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 14px;
        }

        .hero-sub {
          font-size: 14px; font-weight: 300;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          max-width: 400px;
          margin-bottom: 0;
        }

        /* Footer */
        .left-footer {
          position: relative; z-index: 10;
          padding: 20px 36px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; gap: 20px;
        }
        .left-footer a, .left-footer span {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .left-footer a:hover { color: rgba(255,255,255,0.9); }

        /* ── RIGHT PANEL ── */
        .right-panel {
          width: 100%;
          background: #f3f4f6;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        @media (min-width: 1024px) {
          .right-panel { width: 55%; }
        }

        /* top accent bar mirrors left */
        .right-top-bar {
          height: 4px;
          background: #e5e7eb;
        }

        .right-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }

        .form-card {
          width: 100%;
          max-width: 460px;
        }

        .form-heading {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .form-sub {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 32px;
          font-weight: 400;
          line-height: 1.5;
        }

        /* Field */
        .field-group { margin-bottom: 20px; }
        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          letter-spacing: 0.01em;
        }

        .input-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: color 0.2s;
          pointer-events: none;
        }
        .field-icon.focused { color: #16a34a; }

        .field-input {
          width: 100%;
          height: 52px;
          padding-left: 42px;
          padding-right: 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #0f172a;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .field-input::placeholder { color: #9ca3af; }
        .field-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.12);
          background: #f0fdf4;
        }
        .field-input.has-toggle { padding-right: 46px; }

        .toggle-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .toggle-btn:hover { color: #374151; }

        /* Secure Login Button */
        .login-btn {
          width: 100%;
          height: 54px;
          background: #16a34a;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
          margin-bottom: 24px;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 4px 16px rgba(22, 163, 74, 0.3);
        }
        .login-btn:hover:not(:disabled) {
          background: #15803d;
          box-shadow: 0 6px 24px rgba(22, 163, 74, 0.45);
          transform: translateY(-1px);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Trouble card */
        .trouble-card {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 28px;
        }

        .trouble-icon-wrap {
          width: 36px; height: 36px; flex-shrink: 0;
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #16a34a;
        }

        .trouble-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }

        .trouble-body {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 10px;
        }

        .trouble-link {
          font-size: 13px;
          font-weight: 600;
          color: #16a34a;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.2s;
        }
        .trouble-link:hover { gap: 8px; }

        /* Encrypted note */
        .encrypted-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 12px;
          color: #9ca3af;
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>

      <div className="agent-root">

        {/* ── LEFT PANEL ── */}
        <div className="left-panel">
          <div className="top-accent-bar" />

          {/* Background image */}
          <img
            src={loginHero}
            alt="Polling station"
            className="left-bg-img"
          />

          <div className="left-content">
            {/* Logo */}
            <div className="left-logo-bar">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src="/brand-logo.png" alt="The Plateau Consensus" className="h-10 w-auto" />
              </motion.div>
            </div>

            {/* Main copy */}
            <div className="left-body">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Verified badge */}
                <div className="verified-badge">
                  <Shield size={12} color="#4ade80" />
                  <span>Verified Agent Access</span>
                </div>

                <h1 className="hero-heading">
                  Guardians of<br />Democracy
                </h1>

                <p className="hero-sub">
                  Your vigilance ensures our future. Log in to access real-time
                  collation tools and submit your unit reports securely.
                </p>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="left-footer">
              <span>© 2026 The Consensus</span>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="right-panel">
          <div className="right-top-bar" />

          <div className="right-body">
            <motion.div
              className="form-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <h2 className="form-heading">Agent Portal</h2>
              <p className="form-sub">Welcome Back, Agent. Please enter your secure credentials.</p>

              <form onSubmit={handleLogin}>

                {/* Agent Code */}
                <div className="field-group">
                  <label className="field-label">Agent Code</label>
                  <div className="input-wrap">
                    <Lock
                      size={16}
                      className={`field-icon${focused === "code" ? " focused" : ""}`}
                    />
                    <input
                      type="text"
                      className="field-input"
                      placeholder="Enter your unique ID (e.g., AG-2024)"
                      value={agentCode}
                      onChange={e => setAgentCode(e.target.value)}
                      onFocus={() => setFocused("code")}
                      onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="field-group">
                  <label className="field-label">Password</label>
                  <div className="input-wrap">
                    <Lock
                      size={16}
                      className={`field-icon${focused === "password" ? " focused" : ""}`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="field-input has-toggle"
                      placeholder="Enter your secure password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="login-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Signing In…
                    </>
                  ) : (
                    <>
                      <Key size={16} />
                      Secure Login
                    </>
                  )}
                </button>
              </form>

              {/* Trouble card */}
              <div className="trouble-card">
                <div className="trouble-icon-wrap">
                  <HelpCircle size={18} />
                </div>
                <div>
                  <p className="trouble-title">Trouble logging in?</p>
                  <p className="trouble-body">
                    If you have lost your code, contact your district supervisor.
                  </p>
                  <a href="#" className="trouble-link">
                    Forgot Code? <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              {/* Encrypted note */}
              <div className="encrypted-note">
                <Lock size={12} />
                End-to-end encrypted connection
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AgentPortalAuth;