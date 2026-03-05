'use client';

import { useState } from "react";
import Sidebar from '@/components/layout/Sidebar';
import { useAuthContext } from '@/contexts/AuthProvider';
import Logo from "@/components/Logo";

import {
Menu,
X,
Bell,
Home,
ChevronDown,
User,
Settings,
LogOut
} from "lucide-react";

export default function DashboardLayout({ children }) {

const { user } = useAuthContext();

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [activePage, setActivePage] = useState("home");
const [notifOpen, setNotifOpen] = useState(false);
const [userOpen, setUserOpen] = useState(false);

const closeMobileMenu = () => setIsMobileMenuOpen(false);

const closeAll = () => {
setNotifOpen(false);
setUserOpen(false);
};

const notifications = [
{ id: 1, text: "New order received", time: "2 min ago", unread: true },
{ id: 2, text: "Crop approved by admin", time: "10 min ago", unread: false },
];

const unreadCount = notifications.filter(n => n.unread).length;

return ( <div className="flex min-h-screen mx-auto">

```
  {/* Desktop Sidebar */}
  <aside className="hidden md:block w-72 border-r shadow-sm bg-white shrink-0">
    <Sidebar userRole={user?.role ?? 'student'} />
  </aside>

  {/* Mobile Sidebar */}
  <div className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`}>

    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={closeMobileMenu}
    />

    <div className={`absolute left-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
      isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
    }`}>

      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <Logo />
        <button onClick={closeMobileMenu} className="p-2 rounded-xl bg-gray-50">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Sidebar userRole={user?.role ?? 'student'} onNavigate={closeMobileMenu} />
      </div>

    </div>
  </div>

  {/* Main Section */}
  <div className="flex-1 flex flex-col min-w-0">

    {/* Header */}
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">

      {/* Left */}
      <div className="flex items-center gap-3">

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="font-bold text-lg">Dashboard</div>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Home */}
        <button
          className={`p-2 rounded-lg hover:bg-gray-100 ${
            activePage === "home" ? "bg-gray-100" : ""
          }`}
          title="Home"
          onClick={() => {
            setActivePage("home");
            closeAll();
          }}
        >
          <Home size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">

          <button
            className="p-2 rounded-lg hover:bg-gray-100 relative"
            onClick={() => {
              setNotifOpen(o => !o);
              setUserOpen(false);
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg">

              <div className="p-3 border-b font-semibold">
                Notifications
              </div>

              {notifications.map(n => (
                <div key={n.id} className="p-3 text-sm hover:bg-gray-50">
                  <div>{n.text}</div>
                  <div className="text-xs text-gray-400">{n.time}</div>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* User */}
        <div className="relative">

          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => {
              setUserOpen(o => !o);
              setNotifOpen(false);
            }}
          >
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
              {user?.name?.charAt(0) ?? "U"}
            </div>

            <ChevronDown size={14} />
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">

              <div className="p-3 border-b">
                <div className="font-semibold">{user?.name ?? "User"}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>

              <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-50">
                <User size={14} /> Profile
              </button>

              <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-50">
                <Settings size={14} /> Settings
              </button>

              <button className="flex items-center gap-2 w-full p-3 hover:bg-red-50 text-red-500">
                <LogOut size={14} /> Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>

    {/* Page Content */}
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto w-full">
        {children}
      </div>
    </main>

  </div>
</div>

);
}
