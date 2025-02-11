import React from "react";
import { BookOpen, Stethoscope, Syringe, FileText, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HeaderProps {
  onSectionChange?: (section: string) => void;
}

const navigationItems = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "AI Handbook",
    description: "Interactive oncology guidelines and best practices",
    href: "/handbook",
  },
  {
    icon: <Stethoscope className="h-5 w-5" />,
    label: "Oncology OPD",
    description: "Patient evaluations and diagnostic pathways",
    href: "/opd",
  },
  {
    icon: <Syringe className="h-5 w-5" />,
    label: "Chemotherapy Unit",
    description: "Chemotherapy regimens and monitoring",
    href: "/chemo",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Inpatient Oncology",
    description: "Inpatient care and emergency protocols",
    href: "/inpatient",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    label: "Palliative Care",
    description: "Pain management and end-of-life care",
    href: "/palliative",
  },
];

const Header = ({ onSectionChange = () => {} }: HeaderProps) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {navigationItems.map((item) => (
          <div
            key={item.href}
            className="min-w-[200px] flex-1"
            onClick={() => onSectionChange(item.href.slice(1))}
          >
            <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer h-full">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
