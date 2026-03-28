import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Cinzel, serif",
      color: "#fff",
      textAlign: "center",
      padding: "2rem",
    }}>
      <div style={{ fontSize: "5rem", marginBottom: "1rem", color: "#dc2626" }}>404</div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>
        Page Not Found
      </h1>
      <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
        The path you seek does not exist on this sacred journey.
      </p>
      <button
        onClick={() => setLocation("/")}
        style={{
          background: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "0.85rem 2rem",
          fontFamily: "Cinzel, serif",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer",
          borderRadius: "2px",
        }}
      >
        Return Home
      </button>
    </div>
  );
}
