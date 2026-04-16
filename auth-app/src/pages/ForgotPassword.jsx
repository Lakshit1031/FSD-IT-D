import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setLoading(true);
    setError("");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <div className="page-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="auth-wrapper">
        <div className="auth-card">
          {/* Brand */}
          <div className="brand">
            <div className="brand-icon">✦</div>
            <span className="brand-name">ABES</span>
          </div>

          {/* Back button */}
          <button className="back-btn" onClick={() => navigate("/login")}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Sign In
          </button>

          {!sent ? (
            <>
              {/* Lock icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(99,179,237,0.1)",
                border: "1px solid rgba(99,179,237,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, fontSize: 22
              }}>
                🔑
              </div>

              <h1 className="auth-title">Reset password</h1>
              <p className="auth-subtitle">
                Enter your email and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrap">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                  {error && <span className="field-error">{error}</span>}
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading && <span className="spinner" />}
                  {loading ? "Sending link…" : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: "rgba(104,211,145,0.12)",
                border: "1px solid rgba(104,211,145,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", fontSize: 28
              }}>
                ✉️
              </div>

              <h1 className="auth-title" style={{ fontSize: "1.6rem", marginBottom: 10 }}>
                Check your inbox
              </h1>
              <p className="auth-subtitle" style={{ marginBottom: 28 }}>
                We've sent a password reset link to{" "}
                <strong style={{ color: "var(--text)" }}>{email}</strong>.
                The link expires in 30 minutes.
              </p>

              <p style={{
                fontSize: "0.82rem",
                color: "var(--muted)",
                lineHeight: 1.6,
                marginBottom: 28
              }}>
                Didn't receive it? Check your spam folder, or{" "}
                <button
                  className="link-btn"
                  style={{ fontSize: "0.82rem" }}
                  onClick={() => setSent(false)}
                >
                  try again
                </button>
                .
              </p>

              <button
                className="btn-primary"
                onClick={() => navigate("/login")}
              >
                Return to Sign In
              </button>
            </div>
          )}

          {!sent && (
            <div className="auth-footer">
              Remember your password?
              <button className="link-btn" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
