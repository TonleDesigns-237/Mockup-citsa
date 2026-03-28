import { useState } from "react";
import { useLocation } from "wouter";

const LOGO_URL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.ODMCvcTUVyAw3QBTleG-VQHaHa%3Fpid%3DApi&f=1&ipt=ef223cb168fa44f2a8b1a3238b9c6aabbbda867f0f064343656274eafea7528a&ipo=images";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [role, setRole] = useState<"student" | "staff">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLocation("/dashboard");
    }, 1200);
  };

  return (
    <div className="login-page">
      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="login-left-content">
          <h2 className="login-left-title">
            Sacred Knowledge<br />Awaits Your Return
          </h2>
          <p className="login-left-text">
            Access your lessons, track your progress, connect with your teachers,
            and continue your initiatic journey from anywhere in the world.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-logo">
          <img
            src={LOGO_URL}
            alt="CITSA Logo"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/50x50/dc2626/white?text=C"; }}
          />
          <div>
            <div className="login-logo-text">CITSA International</div>
            <div style={{ fontSize: "0.6rem", color: "#dc2626", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Cinzel, serif" }}>Student & Staff Portal</div>
          </div>
        </div>

        <h1 className="login-title">Sign In</h1>
        <p className="login-subtitle">Welcome back, seeker of wisdom.</p>

        <div className="login-roles" style={{ marginBottom: "1.5rem" }}>
          <button
            type="button"
            className={`role-btn ${role === "student" ? "selected" : ""}`}
            onClick={() => setRole("student")}
          >
            🎓 Student
          </button>
          <button
            type="button"
            className={`role-btn ${role === "staff" ? "selected" : ""}`}
            onClick={() => setRole("staff")}
          >
            👁 Staff / Elder
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email Address</label>
            <input
              className="login-input"
              type="email"
              placeholder={role === "student" ? "student@example.com" : "elder@citsa.org"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.7rem", color: "#dc2626", cursor: "pointer", letterSpacing: "0.08em" }}>
              Forgot Password?
            </span>
          </div>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Authenticating..." : `Enter as ${role === "student" ? "Student" : "Staff"}`}
          </button>
        </form>

        <div className="login-divider" style={{ marginTop: "1.5rem" }}>OR</div>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
            Don't have an account?{" "}
            <span style={{ color: "#dc2626", cursor: "pointer" }}>Apply for Enrollment</span>
          </p>
        </div>

        <a className="login-back" onClick={() => setLocation("/")}>
          ← Return to Main Website
        </a>
      </div>
    </div>
  );
}
