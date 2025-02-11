import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "../tools/RightSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [activeSection, setActiveSection] = React.useState("handbook");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeSection={activeSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSectionChange={setActiveSection} />
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Layout;
