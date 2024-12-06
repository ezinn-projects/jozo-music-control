import ControlBar from "@/components/ControlBar";
import Header from "@/components/Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Footer */}
      <footer className="">
        <ControlBar />
      </footer>
    </div>
  );
};

export default Layout;
