// In a real Next.js project, you would import global styles here.
// For this environment, we'll include necessary styles via <style>.

// export const metadata = {
//   title: 'School Tools Dashboard',
//   description: 'Essential productivity tools for students.',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>School Tools Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Simulating Tailwind and Inter Font loading for the single-file environment */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f7f9fb;
          }
        `}</style>
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}

