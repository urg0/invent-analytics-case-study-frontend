import React from "react";
import { NavLink } from "react-router-dom";

import { Toaster } from "@components/ui/toaster";

import { Users, Book, LucideIcon } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  icon: LucideIcon;
}

const Layout = ({ title, children, icon: Icon }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-black">
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#0A0A0A] flex flex-col border-r border-[#232323]">
        <div className="p-6 flex items-center gap-2">
          <img src="/invent-ai.jpeg" alt="logo" className="w-8 rounded-lg" />
          <h1 className="text-xl font-medium text-white">Invent.ai Library</h1>
        </div>

        <nav className="flex-1 px-4 py-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 rounded-xl mb-1 transition-all duration-200 ${
                isActive
                  ? "text-white bg-[#232323]"
                  : "text-[#A0A0A0] hover:text-white hover:bg-[#1C1C1C]"
              }`
            }
          >
            <Users className="w-5 h-5 mr-3" />
            Users
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-[#232323]"
                  : "text-[#A0A0A0] hover:text-white hover:bg-[#1C1C1C]"
              }`
            }
          >
            <Book className="w-5 h-5 mr-3" />
            Books
          </NavLink>
        </nav>

        <div className="p-4 border-t border-[#232323]">
          <div className="flex items-center p-3 bg-[#141414] rounded-xl hover:bg-[#1C1C1C] transition-colors duration-200">
            <div className="w-10 h-10 rounded-xl bg-[#232323] flex items-center justify-center mr-3">
              <span className="text-white text-sm">URG</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                Ulas Rotinda Guler
              </div>
              <div className="text-xs text-[#A0A0A0]">Staff Member</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 h-16 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center px-6 border-b border-[#232323]">
          <div className="flex items-center gap-2 w-full">
            <Icon className="w-8 h-8 text-white" />
            <h2 className="text-lg font-medium text-white">{title}</h2>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto bg-black">{children}</main>
        <Toaster />
      </div>
    </div>
  );
};

export default Layout;
