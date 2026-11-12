
import { useState } from "react";
import {
  ShoppingCart,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  Building2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mode === "forgot") {
      setError("Password recovery will be enabled with backend integration.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (mode === "signup" && (!name.trim() || !company.trim())) {
      setError("Please enter your name and company.");
      return;
    }

    // Frontend demo authentication only.
    onLogin();
  }

  return (
    <div className="auth-page">
      <div className="auth-decoration auth-decoration-one" />
      <div className="auth-decoration auth-decoration-two" />

      <aside className="auth-showcase">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <ShoppingCart size={23} />
          </div>
          <div>
            <h2>Procura<span>Pay</span></h2>
            <small>INTELLIGENCE PLATFORM</small>
          </div>
        </div>

        <div className="auth-hero">
          <div className="auth-tag">
            <Sparkles size={14} />
            INTELLIGENCE MEETS PROCUREMENT
          </div>

          <h1>
            Smarter decisions.
            <br />
            <span>Better procurement.</span>
          </h1>

          <p>
            Bring AI-powered intelligence, supplier insights
            and strategic purchasing into one powerful workspace.
          </p>

          <div className="auth-feature">
            <div><ShieldCheck size={19} /></div>
            <section>
              <strong>Intelligent procurement</strong>
              <small>Make every purchasing decision count.</small>
            </section>
          </div>

          <div className="auth-feature">
            <div><Sparkles size={19} /></div>
            <section>
              <strong>AI-powered insights</strong>
              <small>Discover opportunities beyond traditional buying.</small>
            </section>
          </div>
        </div>

        <div className="auth-bottom-note">
          © 2026 ProcuraPay AI · Intelligent purchasing ecosystem
        </div>
      </aside>

      <main className="auth-form-area">
        <div className="auth-form-card">
          <div className="auth-mobile-brand">
            <ShoppingCart size={23} />
            <strong>Procura<span>Pay</span></strong>
          </div>

          <div className="auth-form-heading">
            <span className="eyebrow">
              <Sparkles size={13} /> WELCOME TO PROCURAPAY
            </span>

            <h2>
              {mode === "login"
                ? "Welcome back"
                : mode === "signup"
                ? "Create your account"
                : "Reset your password"}
            </h2>

            <p>
              {mode === "login"
                ? "Sign in to access your procurement workspace."
                : mode === "signup"
                ? "Start building a smarter procurement workflow."
                : "Enter your email to begin password recovery."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <label>Full name</label>
                <div className="auth-input">
                  <User size={17} />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <label>Company name</label>
                <div className="auth-input">
                  <Building2 size={17} />
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your organisation"
                    required
                  />
                </div>
              </>
            )}

            <label>Email address</label>
            <div className="auth-input">
              <Mail size={17} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>

            {mode !== "forgot" && (
              <>
                <label>Password</label>
                <div className="auth-input">
                  <LockKeyhole size={17} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </>
            )}

            {mode === "login" && (
              <div className="auth-options">
                <label className="remember-option">
                  <input type="checkbox" />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setError("");
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-submit" type="submit">
              {mode === "login"
                ? "Sign in to workspace"
                : mode === "signup"
                ? "Create account"
                : "Continue"}
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="auth-switch">
            {mode === "login" ? (
              <>
                Don't have an account?
                <button onClick={() => { setMode("signup"); setError(""); }}>
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button onClick={() => { setMode("login"); setError(""); }}>
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="auth-security">
            <ShieldCheck size={15} />
            Your procurement workspace starts here.
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
