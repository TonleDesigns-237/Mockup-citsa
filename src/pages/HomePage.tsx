import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const LOGO_URL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.ODMCvcTUVyAw3QBTleG-VQHaHa%3Fpid%3DApi&f=1&ipt=ef223cb168fa44f2a8b1a3238b9c6aabbbda867f0f064343656274eafea7528a&ipo=images";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroBg = document.querySelector(".hero-bg") as HTMLElement;
    if (heroBg) setTimeout(() => heroBg.classList.add("loaded"), 100);

    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.scrollY > 60) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal-hidden").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const particles = Array.from({ length: 16 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${6 + Math.random() * 8}s`,
    delay: `${Math.random() * 6}s`,
    size: `${2 + Math.random() * 3}px`,
  }));

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar" ref={navRef}>
        <a className="nav-logo" href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
          <img src={LOGO_URL} alt="CITSA Logo" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/52x52/dc2626/white?text=C"; }} />
          <div>
            <div className="nav-logo-text">CITSA</div>
            <div className="nav-logo-sub">International</div>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>Home</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
          <li>
            <button className="nav-login-btn" onClick={() => setLocation("/login")}>
              Student Portal
            </button>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-particles">
          {particles.map((p, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badge">Est. 2010 · Sacred Knowledge · Ancient Wisdom</div>
          <h1 className="hero-title">
            Centre Initiatique et
            <span className="hero-title-accent">Traditionnel pour les</span>
            Sciences Africaines
          </h1>
          <p className="hero-subtitle">
            A sacred space dedicated to the preservation and transmission of African ancestral knowledge,
            initiatic sciences, and spiritual traditions from the continent and its diaspora.
          </p>
          <div className="hero-divider" />
          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => scrollTo("about")}>
              Discover Our Path
            </button>
            <button className="btn-outline" onClick={() => setLocation("/login")}>
              Access Portal
            </button>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <div className="about-image-wrap reveal-hidden">
            <div className="about-image-border" />
            <img
              src="https://images.unsplash.com/photo-1521944736572-9c6aabc9b6a6?w=800&q=80"
              alt="African spiritual elder"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1569360781853-32b75a362551?w=800&q=80"; }}
            />
            <div className="about-stat-badge">
              <span className="about-stat-number">14+</span>
              <span className="about-stat-label">Years of Teaching</span>
            </div>
          </div>
          <div className="reveal-hidden" style={{ animationDelay: "0.2s" }}>
            <span className="about-tag">✦ Our Mission</span>
            <h2 className="about-title">
              Guardians of the Ancient Wisdom of Africa
            </h2>
            <p className="about-text">
              CITSA International is a premier initiatic center dedicated to transmitting the sacred knowledge
              of African traditions — from Yoruba and Akan systems to Kongo cosmology and Kemetic sciences.
              We serve both Africans on the continent and the global diaspora.
            </p>
            <p className="about-text">
              Under the guidance of <strong>Rabbi Ouri Yehoudah</strong>, our masters and elders provide authentic
              initiatic teachings, ritual sciences, and ancestral healing practices passed down through
              unbroken lineages for thousands of years.
            </p>
            <div className="about-pillars">
              {[
                { icon: "🔥", text: "Initiatic Sciences" },
                { icon: "🌿", text: "Plant Medicine & Herbalism" },
                { icon: "⭐", text: "Astrology & Divination" },
                { icon: "🥁", text: "Sacred Drumming & Rituals" },
                { icon: "📿", text: "Ancestral Veneration" },
                { icon: "🌍", text: "African Cosmology" },
              ].map((p) => (
                <div key={p.text} className="about-pillar">
                  <span className="about-pillar-icon">{p.icon}</span>
                  <span className="about-pillar-text">{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION BANNER */}
      <section className="mission-section">
        <blockquote className="mission-quote">
          "The roots of education are bitter, but the fruit is sweet.
          To know the ancestors is to know thyself — and to know thyself is to know the Universe."
        </blockquote>
        <span className="mission-author">— Rabbi Ouri Yehoudah, Founder of CITSA International</span>
      </section>

      {/* TEACHINGS */}
      <section className="courses-section">
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", marginBottom: "3rem" }}>
          <p className="about-tag reveal-hidden">✦ Our Teachings</p>
          <h2 className="section-title reveal-hidden">Sacred Disciplines & Initiatic Paths</h2>
          <div className="section-divider" />
          <p className="section-subtitle reveal-hidden">
            Our curriculum spans the full spectrum of African spiritual and initiatic sciences,
            taught by authentic lineage holders and initiated masters.
          </p>
        </div>
        <div className="courses-grid">
          {[
            {
              image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=600&q=80",
              badge: "Foundation",
              title: "Introduction to African Cosmology",
              desc: "Explore the foundational worldviews of Yoruba, Akan, Kemetic, and Bantu traditions.",
              level: "Initiate",
              students: "234 Students",
            },
            {
              image: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?w=600&q=80",
              badge: "Divination",
              title: "Ifá Oracle & Sacred Divination",
              desc: "The sacred system of Ifá divination — learning to read the Odù and communicate with Orisa.",
              level: "Advanced",
              students: "89 Students",
            },
            {
              image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
              badge: "Healing",
              title: "African Herbalism & Plant Medicine",
              desc: "Ancient healing practices using sacred plants, roots, and remedies from the continent.",
              level: "Initiate",
              students: "156 Students",
            },
            {
              image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=80",
              badge: "Ritual",
              title: "Sacred Ritual Sciences",
              desc: "The art and science of ritual preparation, ceremony, and spiritual protocols.",
              level: "Advanced",
              students: "67 Students",
            },
            {
              image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
              badge: "Kemetic",
              title: "Kemetic Sciences & Ancient Egypt",
              desc: "Decode the mysteries of ancient Kemet — hieroglyphs, Ma'at, and spiritual architecture.",
              level: "Master",
              students: "45 Students",
            },
            {
              image: "https://images.unsplash.com/photo-1580835845891-d41d521cda86?w=600&q=80",
              badge: "Ancestral",
              title: "Ancestor Veneration & Communication",
              desc: "Reconnect with your lineage, learn ancestral altar setup, and spirit communication.",
              level: "Initiate",
              students: "178 Students",
            },
          ].map((c, i) => (
            <div key={i} className="course-card reveal-hidden">
              <div className="course-card-image">
                <img src={c.image} alt={c.title} onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x220/111/dc2626?text=${encodeURIComponent(c.badge)}`; }} />
              </div>
              <span className="course-card-badge">{c.badge}</span>
              <div className="course-card-body">
                <h3 className="course-card-title">{c.title}</h3>
                <p className="course-card-desc">{c.desc}</p>
                <div className="course-card-meta">
                  <span className="course-card-level">{c.level}</span>
                  <span className="course-card-students">{c.students}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEACHERS */}
      <section className="teachers-section">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="about-tag reveal-hidden">✦ Our Masters</span>
          <h2 className="section-title reveal-hidden">Initiated Teachers & Elders</h2>
          <div className="section-divider" />
        </div>
        <div className="teachers-grid">
          {[
            {
              img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80",
              name: "Rabbi Ouri Yehoudah",
              role: "Founder & Grand Master",
            },
            {
              img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&q=80",
              name: "Mama Akosua Asante",
              role: "Akan Traditions Elder",
            },
            {
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
              name: "Babalawo Femi Adeyemi",
              role: "Ifá Oracle Master",
            },
            {
              img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
              name: "Sis. Nkechi Okafor",
              role: "Kemetic Science Teacher",
            },
          ].map((t, i) => (
            <div key={i} className="teacher-card reveal-hidden">
              <div className="teacher-image-wrap">
                <img src={t.img} alt={t.name} onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/280x280/1a1a1a/dc2626?text=${encodeURIComponent(t.name[0])}`; }} />
                <div className="teacher-overlay" />
              </div>
              <div className="teacher-name">{t.name}</div>
              <div className="teacher-role">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="about-tag" style={{ color: "#fca5a5" }}>✦ Testimonials</span>
          <h2 className="section-title section-title-white reveal-hidden">What Our Students Say</h2>
          <div className="section-divider" />
        </div>
        <div className="testimonials-grid">
          {[
            {
              text: "CITSA changed my life entirely. I came seeking knowledge and found my true self — my ancestors, my purpose, my spiritual home. The teachings are authentic and life-transforming.",
              name: "Kwame Mensah",
              role: "Initiated Student, Ghana",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
            },
            {
              text: "As a member of the diaspora, I had lost connection to my roots. Through CITSA's curriculum, I've reconnected with my lineage, learned Ifá divination, and found deep spiritual grounding.",
              name: "Adaeze Okonkwo",
              role: "Advanced Student, USA",
              img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
            },
            {
              text: "Rabbi Ouri Yehoudah is a true master. His depth of knowledge and compassionate teaching style makes even the most complex initiatic sciences accessible and profound.",
              name: "Olumide Afolabi",
              role: "Initiate, Nigeria",
              img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&q=80",
            },
          ].map((t, i) => (
            <div key={i} className="testimonial-card reveal-hidden">
              <span className="testimonial-quote-mark">"</span>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <img src={t.img} alt={t.name} className="testimonial-avatar" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x48/dc2626/white?text=${t.name[0]}`; }} />
                <div>
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL / MEDIA */}
      <section className="social-section">
        <div className="social-content">
          <span className="about-tag" style={{ color: "#fca5a5" }}>✦ Follow Our Journey</span>
          <h2 className="section-title section-title-white" style={{ marginTop: "0.5rem" }}>Stay Connected</h2>
          <div className="section-divider" />
          <p className="section-subtitle section-subtitle-white">
            Follow CITSA International on social media for daily wisdom, spiritual teachings,
            ceremonial highlights, and community events.
          </p>
          <div className="social-links">
            <a
              href="https://www.youtube.com/@CITSA_INTERNATIONAL/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn-yt"
            >
              <span>▶</span>
              YouTube Channel
            </a>
            <a
              href="https://www.tiktok.com/@rabbi_ouri_yehoudah"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn-tt"
            >
              <span>♪</span>
              TikTok — Rabbi Ouri
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="about-tag">✦ Contact Us</span>
          <h2 className="section-title reveal-hidden">Begin Your Sacred Journey</h2>
          <div className="section-divider" />
          <p className="section-subtitle reveal-hidden">
            Reach out to us for enrollment information, spiritual consultations, or any questions
            about our programs. We welcome sincere seekers from all walks of life.
          </p>
        </div>
        <div className="contact-grid">
          <div className="reveal-hidden">
            <h3 className="contact-info-title">Get in Touch</h3>
            <p className="contact-info-text">
              Whether you're taking your first steps on the sacred path or seeking advanced initiatic
              training, our team of elders and teachers is here to guide you.
            </p>
            {[
              { icon: "📍", label: "Headquarters", value: "Abidjan, Côte d'Ivoire / International Online Platform" },
              { icon: "📧", label: "Email", value: "contact@citsa-international.org" },
              { icon: "📞", label: "Phone", value: "+225 XX XX XX XX" },
              { icon: "🕐", label: "Office Hours", value: "Mon – Sat: 9:00 AM – 6:00 PM (WAT)" },
            ].map((item) => (
              <div key={item.label} className="contact-item">
                <div className="contact-item-icon">{item.icon}</div>
                <div>
                  <span className="contact-item-label">{item.label}</span>
                  <span className="contact-item-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal-hidden">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">CITSA INTERNATIONAL</div>
        <div className="footer-tagline">
          Centre Initiatique et Traditionnel pour les Sciences Africaines
        </div>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginBottom: "1rem" }}>
          <a href="https://www.youtube.com/@CITSA_INTERNATIONAL/featured" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontFamily: "Cinzel, serif", fontSize: "0.7rem", letterSpacing: "0.1em" }}>YouTube</a>
          <a href="https://www.tiktok.com/@rabbi_ouri_yehoudah" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontFamily: "Cinzel, serif", fontSize: "0.7rem", letterSpacing: "0.1em" }}>TikTok</a>
        </div>
        <div className="footer-divider" />
        <div className="footer-copy">
          © {new Date().getFullYear()} CITSA International · All Rights Reserved · Sacred Knowledge, Preserved
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your message has been sent. We will contact you within 48 hours. Asé!");
  };
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">First Name</label>
          <input className="form-input" type="text" placeholder="Kwame" required />
        </div>
        <div className="form-field">
          <label className="form-label">Last Name</label>
          <input className="form-input" type="text" placeholder="Mensah" required />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" placeholder="you@example.com" required />
      </div>
      <div className="form-field">
        <label className="form-label">Subject</label>
        <select className="form-input" defaultValue="">
          <option value="" disabled>Select a topic</option>
          <option>Enrollment Inquiry</option>
          <option>Spiritual Consultation</option>
          <option>Course Information</option>
          <option>Partnership & Collaboration</option>
          <option>General Question</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-label">Message</label>
        <textarea className="form-textarea" placeholder="Share your intention and what brings you to CITSA..." required />
      </div>
      <button type="submit" className="form-submit">Send Message</button>
    </form>
  );
}
