import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import ControlBar from "@/components/ControlBar";
import QueueSidebar from "@/components/QueueSidebar";

const Layout: React.FC = () => {
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Queue Sidebar */}

      {/* Main */}
      <main className="flex-1 relative overflow-hidden rounded-3xl bg-gray-800">
        {/* Blur Effect */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none animate-breathing"></div>

        {/* Outlet Content */}
        <div className="relative z-20 h-full grid grid-cols-12">
          <div
            className={`${
              isQueueOpen ? "col-span-8" : "col-span-12"
            } overflow-y-auto h-full`}
          >
            <Outlet />
          </div>

          {/* Queue Sidebar */}
          <div
            className={`${
              isQueueOpen ? "col-span-4" : "invisible col-span-0 hidden"
            }`}
          >
            <QueueSidebar
              isOpen={isQueueOpen}
              onClose={() => setIsQueueOpen(false)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <ControlBar onToggleQueue={() => setIsQueueOpen(!isQueueOpen)} />
      </footer>
    </div>
  );
};

export default Layout;
