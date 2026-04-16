import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const strengthMeta = [
  { label: "Weak",      color: "#fc8181" },
  { label: "Fair",      color: "#f6ad55" },
  { label: "Good",      color: "#68d391" },
  { label: "Strong",    color: "#4fd1c5" },
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: ""
  });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const strength = getStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm((p) => ({ ...p, [field]: ev.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    setAlert(null);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setAlert({ type: "success", msg: "Account created! You can now sign in." });
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
          <div className="brand">
            <div className="brand-icon">✦</div>
            <span className="brand-name">ABES</span>
          </div>

          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join us today — it's completely free</p>

          {alert && (
            <div className={`alert alert-${alert.type}`}>
              <span>{alert.type === "success" ? "✓" : "!"}</span>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name row */}
            <div className="name-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-wrap">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    autoComplete="given-name"
                  />
                </div>
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-wrap">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    autoComplete="family-name"
                  />
                </div>
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrap">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange("password")}
                  autoComplete="new-password"
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowPwd(v => !v)}>
                  <EyeIcon open={showPwd} />
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
              {/* Strength meter */}
              {form.password && (
                <>
                  <div className="strength-bar">
                    {[0,1,2,3].map(i => (
                      <div
                        key={i}
                        className="strength-segment"
                        style={{ background: i < strength ? strengthMeta[strength - 1].color : undefined }}
                      />
                    ))}
                  </div>
                  <span className="strength-label">
                    Strength: <span style={{ color: strengthMeta[Math.max(strength-1,0)].color }}>
                      {strengthMeta[Math.max(strength-1,0)].label}
                    </span>
                  </span>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <div className="input-wrap">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={form.confirm}
                  onChange={handleChange("confirm")}
                  autoComplete="new-password"
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowConfirm(v => !v)}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 10 }}>
              {loading && <span className="spinner" />}
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?
            <button className="link-btn" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
