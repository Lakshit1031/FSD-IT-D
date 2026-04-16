import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Unsubscribe() {
  const navigate = useNavigate();
  const [step, setStep] = useState("confirm"); // confirm | verify | done
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const reasons = [
    "I no longer need this service",
    "I found a better alternative",
    "Too expensive",
    "Privacy concerns",
    "Too many emails",
    "Other",
  ];

  const handleVerify = (e) => {
    e.preventDefault();
    if (!email.trim()) return setEmailError("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return setEmailError("Enter a valid email");
    if (!checked) return setEmailError("Please confirm you understand this action");
    setEmailError("");
    setStep("verify");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setStep("done");
  };

  return (
    <>
      <div className="page-bg">
        <div className="orb orb-1" style={{ background: "radial-gradient(circle,#fc8181,#c53030)", opacity: 0.12 }} />
        <div className="orb orb-2" />
        <div className="orb orb-3" style={{ background: "radial-gradient(circle,#f6ad55,#c05621)", opacity: 0.1 }} />
      </div>

      <div className="auth-wrapper">
        <div className="auth-card">
          {/* Brand */}
          <div className="brand">
            <div className="brand-icon">✦</div>
            <span className="brand-name">ABES</span>
          </div>

          {/* Back */}
          {step !== "done" && (
            <button className="back-btn" onClick={() => navigate("/login")}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Sign In
            </button>
          )}

          {/* ── STEP 1: Confirm ── */}
          {step === "confirm" && (
            <>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(252,129,129,0.1)",
                border: "1px solid rgba(252,129,129,0.28)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, fontSize: 24,
              }}>
                🗑️
              </div>

              <h1 className="auth-title" style={{ fontSize: "1.75rem" }}>Unsubscribe</h1>
              <p className="auth-subtitle">
                We're sorry to see you go. Deleting your account is permanent
                and cannot be undone.
              </p>

              {/* Warning box */}
              <div style={{
                background: "rgba(252,129,129,0.08)",
                border: "1px solid rgba(252,129,129,0.22)",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 22,
                fontSize: "0.85rem",
                color: "rgba(252,129,129,0.9)",
                lineHeight: 1.6,
              }}>
                <strong>⚠ This will permanently:</strong>
                <ul style={{ margin: "8px 0 0 18px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <li>Delete your account and all data</li>
                  <li>Cancel any active subscriptions</li>
                  <li>Remove access to all your content</li>
                </ul>
              </div>

              <form onSubmit={handleVerify} noValidate>
                {/* Reason */}
                <div className="form-group">
                  <label htmlFor="reason">Reason for leaving <span style={{ color: "var(--muted)", textTransform: "none", fontSize: "0.75rem" }}>(optional)</span></label>
                  <div style={{ position: "relative" }}>
                    <select
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        color: reason ? "var(--text)" : "rgba(240,244,255,0.25)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        outline: "none",
                        cursor: "pointer",
                        appearance: "none",
                        WebkitAppearance: "none",
                      }}
                    >
                      <option value="" disabled>Select a reason…</option>
                      {reasons.map((r) => (
                        <option key={r} value={r} style={{ background: "#0d0d1f", color: "#f0f4ff" }}>{r}</option>
                      ))}
                    </select>
                    <svg style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)" }}
                      width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Email confirm */}
                <div className="form-group">
                  <label htmlFor="del-email">Confirm your email</label>
                  <div className="input-wrap">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                      id="del-email"
                      type="email"
                      placeholder="Enter your account email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      autoComplete="email"
                    />
                  </div>
                  {emailError && <span className="field-error">{emailError}</span>}
                </div>

                {/* Checkbox */}
                <label style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  cursor: "pointer", marginBottom: 22, marginTop: 4,
                  fontSize: "0.84rem", color: "var(--muted)", lineHeight: 1.5,
                }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    style={{ marginTop: 2, accentColor: "#fc8181", cursor: "pointer", flexShrink: 0 }}
                  />
                  I understand that deleting my account is irreversible and all my data will be permanently erased.
                </label>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    background: "linear-gradient(135deg,#c53030,#9b2c2c)",
                    boxShadow: "0 4px 24px rgba(197,48,48,0.35)",
                  }}
                >
                  Continue to Delete
                </button>
              </form>

              <div className="auth-footer">
                Changed your mind?
                <button className="link-btn" onClick={() => navigate("/login")}>
                  Go back
                </button>
              </div>
            </>
          )}

          {/* ── STEP 2: Final Warning ── */}
          {step === "verify" && (
            <>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(252,129,129,0.12)",
                border: "1px solid rgba(252,129,129,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, fontSize: 24,
              }}>
                ⚠️
              </div>

              <h1 className="auth-title" style={{ fontSize: "1.6rem", color: "#fc8181" }}>
                Final confirmation
              </h1>
              <p className="auth-subtitle">
                You're about to permanently delete the account associated with{" "}
                <strong style={{ color: "var(--text)" }}>{email}</strong>.
                This cannot be reversed.
              </p>

              <div style={{
                background: "rgba(252,129,129,0.06)",
                border: "1px dashed rgba(252,129,129,0.3)",
                borderRadius: 12,
                padding: "16px",
                textAlign: "center",
                marginBottom: 26,
                fontSize: "0.85rem",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}>
                Once you click <strong style={{ color: "#fc8181" }}>Delete My Account</strong>,<br />
                your data will begin to be erased immediately.
              </div>

              <form onSubmit={handleDelete}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{
                    background: "linear-gradient(135deg,#c53030,#9b2c2c)",
                    boxShadow: "0 4px 24px rgba(197,48,48,0.4)",
                  }}
                >
                  {loading && <span className="spinner" />}
                  {loading ? "Deleting account…" : "🗑 Delete My Account"}
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: 14 }}>
                <button
                  className="link-btn"
                  style={{ fontSize: "0.88rem", color: "var(--muted)" }}
                  onClick={() => setStep("confirm")}
                >
                  ← Go back
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3: Done ── */}
          {step === "done" && (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: "rgba(240,244,255,0.06)",
                border: "1px solid rgba(240,244,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", fontSize: 28,
              }}>
                👋
              </div>

              <h1 className="auth-title" style={{ fontSize: "1.6rem", marginBottom: 10 }}>
                Account deleted
              </h1>
              <p className="auth-subtitle" style={{ marginBottom: 8 }}>
                Your account has been permanently deleted. We've sent a confirmation to{" "}
                <strong style={{ color: "var(--text)" }}>{email}</strong>.
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: 30, lineHeight: 1.6 }}>
                Thank you for being a part of ABES. We hope to see you again someday.
              </p>

              <button className="btn-primary" onClick={() => navigate("/register")}>
                Create a new account
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
