import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Desktop Sidebar Only */}
      <aside className="hidden md:block w-72 border-r border-border bg-card">
        <Sidebar />
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

