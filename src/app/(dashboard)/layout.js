import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex  min-h-screen max-w-7xl mx-auto ">

      {/* Desktop Sidebar Only */}
      {/* <aside className="hidden md:block w-72 border-r border-border bg-card">
      </aside> */}
        <Sidebar />
       

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

