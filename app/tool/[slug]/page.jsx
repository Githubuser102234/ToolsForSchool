import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
// CORRECTED PATH: '../../data/tool-config'
import { TOOLS } from '../../data/tool-config'; 
// CORRECTED PATH: '../../components/ToolComponents'
import { 
  GradeCalculator, 
  PomodoroTimer, 
  StudyPlanner 
} from '../../components/ToolComponents';

// Map slugs to components (which are all client components)
const ToolComponentMap = {
  'grade-calculator': GradeCalculator,
  'pomodoro-timer': PomodoroTimer,
  'study-planner': StudyPlanner,
};

export default function ToolDetailPage({ params }) {
  const { slug } = params;
  const tool = TOOLS.find(t => t.slug === slug);
  
  // Get the corresponding component dynamically
  const ToolComponent = ToolComponentMap[slug];

  if (!tool || !ToolComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800">404 - Tool Not Found</h1>
          <p className="text-gray-500 mt-2">The tool "{slug}" does not exist.</p>
          <Link href="/" passHref>
            <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Tools List
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Determine header color based on tool config
  const headerColor = `text-${tool.color}-600`;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Link href="/" passHref className="mb-6 inline-flex items-center text-sm font-semibold text-gray-600 hover:text-indigo-800 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Tools List
        </Link>
        
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
          <h1 className={`text-3xl font-bold text-gray-800 flex items-center mb-6 border-b pb-4 ${headerColor}`}>
            <tool.icon className={`w-7 h-7 mr-3 ${headerColor}`} />
            {tool.name}
          </h1>
          {/* Render the selected tool component */}
          <ToolComponent />
        </div>
      </div>
    </div>
  );
}

