import Link from 'next/link';
import { LayoutDashboard, Zap } from 'lucide-react';
// Import TOOLS from the dedicated static data file
import { TOOLS } from '../../data/tool-config'; 

export default function ToolListPage() {
  return (
    <div className="min-h-screen pt-8 pb-12">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 flex items-center">
          <LayoutDashboard className="w-8 h-8 mr-3 text-indigo-600" />
          School Tools Hub
        </h1>
        <p className="text-xl text-gray-500">
          Select a tool to boost your productivity and manage your studies.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            // Dynamic Tailwind classes based on tool color
            const bgColor = `bg-${tool.color}-50`;
            const textColor = `text-${tool.color}-700`;
            const hoverRing = `hover:ring-4 hover:ring-${tool.color}-100`;

            return (
              // Link component is a safe way to navigate in a Next.js App Router Server Component
              <Link key={tool.slug} href={`/tool/${tool.slug}`} passHref className="group">
                <div
                  className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${bgColor} ${hoverRing} border border-gray-100`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${bgColor} border border-${tool.color}-200`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                  </div>
                  <h2 className={`text-xl font-bold ${textColor} mb-2 group-hover:underline`}>{tool.name}</h2>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                  <span className={`mt-3 inline-flex items-center text-xs font-semibold transition-colors ${textColor} opacity-80`}>
                    Launch Tool
                    <Zap className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      
      <footer className="max-w-7xl mx-auto py-6 px-4 text-center text-sm text-gray-400 mt-12">
        Vercel/Next.js School Tools Application
      </footer>
    </div>
  );
}

