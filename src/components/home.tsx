import React from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import MainContent from "./dashboard/MainContent";
import AIChatbot from "./chat/AIChatbot";

interface HomeProps {
  onSidebarNavigation?: (path: string) => void;
  onCalculatorOpen?: () => void;
  onNotesOpen?: () => void;
}

const Home = ({
  onSidebarNavigation = () => {},
  onCalculatorOpen = () => {},
  onNotesOpen = () => {},
}: HomeProps) => {
  const [activeSection, setActiveSection] = React.useState("handbook");
  const [selectedGuideline, setSelectedGuideline] = React.useState(null);
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar
        activeItem="/"
        activeSection={activeSection}
        onNavItemClick={(item) => onSidebarNavigation(item.href)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          onCalculatorOpen={onCalculatorOpen}
          onNotesOpen={onNotesOpen}
          onSectionChange={handleSectionChange}
        />
        <MainContent
          selectedGuideline={selectedGuideline}
          onGuidelineSelect={setSelectedGuideline}
        />
      </div>
      <AIChatbot />
    </div>
  );
};

export default Home;
