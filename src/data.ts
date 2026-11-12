export type Student = {
  id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
  grade: string;
  gpa: number;
  attendance: number;
  subjects: { name: string; score: number }[];
};

export const initialStudents: Student[] = [
  {
    id: "ST-2048",
    name: "Olivia Rhye",
    email: "olivia.rhye@northstar.edu",
    initials: "OR",
    color: "lilac",
    grade: "Grade 10",
    gpa: 3.92,
    attendance: 98,
    subjects: [
      { name: "Mathematics", score: 94 },
      { name: "Physics", score: 88 },
      { name: "English", score: 96 },
      { name: "Computer science", score: 92 },
    ],
  },
  {
    id: "ST-2047",
    name: "Phoenix Baker",
    email: "phoenix.baker@northstar.edu",
    initials: "PB",
    color: "peach",
    grade: "Grade 11",
    gpa: 3.45,
    attendance: 92,
    subjects: [
      { name: "Mathematics", score: 82 },
      { name: "Physics", score: 78 },
      { name: "English", score: 88 },
      { name: "Computer science", score: 86 },
    ],
  },
  {
    id: "ST-2046",
    name: "Lana Steiner",
    email: "lana.steiner@northstar.edu",
    initials: "LS",
    color: "mint",
    grade: "Grade 10",
    gpa: 3.78,
    attendance: 96,
    subjects: [
      { name: "Mathematics", score: 90 },
      { name: "Physics", score: 86 },
      { name: "English", score: 94 },
      { name: "Computer science", score: 89 },
    ],
  },
  {
    id: "ST-2045",
    name: "Demi Wilkinson",
    email: "demi.wilkinson@northstar.edu",
    initials: "DW",
    color: "blue",
    grade: "Grade 12",
    gpa: 2.86,
    attendance: 78,
    subjects: [
      { name: "Mathematics", score: 68 },
      { name: "Physics", score: 71 },
      { name: "English", score: 76 },
      { name: "Computer science", score: 73 },
    ],
  },
  {
    id: "ST-2044",
    name: "Candice Wu",
    email: "candice.wu@northstar.edu",
    initials: "CW",
    color: "yellow",
    grade: "Grade 11",
    gpa: 3.61,
    attendance: 94,
    subjects: [
      { name: "Mathematics", score: 88 },
      { name: "Physics", score: 84 },
      { name: "English", score: 91 },
      { name: "Computer science", score: 90 },
    ],
  },
  {
    id: "ST-2043",
    name: "Natali Craig",
    email: "natali.craig@northstar.edu",
    initials: "NC",
    color: "rose",
    grade: "Grade 9",
    gpa: 3.24,
    attendance: 89,
    subjects: [
      { name: "Mathematics", score: 78 },
      { name: "Physics", score: 75 },
      { name: "English", score: 86 },
      { name: "Computer science", score: 81 },
    ],
  },
];
