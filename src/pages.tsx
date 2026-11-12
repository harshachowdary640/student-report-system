import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Download,
  FileText,
  GraduationCap,
  Plus,
  Search,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, PageHeading, StudentCard, Trend } from "./components";
import type { Student } from "./data";

function averageScore(student: Student) {
  return Math.round(student.subjects.reduce((sum, subject) => sum + subject.score, 0) / student.subjects.length);
}

function MetricCard({ label, value, note, icon: Icon, color, trend }: {
  label: string;
  value: string;
  note: string;
  icon: typeof Users;
  color: string;
  trend?: string;
}) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon ${color}`}><Icon size={18} /></span>
        <button className="metric-menu" aria-label={`${label} information`} type="button">···</button>
      </div>
      <p className="metric-label">{label}</p>
      <div className="metric-value-line"><strong>{value}</strong>{trend && <Trend>{trend}</Trend>}</div>
      <p className="metric-note">{note}</p>
    </article>
  );
}

function PerformanceChart() {
  const data = [
    { month: "Jan", score: 52 },
    { month: "Feb", score: 64 },
    { month: "Mar", score: 57 },
    { month: "Apr", score: 74 },
    { month: "May", score: 68 },
    { month: "Jun", score: 88 },
    { month: "Jul", score: 79 },
    { month: "Aug", score: 94, current: true },
    { month: "Sep", score: 72 },
    { month: "Oct", score: 84 },
    { month: "Nov", score: 62 },
    { month: "Dec", score: 77 },
  ];

  return (
    <section className="panel performance-panel">
      <div className="panel-heading">
        <div><h2>Academic performance</h2><p>Average student scores over time</p></div>
        <button className="select-button" type="button">This year <ChevronDown size={14} /></button>
      </div>
      <div className="chart-legend"><span /><strong>Average score</strong><span className="legend-note">Compared to last year</span><Trend>8.2%</Trend></div>
      <div className="bar-chart" role="img" aria-label="Bar chart showing monthly average student scores">
        <div className="chart-grid">
          {[100, 75, 50, 25, 0].map((number) => <span key={number}>{number}</span>)}
          <div className="grid-lines"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="chart-bars">
          {data.map(({ month, score, current }) => (
            <div className="chart-column" key={month}>
              <div className={`chart-bar${current ? " chart-bar-current" : ""}`} style={{ height: `${score}%` }} title={`${month}: ${score}%`} />
              <span className={current ? "month-current" : ""}>{month}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubjectBreakdown() {
  const subjects = [
    { name: "Mathematics", students: 32, color: "subject-violet", progress: 78 },
    { name: "Sciences", students: 28, color: "subject-blue", progress: 62 },
    { name: "Language arts", students: 36, color: "subject-orange", progress: 88 },
    { name: "Computer science", students: 24, color: "subject-green", progress: 48 },
  ];
  return (
    <section className="panel subjects-panel">
      <div className="panel-heading"><div><h2>Subject overview</h2><p>Students by subject</p></div><button className="icon-button subtle-button" aria-label="More subject options" type="button">···</button></div>
      <div className="subject-list">
        {subjects.map((subject) => (
          <div className="subject-item" key={subject.name}>
            <div className="subject-label"><span className={`subject-dot ${subject.color}`} /><strong>{subject.name}</strong><span>{subject.students}</span></div>
            <div className="progress-track"><span className={subject.color} style={{ width: `${subject.progress}%` }} /></div>
          </div>
        ))}
      </div>
      <Link className="panel-link" to="/reports">View all reports <ArrowRight size={15} /></Link>
    </section>
  );
}

export function DashboardPage({ students, allStudents }: { students: Student[]; allStudents: Student[] }) {
  const [period, setPeriod] = useState("This semester");
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date()).toUpperCase();
  return (
    <>
      <div className="welcome-strip">
        <div><span className="welcome-date">{today} <span className="date-spark">✳</span></span><h1>Good morning, Alex <span>✦</span></h1><p>Here’s what’s happening with your students today.</p></div>
        <div className="welcome-decoration" aria-hidden="true"><span className="decoration-sun">✳</span><span className="decoration-line" /><span className="decoration-ring" /></div>
      </div>

      <div className="dashboard-toolbar">
        <div><h2>Overview</h2><span className="live-badge"><i /> Live data</span></div>
        <Button variant="secondary" onClick={() => window.print()}><Download size={15} /> Export report</Button>
      </div>

      <section className="metric-grid" aria-label="School statistics">
        <MetricCard label="Total students" value={`${allStudents.length + 118}`} note="Across all grade levels" icon={Users} color="metric-purple" trend="+12%" />
        <MetricCard label="Average GPA" value="3.42" note="Out of 4.0 this semester" icon={GraduationCap} color="metric-blue" trend="+4.3%" />
        <MetricCard label="Attendance rate" value="94.8%" note="School-wide this month" icon={Check} color="metric-green" trend="+2.1%" />
        <MetricCard label="Need attention" value="08" note="Students below 2.5 GPA" icon={TrendingUp} color="metric-orange" />
      </section>

      <div className="insights-grid"><PerformanceChart /><SubjectBreakdown /></div>

      <section className="panel recent-panel">
        <div className="panel-heading recent-heading">
          <div><h2>Recent students</h2><p>A quick look at your student directory</p></div>
          <div className="recent-actions"><label className="period-select"><span className="period-dot" /><select aria-label="Student time period" value={period} onChange={(event) => setPeriod(event.target.value)}><option>This semester</option><option>Last semester</option><option>This year</option></select><ChevronDown size={14} /></label><Link className="panel-link desktop-link" to="/students">View all <ArrowRight size={15} /></Link></div>
        </div>
        {students.length ? <><div className="table-header"><span>STUDENT NAME</span><span>GRADE</span><span>AVG. SCORE</span><span>ATTENDANCE</span><span /></div><div className="student-list">{students.slice(0, 5).map((student) => <StudentCard key={student.id} student={student} />)}</div></> : <EmptyState title="No students found" detail="Try adjusting your search." />}
        <Link className="panel-link mobile-view-all" to="/students">View all students <ArrowRight size={15} /></Link>
      </section>
      <div className="dashboard-footnote"><Sparkles size={14} /> Your students are making great progress this semester.</div>
    </>
  );
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="empty-state"><span><Search size={19} /></span><strong>{title}</strong><p>{detail}</p></div>;
}

function AddStudentModal({ onClose, onAdd }: { onClose: () => void; onAdd: (student: Student) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("Grade 10");
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter a student name and a valid email address.");
      return;
    }
    const initials = trimmedName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    onAdd({
      id: `ST-${Math.floor(2100 + Math.random() * 800)}`,
      name: trimmedName,
      email: trimmedEmail,
      initials,
      color: "lilac",
      grade,
      gpa: 0,
      attendance: 100,
      subjects: [
        { name: "Mathematics", score: 0 },
        { name: "Physics", score: 0 },
        { name: "English", score: 0 },
        { name: "Computer science", score: 0 },
      ],
    });
  };
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-student-title">
        <div className="modal-heading"><div><span className="modal-icon"><Users size={18} /></span><h2 id="add-student-title">Add a student</h2><p>Create a new student profile for your school.</p></div><button className="icon-button" aria-label="Close" onClick={onClose}><X size={19} /></button></div>
        <form onSubmit={submit}>
          <label className="form-field">Full name<input autoFocus placeholder="e.g. Jamie Parker" value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label className="form-field">Email address<input type="email" placeholder="student@northstar.edu" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="form-field">Grade<select value={grade} onChange={(event) => setGrade(event.target.value)}>{["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((item) => <option key={item}>{item}</option>)}</select></label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit"><Plus size={16} /> Add student</Button></div>
        </form>
      </section>
    </div>
  );
}

export function StudentsPage({ students, onAddStudent }: { students: Student[]; onAddStudent: (student: Student) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All grades");
  const [query, setQuery] = useState("");
  const visible = students.filter((student) => (filter === "All grades" || student.grade === filter) && (!query || `${student.name} ${student.id}`.toLowerCase().includes(query.toLowerCase())));
  return (
    <>
      <PageHeading eyebrow="DIRECTORY" title="Students" description="Manage your students and keep track of their progress." action={<Button onClick={() => setShowModal(true)}><Plus size={16} /> Add student</Button>} />
      <section className="panel directory-panel">
        <div className="directory-toolbar">
          <div><h2>All students <span className="count-badge">{students.length}</span></h2><p>A list of all students enrolled at Northstar Academy.</p></div>
          <div className="directory-filters"><label className="directory-search"><Search size={15} /><input placeholder="Search students" aria-label="Filter students" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="filter-select"><select aria-label="Filter by grade" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All grades</option>{["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => <option key={grade}>{grade}</option>)}</select><ChevronDown size={14} /></label></div>
        </div>
        {visible.length ? <><div className="table-header"><span>STUDENT NAME</span><span>GRADE</span><span>AVG. SCORE</span><span>ATTENDANCE</span><span /></div><div className="student-list">{visible.map((student) => <StudentCard key={student.id} student={student} />)}</div></> : <EmptyState title="No students match" detail="Try a different name or grade filter." />}
        <div className="table-footer"><span>Showing <strong>{visible.length}</strong> of <strong>{students.length}</strong> students</span><div><button className="pagination-button" disabled><ArrowLeft size={14} /> Previous</button><button className="pagination-button" disabled>Next <ArrowRight size={14} /></button></div></div>
      </section>
      <div className="concept-note"><BookOpen size={16} /><span><strong>React concept: State &amp; rendering</strong> — The search, grade filter, and add-student form use <code>useState</code> to update the visible list.</span></div>
      {showModal && <AddStudentModal onClose={() => setShowModal(false)} onAdd={(student) => { onAddStudent(student); setShowModal(false); }} />}
    </>
  );
}

export function StudentDetailPage({ students }: { students: Student[] }) {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = students.find((item) => item.id === studentId);
  if (!student) return <div className="not-found"><span className="not-found-icon"><Search size={23} /></span><p className="eyebrow">STUDENT NOT FOUND</p><h1>We couldn’t find that student.</h1><p>This profile may have been moved or the link may be incorrect.</p><Button variant="secondary" onClick={() => navigate("/students")}><ArrowLeft size={16} /> Back to students</Button></div>;
  const average = averageScore(student);
  return (
    <>
      <button className="back-link" type="button" onClick={() => navigate("/students")}><ArrowLeft size={15} /> All students</button>
      <section className="profile-hero panel"><Avatar initials={student.initials} color={student.color} size="large" /><div className="profile-heading"><span className="eyebrow">{student.id} <span className="profile-dot" /> {student.grade}</span><h1>{student.name}</h1><p>{student.email}</p><div className="profile-badges"><span><i className="status-dot" /> Active student</span><span>2025–2026 school year</span></div></div><Button variant="secondary" onClick={() => window.print()}><Download size={15} /> Export report</Button></section>
      <div className="metric-grid detail-metrics">
        <MetricCard label="Overall average" value={`${average}%`} note="Across all subjects" icon={TrendingUp} color="metric-purple" />
        <MetricCard label="GPA" value={student.gpa ? student.gpa.toFixed(2) : "—"} note="Out of 4.0" icon={GraduationCap} color="metric-blue" />
        <MetricCard label="Attendance" value={`${student.attendance}%`} note="Present this semester" icon={Check} color="metric-green" />
        <MetricCard label="Subjects" value={`${student.subjects.length}`} note="Currently enrolled" icon={BookOpen} color="metric-orange" />
      </div>
      <section className="panel grades-panel">
        <div className="panel-heading"><div><h2>Subject performance</h2><p>Exam results for the current semester</p></div><span className="term-badge">SEMESTER 1</span></div>
        <div className="grades-table"><div className="grades-header"><span>SUBJECT</span><span>EXAM SCORE</span><span>GRADE</span><span>RESULT</span></div>{student.subjects.map((subject) => { const letter = subject.score >= 90 ? "A" : subject.score >= 80 ? "B" : subject.score >= 70 ? "C" : subject.score >= 60 ? "D" : "F"; return <div className="grade-row" key={subject.name}><strong>{subject.name}</strong><div className="grade-score"><span className="progress-track"><i style={{ width: `${subject.score}%` }} /></span><span>{subject.score}%</span></div><span className={`letter-grade letter-${letter.toLowerCase()}`}>{letter}</span><span className={`result-badge ${subject.score >= 50 ? "result-pass" : "result-fail"}`}>{subject.score >= 50 ? <><Check size={12} /> Pass</> : <><X size={12} /> Fail</>}</span></div>})}</div>
      </section>
      <div className="concept-note"><BookOpen size={16} /><span><strong>React concept: Dynamic routing</strong> — This profile reads <code>{student.id}</code> from the URL using <code>useParams()</code>, then renders the matching student’s report.</span></div>
    </>
  );
}

export function ReportsPage({ students }: { students: Student[] }) {
  const [sortAscending, setSortAscending] = useState(false);
  const sortedStudents = useMemo(() => [...students].sort((a, b) => sortAscending ? averageScore(a) - averageScore(b) : averageScore(b) - averageScore(a)), [sortAscending, students]);
  return (
    <>
      <PageHeading eyebrow="ACADEMICS" title="Reports" description="Review exam results and academic performance across your school." action={<Button variant="secondary" onClick={() => window.print()}><Download size={15} /> Export reports</Button>} />
      <div className="report-summary">
        <article className="report-callout"><span className="report-callout-icon"><Sparkles size={19} /></span><div><span>SEMESTER 1 · 2025–2026</span><strong>Students are making steady progress.</strong><p>Your students are averaging <b>{students.length ? (students.reduce((sum, student) => sum + averageScore(student), 0) / students.length).toFixed(1) : "0"}%</b> across all subjects this semester.</p></div><ArrowUpRight className="callout-arrow" size={17} /></article>
        <article className="report-mini-card"><span>PASS RATE</span><strong>92.4%</strong><Trend>3.1%</Trend><small>Across all subjects</small></article>
        <article className="report-mini-card"><span>TOP PERFORMER</span><strong>{sortedStudents[0]?.name.split(" ")[0] ?? "—"}</strong><span className="top-student-score">{sortedStudents.length ? `${averageScore(sortedStudents[0])}% average` : "No results yet"}</span><small>This semester</small></article>
      </div>
      <section className="panel report-table-panel">
        <div className="directory-toolbar"><div><h2>Exam results</h2><p>Semester 1 · All grade levels</p></div><button className="select-button" type="button">All subjects <ChevronDown size={14} /></button></div>
        <div className="report-table"><div className="report-table-head"><span>STUDENT</span><span>GRADE</span><button type="button" onClick={() => setSortAscending((current) => !current)}>AVERAGE {sortAscending ? <ArrowUpRight size={13} /> : <ArrowDown size={13} />}</button><span>GPA</span><span>RESULT</span></div>{sortedStudents.map((student) => { const average = averageScore(student); return <Link to={`/students/${student.id}`} className="report-table-row" key={student.id}><span className="report-student"><Avatar initials={student.initials} color={student.color} /><span><strong>{student.name}</strong><small>{student.email}</small></span></span><span>{student.grade}</span><span className="report-average">{average}%</span><span>{student.gpa ? student.gpa.toFixed(2) : "—"}</span><span className={`result-badge ${average >= 50 ? "result-pass" : "result-fail"}`}>{average >= 50 ? <><Check size={12} /> Pass</> : <><X size={12} /> Fail</>}</span></Link>})}</div>
        {!students.length && <EmptyState title="No reports found" detail="No students match your search." />}
        <div className="table-footer"><span>Showing <strong>{students.length}</strong> student reports</span><Link className="panel-link" to="/students">Student directory <ArrowRight size={15} /></Link></div>
      </section>
      <div className="concept-note"><BookOpen size={16} /><span><strong>React concept: Conditional rendering</strong> — Each exam result displays a Pass or Fail badge based on the student’s calculated average score.</span></div>
    </>
  );
}

function CounterDemo() {
  const [count, setCount] = useState(0);
  return <div className="demo-widget"><span className="demo-widget-label">CLICK COUNTER</span><div className="counter-controls"><button type="button" onClick={() => setCount((value) => value - 1)} aria-label="Decrease count">−</button><strong>{count}</strong><button type="button" onClick={() => setCount((value) => value + 1)} aria-label="Increase count">+</button></div><button className="demo-reset" type="button" onClick={() => setCount(0)}>Reset counter</button></div>;
}

function CalculatorDemo() {
  const [first, setFirst] = useState("12");
  const [second, setSecond] = useState("8");
  const result = Number(first || 0) + Number(second || 0);
  return <div className="demo-widget"><span className="demo-widget-label">QUICK CALCULATOR</span><div className="calculator-controls"><input aria-label="First number" type="number" value={first} onChange={(event) => setFirst(event.target.value)} /><span>+</span><input aria-label="Second number" type="number" value={second} onChange={(event) => setSecond(event.target.value)} /><span>=</span><strong>{result}</strong></div><p className="demo-helper">Edit either number to calculate the sum.</p></div>;
}

function TodoDemo() {
  const [tasks, setTasks] = useState([{ label: "Review semester grades", done: true }, { label: "Send parent updates", done: false }]);
  const [newTask, setNewTask] = useState("");
  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTask.trim()) return;
    setTasks((current) => [...current, { label: newTask.trim(), done: false }]);
    setNewTask("");
  };
  return <div className="demo-widget todo-widget"><span className="demo-widget-label">TASK LIST <span>{tasks.filter((task) => !task.done).length} left</span></span><div className="todo-items">{tasks.map((task, index) => <label className={`todo-item${task.done ? " todo-done" : ""}`} key={`${task.label}-${index}`}><input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item, taskIndex) => taskIndex === index ? { ...item, done: !item.done } : item))} /><span className="todo-check">{task.done && <Check size={11} />}</span>{task.label}</label>)}</div><form className="todo-add" onSubmit={addTask}><input aria-label="New task" placeholder="Add a task..." value={newTask} onChange={(event) => setNewTask(event.target.value)} /><button type="submit" aria-label="Add task"><Plus size={16} /></button></form></div>;
}

export function LabPage() {
  const [lightOn, setLightOn] = useState(false);
  const [temperature, setTemperature] = useState(21);
  const [welcomeName, setWelcomeName] = useState("Alex");
  const [toast, setToast] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [registered, setRegistered] = useState(false);
  return (
    <>
      <PageHeading eyebrow="HANDS-ON LEARNING" title="React lab" description="Explore the React concepts behind this student report system." action={<span className="lab-status"><i /> INTERACTIVE DEMOS</span>} />
      <section className="lab-intro"><span className="lab-intro-icon"><GraduationCap size={20} /></span><div><strong>Built for your React lab exam</strong><p>Every example below is interactive. Try changing the values and see React state, props, and rendering in action.</p></div><span className="lab-intro-sparkle">✳</span></section>
      <section className="lab-section"><div className="lab-section-heading"><span className="lab-section-number">01</span><div><h2>State &amp; useState</h2><p>Update component state and let React re-render the UI.</p></div></div>
        <div className="lab-grid">
          <article className="panel lab-card"><div className="lab-card-title"><span className="lab-card-icon icon-purple"><TrendingUp size={17} /></span><div><h3>Counter</h3><span>useState · Event handlers</span></div></div><CounterDemo /><p className="lab-explainer">The <code>count</code> value lives in state. Clicking + or − updates the state and re-renders the number.</p></article>
          <article className="panel lab-card"><div className="lab-card-title"><span className="lab-card-icon icon-blue"><FileText size={17} /></span><div><h3>Calculator</h3><span>Controlled inputs · Derived state</span></div></div><CalculatorDemo /><p className="lab-explainer">Input values are controlled by React. The result is calculated from the latest state on each render.</p></article>
          <article className="panel lab-card"><div className="lab-card-title"><span className="lab-card-icon icon-green"><Check size={17} /></span><div><h3>To-do list</h3><span>Arrays · State updates</span></div></div><TodoDemo /><p className="lab-explainer">Add a task or check it off. State updates use <code>map</code> and the spread operator.</p></article>
          <article className="panel lab-card"><div className="lab-card-title"><span className="lab-card-icon icon-orange"><Sparkles size={17} /></span><div><h3>Temperature &amp; light</h3><span>State · Conditional rendering</span></div></div><div className="demo-widget"><div className="temperature-readout"><span className={lightOn ? "light-indicator light-on" : "light-indicator"}>{lightOn ? "☀" : "☾"}</span><strong>{temperature}°<small>C</small></strong><span>{temperature > 25 ? "Warm day" : temperature < 15 ? "A little chilly" : "Perfect weather"}</span></div><div className="temperature-controls"><button type="button" onClick={() => setTemperature((value) => value - 1)}>−</button><button type="button" className={lightOn ? "light-toggle light-toggle-on" : "light-toggle"} onClick={() => setLightOn((value) => !value)}>{lightOn ? <Sun size={14} /> : <span className="toggle-knob" />}{lightOn ? "Light on" : "Light off"}</button><button type="button" onClick={() => setTemperature((value) => value + 1)}>+</button></div></div><p className="lab-explainer">A temperature converter and light toggle that respond instantly to state changes.</p></article>
        </div>
      </section>
      <section className="lab-section"><div className="lab-section-heading"><span className="lab-section-number">02</span><div><h2>Props &amp; reusable components</h2><p>Pass data and event handlers from a parent into child components.</p></div></div>
        <div className="props-grid">
          <article className="panel lab-card"><div className="lab-card-title"><span className="lab-card-icon icon-pink"><Users size={17} /></span><div><h3>Welcome message</h3><span>Props · Parent to child</span></div></div><div className="demo-widget"><label className="form-field compact-field">Your name<input value={welcomeName} onChange={(event) => setWelcomeName(event.target.value)} placeholder="Enter your name" /></label><div className="welcome-preview"><span>PERSONALIZED COMPONENT</span><strong>Hello, {welcomeName || "there"}! <span>👋</span></strong><small>Welcome to Northstar Academy.</small></div></div><p className="lab-explainer">Change the parent’s name state and pass it as a <code>name</code> prop to the greeting component.</p></article>
          <article className="panel lab-card"><div className="lab-card-title"><span className="lab-card-icon icon-purple"><BookOpen size={17} /></span><div><h3>Reusable button</h3><span>Props · Variants · Click handlers</span></div></div><div className="demo-widget button-demo"><Button onClick={() => { setToast(true); window.setTimeout(() => setToast(false), 2200); }}><Plus size={15} /> Primary action</Button><Button variant="secondary" onClick={() => setToast(true)}>Secondary</Button><Button variant="plain" onClick={() => setToast(true)}>Text button <ArrowRight size={14} /></Button>{toast && <span className="button-toast"><Check size={13} /> Button clicked — event handler fired!</span>}</div><p className="lab-explainer">All three buttons reuse one component. <code>variant</code> and <code>onClick</code> are passed in as props.</p></article>
        </div>
      </section>
      <section className="lab-section"><div className="lab-section-heading"><span className="lab-section-number">03</span><div><h2>Forms &amp; routing</h2><p>Controlled form inputs, submit handlers, and dynamic route parameters.</p></div></div>
        <div className="props-grid">
          <article className="panel lab-card"><div className="lab-card-title"><span className="lab-card-icon icon-blue"><FileText size={17} /></span><div><h3>Student registration</h3><span>Controlled form · Validation</span></div></div>{registered ? <div className="success-panel"><span><Check size={17} /></span><strong>Registration complete!</strong><p>{registrationMessage}</p><Button variant="secondary" onClick={() => { setRegistered(false); setFormName(""); setFormEmail(""); }}>Register another student</Button></div> : <form className="registration-form" onSubmit={(event) => { event.preventDefault(); if (!formName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) { setFormMessage("Please enter a name and a valid email address."); return; } setRegistrationMessage(`${formName.trim()} is registered with ${formEmail.trim()}.`); setRegistered(true); setFormMessage(""); }}><label className="form-field">Student name<input value={formName} onChange={(event) => setFormName(event.target.value)} placeholder="Jamie Parker" /></label><label className="form-field">Email address<input type="email" value={formEmail} onChange={(event) => setFormEmail(event.target.value)} placeholder="jamie@northstar.edu" /></label>{formMessage && <span className="form-error">{formMessage}</span>}<Button type="submit"><Plus size={15} /> Create student</Button></form>}<p className="lab-explainer">React state controls each field. Submitting validates the input and renders a success state.</p></article>
          <article className="panel lab-card"><div className="lab-card-title"><span className="lab-card-icon icon-green"><ArrowRight size={17} /></span><div><h3>Student detail route</h3><span>React Router · useParams</span></div></div><div className="route-example"><div className="route-path"><span>URL</span><code>/students/<b>:studentId</b></code></div><div className="route-path"><span>HOOK</span><code>useParams()</code></div><p>Click a student to open their report card. The student ID comes from the URL and selects the matching profile.</p><Link className="route-link" to="/students">Browse students <ArrowRight size={14} /></Link></div><p className="lab-explainer">The app also uses <code>NavLink</code> for active navigation and includes a custom 404 page.</p></article>
        </div>
      </section>
      <div className="concept-note"><BookOpen size={16} /><span><strong>Try it yourself</strong> — Open a student profile to see props and dynamic routing in a real feature, not just a demo.</span></div>
    </>
  );
}

export function NotFoundPage() {
  return <div className="not-found"><span className="not-found-icon"><Search size={23} /></span><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>This page took a wrong turn.</h1><p>The page you’re looking for doesn’t exist or has been moved.</p><Link className="button button-primary" to="/"><ArrowLeft size={15} /> Back to overview</Link></div>;
}
