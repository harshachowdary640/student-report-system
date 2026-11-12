import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Student } from "./data";

export function Avatar({
  initials,
  color,
  size = "normal",
}: {
  initials: string;
  color: string;
  size?: "normal" | "large";
}) {
  return <span className={`avatar avatar-${color} avatar-${size}`}>{initials}</span>;
}

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "plain";
}) {
  return (
    <button className={`button button-${variant}`} {...props}>
      {children}
    </button>
  );
}

export function StudentCard({ student }: { student: Student }) {
  const average = Math.round(
    student.subjects.reduce((sum, subject) => sum + subject.score, 0) /
      student.subjects.length,
  );

  return (
    <Link className="student-row" to={`/students/${student.id}`}>
      <div className="student-identity">
        <Avatar initials={student.initials} color={student.color} />
        <div>
          <strong>{student.name}</strong>
          <span>{student.email}</span>
        </div>
      </div>
      <span className="student-grade">{student.grade}</span>
      <span className={`score-pill ${average >= 75 ? "score-good" : "score-low"}`}>
        {average}%
      </span>
      <span className="attendance-value">{student.attendance}%</span>
      <ChevronRight className="row-chevron" size={17} />
    </Link>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function Trend({ children }: { children: ReactNode }) {
  return (
    <span className="trend">
      <ArrowUpRight size={14} />
      {children}
    </span>
  );
}
