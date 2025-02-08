import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import ChatInterface from "@/components/chat/ChatInterface";

interface DashboardProps {
  isChatOpen?: boolean;
  onChatToggle?: () => void;
}

const Dashboard = ({
  isChatOpen = true,
  onChatToggle = () => {},
}: DashboardProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-auto">
          <DashboardContent />
        </main>
        <ChatInterface isOpen={isChatOpen} onClose={onChatToggle} />
      </div>
    </div>
  );
};

export default Dashboard;
