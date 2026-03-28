import { useState } from "react";
import { useLocation } from "wouter";

const LOGO_URL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.ODMCvcTUVyAw3QBTleG-VQHaHa%3Fpid%3DApi&f=1&ipt=ef223cb168fa44f2a8b1a3238b9c6aabbbda867f0f064343656274eafea7528a&ipo=images";

type TabKey = "overview" | "lessons" | "schedule" | "students" | "messages" | "settings";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [isAdmin, setIsAdmin] = useState(false);

  const sidebarItems: { key: TabKey; icon: string; label: string }[] = [
    { key: "overview", icon: "⬡", label: "Overview" },
    { key: "lessons", icon: "📚", label: "My Lessons" },
    { key: "schedule", icon: "📅", label: "Schedule" },
    { key: "messages", icon: "✉", label: "Messages" },
    ...(isAdmin
      ? [
          { key: "students" as TabKey, icon: "👥", label: "Students" },
          { key: "settings" as TabKey, icon: "⚙", label: "Manage School" },
        ]
      : [{ key: "settings" as TabKey, icon: "👤", label: "My Profile" }]),
  ];

  return (
    <div className="dashboard-page">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <img
            src={LOGO_URL}
            alt="CITSA Logo"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/44x44/dc2626/white?text=C"; }}
          />
          <div>
            <div className="sidebar-brand-text">CITSA</div>
            <div className="sidebar-brand-sub">Sacred Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              className={`sidebar-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div className="sidebar-section-label" style={{ marginTop: "1.5rem" }}>Access Mode</div>
          <button
            className={`sidebar-item ${!isAdmin ? "active" : ""}`}
            onClick={() => setIsAdmin(false)}
          >
            <span className="sidebar-item-icon">🎓</span>
            Student View
          </button>
          <button
            className={`sidebar-item ${isAdmin ? "active" : ""}`}
            onClick={() => setIsAdmin(true)}
          >
            <span className="sidebar-item-icon">👁</span>
            Staff View
          </button>
        </nav>

        <div className="sidebar-back">
          <a onClick={() => setLocation("/")} style={{ cursor: "pointer" }}>
            ← Back to Website
          </a>
        </div>
      </aside>

      {/* MAIN */}
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-title">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "lessons" && "My Lessons"}
            {activeTab === "schedule" && "Class Schedule"}
            {activeTab === "students" && "Student Management"}
            {activeTab === "messages" && "Messages"}
            {activeTab === "settings" && (isAdmin ? "School Management" : "My Profile")}
          </div>
          <div className="dashboard-topbar-user">
            <span className="topbar-badge">{isAdmin ? "Staff" : "Student"}</span>
            <div style={{ textAlign: "right" }}>
              <div className="topbar-user-name">{isAdmin ? "Rabbi Ouri Yehoudah" : "Kwame Mensah"}</div>
              <div className="topbar-user-role">{isAdmin ? "Grand Master · Administrator" : "Level II Initiate · Module 3"}</div>
            </div>
            <img
              src={isAdmin
                ? "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&q=80"
                : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
              }
              alt="User"
              className="topbar-avatar"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/36x36/dc2626/white?text=K"; }}
            />
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === "overview" && <OverviewTab isAdmin={isAdmin} />}
          {activeTab === "lessons" && <LessonsTab />}
          {activeTab === "schedule" && <ScheduleTab />}
          {activeTab === "students" && isAdmin && <StudentsTab />}
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "settings" && (isAdmin ? <AdminSettingsTab /> : <ProfileTab />)}
        </div>
      </div>
    </div>
  );
}

/* ========================= OVERVIEW ========================= */
function OverviewTab({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div>
      <div className="notification-banner">
        <span className="notification-icon">🔔</span>
        {isAdmin
          ? "3 new enrollment applications require your review. Next ceremony: Saturday, April 5th."
          : "Your next live session with Babalawo Femi starts in 2 days. Module 3 – Ifá Divination Basics."}
      </div>

      {/* STATS */}
      {(() => {
        const stats = isAdmin
          ? [
              { number: "312", label: "Total Students", icon: "👥", trend: "+12 this month" },
              { number: "18", label: "Active Courses", icon: "📚", trend: "+2 this week" },
              { number: "7", label: "Masters & Elders", icon: "⭐", trend: "Full faculty" },
              { number: "94%", label: "Completion Rate", icon: "📈", trend: "↑ 4% vs last term" },
            ]
          : [
              { number: "3", label: "Active Modules", icon: "📚", trend: "Module 3 in progress" },
              { number: "67%", label: "Overall Progress", icon: "📈", trend: "+8% this week" },
              { number: "12", label: "Lessons Completed", icon: "✅", trend: "4 remaining" },
              { number: "2", label: "Upcoming Sessions", icon: "📅", trend: "This week" },
            ];
        return (
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
                <span className="stat-trend">{s.trend}</span>
                <div className="stat-icon">{s.icon}</div>
              </div>
            ))}
          </div>
        );
      })()}

      {/* RECENT LESSONS */}
      <div className="dashboard-section-title">Recent Lessons</div>
      <div className="lessons-grid">
        {lessons.slice(0, 3).map((l, i) => (
          <LessonCard key={i} lesson={l} />
        ))}
      </div>

      {/* SCHEDULE PREVIEW */}
      <div className="dashboard-section-title">Upcoming Schedule</div>
      <div className="schedule-card">
        <div className="schedule-header">
          <span className="schedule-header-title">This Week</span>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.7rem", color: "#dc2626", cursor: "pointer" }}>View Full Schedule →</span>
        </div>
        {scheduleItems.slice(0, 4).map((s, i) => (
          <div key={i} className="schedule-row">
            <span className="schedule-time">{s.time}</span>
            <div className="schedule-dot" />
            <span className="schedule-name">{s.name}</span>
            <span className="schedule-teacher">{s.teacher}</span>
            <span className="schedule-tag">{s.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= LESSONS ========================= */
function LessonsTab() {
  const [tab, setTab] = useState("all");
  const tabs = ["all", "initiate", "advanced", "master"];
  const filtered = tab === "all" ? lessons : lessons.filter((l) => l.level.toLowerCase() === tab);

  return (
    <div>
      <div className="tab-bar">
        {tabs.map((t) => (
          <div key={t} className={`tab-item ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </div>
        ))}
      </div>
      <div className="lessons-grid">
        {filtered.map((l, i) => (
          <LessonCard key={i} lesson={l} />
        ))}
      </div>
    </div>
  );
}

