import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MusicControls from "@/components/MusicControls";

const DefaultLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <Outlet /> {/* Render nội dung của từng trang */}
        </div>
      </main>

      {/* Music Controls */}
      <MusicControls />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
