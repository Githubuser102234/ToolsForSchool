import { Calculator, Clock, BookOpen, GraduationCap, Timer } from 'lucide-react';

export const TOOLS = [
  // Existing Tools
  { slug: 'grade-calculator', name: 'Weighted Grade Calculator', icon: Calculator, description: 'Calculate weighted averages, track progress, and predict final grades.', color: 'indigo' },
  { slug: 'pomodoro-timer', name: 'Productivity Timer', icon: Clock, description: 'A focus and break timer with cycle tracking to enhance study sessions.', color: 'red' },
  { slug: 'study-planner', name: 'Simple Task Planner', icon: BookOpen, description: 'Organize your homework, exams, and projects by due date.', color: 'purple' },
  
  // NEW TOOLS
  { slug: 'gpa-converter', name: 'GPA to 4.0 Converter', icon: GraduationCap, description: 'Convert percentage or letter grades to a standard 4.0 scale.', color: 'green' },
  { slug: 'reading-time-estimator', name: 'Reading Time Estimator', icon: Timer, description: 'Estimate the time required to read a book, article, or textbook chapter.', color: 'orange' },
];

