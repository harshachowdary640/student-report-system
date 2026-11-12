import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  BookOpenCheck,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  Users,
  X,
} from "lucide-react";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Avatar } from "./components";
import { initialStudents, type Student } from "./data";
import { DashboardPage, LabPage, NotFoundPage, ReportsPage, StudentDetailPage, StudentsPage } from "./pages";

const navigation = [
  { label: "Overview", to: "/", icon: LayoutDashboard, end: true },
  { label: "Students", to: "/students", icon: Users },
  { label: "Reports", to: "/reports", icon: ClipboardList },
  { label: "React lab", to: "/lab", icon: BookOpenCheck },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const filteredStudents = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    if (!query) return students;
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query),
    );
  }, [globalSearch, students]);

  const addStudent = (student: Student) => setStudents((current) => [student, ...current]);
  const pageTitle =
    navigation.find((item) => item.to === location.pathname)?.label ??
    (location.pathname.startsWith("/students/") ? "Student profile" : "Page");

  return (
    <div className={`app-shell${darkMode ? " dark-mode" : ""}`}>
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          className="mobile-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`sidebar${sidebarOpen ? " sidebar-open" : ""}`}>
        <NavLink className="brand" to="/" onClick={() => setSidebarOpen(false)}>
          <span className="brand-mark"><GraduationCap size={21} /></span>
          <span>northstar<span className="brand-dot">.</span></span>
        </NavLink>

        <div className="workspace-switcher">
          <span className="workspace-icon">N</span>
          <span className="workspace-copy"><strong>Northstar Academy</strong><small>School workspace</small></span>
          <ChevronDown size={16} />
        </div>

        <p className="nav-caption">WORKSPACE</p>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "Students" && <span className="nav-count">{students.length}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon"><CircleHelp size={17} /></span>
            <strong>Need a hand?</strong>
            <span>Explore the React lab to see how this project works.</span>
            <NavLink to="/lab" onClick={() => setSidebarOpen(false)}>Explore lab <span>→</span></NavLink>
          </div>
          <button className="nav-link settings-link" type="button" onClick={() => setDarkMode((value) => !value)}>
            <Settings size={18} strokeWidth={1.8} /><span>Appearance</span>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="sidebar-profile">
            <Avatar initials="AM" color="purple" />
            <span className="profile-copy"><strong>Alex Morgan</strong><small>Administrator</small></span>
            <button type="button" className="icon-button profile-menu" aria-label="Sign out"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <span className="topbar-context">Workspace</span><span className="breadcrumb-divider">/</span><strong>{pageTitle}</strong>
          </div>
          <div className="topbar-actions">
            <label className="search-field">
              <Search size={16} />
              <input aria-label="Search students" placeholder="Search students..." value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} />
              {globalSearch ? (
                <button type="button" className="search-clear" aria-label="Clear search" onClick={() => setGlobalSearch("")}><X size={14} /></button>
              ) : <kbd>⌘ K</kbd>}
            </label>
            <button className="icon-button notification-button" type="button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <button className="topbar-user" type="button" onClick={() => navigate("/lab")} aria-label="View account and React lab"><Avatar initials="AM" color="purple" /><ChevronDown size={14} /></button>
          </div>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<DashboardPage students={filteredStudents} allStudents={students} />} />
            <Route path="/students" element={<StudentsPage students={filteredStudents} onAddStudent={addStudent} />} />
            <Route path="/students/:studentId" element={<StudentDetailPage students={students} />} />
            <Route path="/reports" element={<ReportsPage students={filteredStudents} />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="app-footer"><span>© {new Date().getFullYear()} Northstar Academy</span><span><Activity size={13} /> All systems operational</span></footer>
      </div>
    </div>
  );
}
