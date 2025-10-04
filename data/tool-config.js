import { Calculator, Clock, BookOpen } from 'lucide-react';

// Static array defining the tools. This is separate from client components
// to allow the server page (app/page.jsx) to safely read and iterate over it.
export const TOOLS = [
  { slug: 'grade-calculator', name: 'Grade Calculator', icon: Calculator, description: 'Calculate weighted averages and predict final grades.', color: 'indigo' },
  { slug: 'pomodoro-timer', name: 'Pomodoro Timer', icon: Clock, description: 'A 25-minute focus timer to enhance productivity.', color: 'red' },
  { slug: 'study-planner', name: 'Study Planner', icon: BookOpen, description: 'Organize your homework and exams by subject and due date.', color: 'purple' },
];