function LessonCard({ lesson }: { lesson: typeof lessons[0] }) {
  const levelClass = lesson.level === "Initiate" ? "level-initiate" : lesson.level === "Advanced" ? "level-advanced" : "level-master";
  return (
    <div className="lesson-card">
      <div className="lesson-card-thumb">
        <img
          src={lesson.image}
          alt={lesson.title}
          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x160/1a1a1a/dc2626?text=${encodeURIComponent(lesson.module)}`; }}
        />
        <div className="lesson-play-btn">
          <div className="play-circle">▶</div>
        </div>
      </div>
      <div className="lesson-card-body">
        <div className="lesson-card-module">{lesson.module}</div>
        <h3 className="lesson-card-title">{lesson.title}</h3>
        <p className="lesson-card-desc">{lesson.desc}</p>
        <div className="lesson-card-meta">
          <span className="lesson-duration">⏱ {lesson.duration}</span>
          <span className={`lesson-level-tag ${levelClass}`}>{lesson.level}</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${lesson.progress}%` }} />
        </div>
        <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", display: "block", marginTop: "0.3rem" }}>
          {lesson.progress}% complete
        </span>
      </div>
    </div>
  );
}

/* ========================= SCHEDULE ========================= */
function ScheduleTab() {
  return (
    <div>
      <div className="schedule-card">
        <div className="schedule-header">
          <span className="schedule-header-title">Weekly Schedule — April 2026</span>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>WAT (West Africa Time)</span>
        </div>
        {scheduleItems.map((s, i) => (
          <div key={i} className="schedule-row">
            <span className="schedule-time">{s.time}</span>
            <div className="schedule-dot" />
            <div style={{ flex: 1 }}>
              <div className="schedule-name">{s.name}</div>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", marginTop: "0.2rem" }}>{s.day}</div>
            </div>
            <span className="schedule-teacher">{s.teacher}</span>
            <span className="schedule-tag">{s.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= STUDENTS (ADMIN) ========================= */
function StudentsTab() {
  return (
    <div>
      <div className="admin-actions-grid">
        {[
          { icon: "➕", text: "Enroll Student", sub: "Add a new initiate" },
          { icon: "📄", text: "Export Records", sub: "Download CSV/PDF" },
          { icon: "📧", text: "Send Announcement", sub: "Notify all students" },
        ].map((a, i) => (
          <button key={i} className="admin-action-btn" onClick={() => alert(`${a.text} - feature coming soon`)}>
            <div className="admin-action-icon">{a.icon}</div>
            <div>
              <div className="admin-action-text">{a.text}</div>
              <div className="admin-action-sub">{a.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="dashboard-section-title">All Students</div>
      <div className="students-table">
        <div className="students-table-header">
          <div className="students-table-header-cell">Student</div>
          <div className="students-table-header-cell">Level</div>
          <div className="students-table-header-cell">Progress</div>
          <div className="students-table-header-cell">Joined</div>
          <div className="students-table-header-cell">Status</div>
        </div>
        {studentData.map((s, i) => (
          <div key={i} className="students-table-row">
            <div className="students-table-cell student-name-cell">
              <img
                src={s.avatar}
                alt={s.name}
                className="student-avatar"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/32x32/dc2626/white?text=${s.name[0]}`; }}
              />
              <div>
                <div className="student-name">{s.name}</div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.3)" }}>{s.email}</div>
              </div>
            </div>
            <div className="students-table-cell">{s.level}</div>
            <div className="students-table-cell">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div className="progress-bar-bg" style={{ flex: 1, minWidth: "60px" }}>
                  <div className="progress-bar-fill" style={{ width: `${s.progress}%` }} />
                </div>
                <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{s.progress}%</span>
              </div>
            </div>
            <div className="students-table-cell">{s.joined}</div>
            <div className="students-table-cell">
              <span className={s.active ? "status-active" : "status-inactive"}>
                <span className="status-dot" />
                {s.active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= MESSAGES ========================= */
function MessagesTab() {
  return (
    <div>
      <div className="schedule-card">
        <div className="schedule-header">
          <span className="schedule-header-title">Inbox</span>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.7rem", color: "#dc2626" }}>3 Unread</span>
        </div>
        {messages.map((m, i) => (
          <div key={i} className="schedule-row" style={{ cursor: "pointer" }}>
            <img
              src={m.avatar}
              style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(220,38,38,0.3)", flexShrink: 0 }}
              alt={m.from}
              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/36x36/dc2626/white?text=${m.from[0]}`; }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: "0.78rem", color: "#fff", marginBottom: "0.2rem" }}>{m.from}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.5)" }}>{m.subject}</div>
            </div>
            <div>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>{m.time}</div>
              {m.unread && (
                <div style={{ width: 8, height: 8, background: "#dc2626", borderRadius: "50%", marginTop: 4, marginLeft: "auto" }} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= ADMIN SETTINGS ========================= */
function AdminSettingsTab() {
  return (
    <div>
      <div className="admin-actions-grid">
        {[
          { icon: "📚", text: "Add New Course", sub: "Create a lesson module" },
          { icon: "👤", text: "Add Teacher/Elder", sub: "Register faculty member" },
          { icon: "🔔", text: "Send Newsletter", sub: "Communicate to all" },
          { icon: "🎓", text: "Issue Certificate", sub: "Honor a graduating initiate" },
          { icon: "📊", text: "View Analytics", sub: "Track school performance" },
          { icon: "⚙", text: "School Settings", sub: "Manage configurations" },
        ].map((a, i) => (
          <button key={i} className="admin-action-btn" onClick={() => alert(`${a.text} – feature coming soon`)}>
            <div className="admin-action-icon">{a.icon}</div>
            <div>
              <div className="admin-action-text">{a.text}</div>
              <div className="admin-action-sub">{a.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="dashboard-section-title">School Configuration</div>
      <div className="schedule-card">
        <div className="schedule-header">
          <span className="schedule-header-title">General Settings</span>
        </div>
        {[
          { label: "School Name", value: "CITSA International" },
          { label: "Academic Year", value: "2025–2026" },
          { label: "Primary Language", value: "French / English" },
          { label: "Enrollment Status", value: "Open" },
          { label: "Max Students / Cohort", value: "50 Initiates" },
        ].map((s, i) => (
          <div key={i} className="schedule-row" style={{ justifyContent: "space-between" }}>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>{s.label}</span>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", color: "#fff" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= PROFILE ========================= */
function ProfileTab() {
  return (
    <div>
      <div className="schedule-card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
            alt="Profile"
            style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "3px solid #dc2626" }}
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/80x80/dc2626/white?text=K"; }}
          />
          <div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: "1.2rem", color: "#fff", marginBottom: "0.25rem" }}>Kwame Mensah</div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: "0.7rem", color: "#dc2626", letterSpacing: "0.15em", textTransform: "uppercase" }}>Level II Initiate</div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem" }}>Member since September 2024</div>
          </div>
        </div>
        {[
          { label: "Email", value: "kwame.mensah@example.com" },
          { label: "Country", value: "Ghana" },
          { label: "Current Module", value: "Module 3 — Ifá Oracle & Sacred Divination" },
          { label: "Lessons Completed", value: "12 of 16" },
          { label: "Certificate Status", value: "Level I Certified (December 2024)" },
        ].map((s, i) => (
          <div key={i} className="schedule-row" style={{ justifyContent: "space-between" }}>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>{s.label}</span>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", color: "#fff" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= DATA ========================= */
const lessons = [
  {
    image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=600&q=80",
    module: "Module 1",
    title: "Origins of African Spiritual Systems",
    desc: "Tracing the roots of African religion from Kemet to the present diaspora.",
    duration: "42 min",
    level: "Initiate",
    progress: 100,
  },
  {
    image: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?w=600&q=80",
    module: "Module 2",
    title: "The 256 Odù of Ifá",
    desc: "Deep study of the Ifá corpus — divination patterns, proverbs, and archetypes.",
    duration: "1h 8min",
    level: "Advanced",
    progress: 65,
  },
  {
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    module: "Module 1",
    title: "Sacred Plants & Their Spiritual Properties",
    desc: "Identifying and working with medicinal and ceremonial plants.",
    duration: "55 min",
    level: "Initiate",
    progress: 100,
  },
  {
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=80",
    module: "Module 3",
    title: "Ritual Preparation & Sacred Space",
    desc: "How to create and consecrate a ritual space for ancestor work.",
    duration: "38 min",
    level: "Advanced",
    progress: 30,
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    module: "Module 4",
    title: "The Book of the Dead — Kemetic Mysteries",
    desc: "Reading the Amduat and understanding the journey of the soul in Kemetic tradition.",
    duration: "1h 22min",
    level: "Master",
    progress: 0,
  },
  {
    image: "https://images.unsplash.com/photo-1580835845891-d41d521cda86?w=600&q=80",
    module: "Module 2",
    title: "Ancestor Altar — Setup & Activation",
    desc: "Step-by-step guide to creating a proper ancestral altar and communication protocol.",
    duration: "47 min",
    level: "Initiate",
    progress: 80,
  },
];

const scheduleItems = [
  { day: "Monday, March 30", time: "10:00 AM", name: "African Cosmology — Origins & Worldviews", teacher: "Rabbi Ouri Yehoudah", tag: "Live" },
  { day: "Tuesday, March 31", time: "2:00 PM", name: "Ifá Divination Practice Session", teacher: "Babalawo Femi Adeyemi", tag: "Live" },
  { day: "Wednesday, April 1", time: "11:00 AM", name: "Sacred Herbs & Plant Identification", teacher: "Mama Akosua Asante", tag: "Workshop" },
  { day: "Thursday, April 2", time: "6:00 PM", name: "Ancestor Veneration — Q&A Session", teacher: "Sis. Nkechi Okafor", tag: "Q&A" },
  { day: "Saturday, April 4", time: "9:00 AM", name: "Kemetic Sacred Texts Reading Circle", teacher: "Sis. Nkechi Okafor", tag: "Circle" },
  { day: "Saturday, April 4", time: "3:00 PM", name: "Full Moon Ceremony & Ritual", teacher: "Rabbi Ouri Yehoudah", tag: "Ceremony" },
];

const studentData = [
  { name: "Kwame Mensah", email: "kwame@example.com", level: "Initiate II", progress: 67, joined: "Sep 2024", active: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80" },
  { name: "Adaeze Okonkwo", email: "adaeze@example.com", level: "Advanced I", progress: 85, joined: "Jan 2024", active: true, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&q=80" },
  { name: "Olumide Afolabi", email: "olumide@example.com", level: "Initiate I", progress: 42, joined: "Nov 2024", active: true, avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=50&q=80" },
  { name: "Aminata Diallo", email: "aminata@example.com", level: "Master I", progress: 94, joined: "Feb 2023", active: true, avatar: "https://images.unsplash.com/photo-1569360781853-32b75a362551?w=50&q=80" },
  { name: "Kofi Asante", email: "kofi@example.com", level: "Initiate II", progress: 58, joined: "Oct 2024", active: false, avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=50&q=80" },
  { name: "Ngozi Eze", email: "ngozi@example.com", level: "Advanced II", progress: 72, joined: "Mar 2024", active: true, avatar: "https://images.unsplash.com/photo-1580835845891-d41d521cda86?w=50&q=80" },
];

const messages = [
  { from: "Babalawo Femi Adeyemi", subject: "Your Ifá reading for this week's divination session", time: "2h ago", unread: true, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80" },
  { from: "Mama Akosua Asante", subject: "New plant medicine materials uploaded to Module 1", time: "Yesterday", unread: true, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&q=80" },
  { from: "CITSA Administration", subject: "April ceremony schedule — please confirm attendance", time: "2 days ago", unread: true, avatar: LOGO_URL },
  { from: "Rabbi Ouri Yehoudah", subject: "Congratulations on completing Module 1 — Asé!", time: "1 week ago", unread: false, avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=50&q=80" },
  { from: "Sis. Nkechi Okafor", subject: "Kemetic reading circle notes & resources", time: "1 week ago", unread: false, avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=50&q=80" },
];
