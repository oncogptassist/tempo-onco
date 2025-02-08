import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import {
  LayoutGrid,
  FileText,
  GitFork,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarProps {
  items?: NavItem[];
  className?: string;
  activeSection?: string;
  onNavItemClick?: (item: NavItem) => void;
}

const defaultItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutGrid className="w-5 h-5" />,
    href: "/",
  },
  {
    title: "Clinical Guidelines",
    icon: <FileText className="w-5 h-5" />,
    href: "/guidelines",
  },
  {
    title: "Treatment Algorithms",
    icon: <GitFork className="w-5 h-5" />,
    href: "/algorithms",
  },
  {
    title: "Patient Management",
    icon: <Users className="w-5 h-5" />,
    href: "/patients",
  },
];

const Sidebar = ({
  items = defaultItems,
  className,
  activeSection = "handbook",
  onNavItemClick = () => {},
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen w-[280px] border-r bg-white",
        className,
      )}
    >
      {/* Logo Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Oncology Support</h1>
        <p className="text-sm text-muted-foreground">
          Clinical Guidelines Portal
        </p>
      </div>

      <Separator />

      {/* Navigation Section */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          <TooltipProvider>
            {items.map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer"
                    onClick={() => onNavItemClick(item)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 px-3"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </ScrollArea>

      {/* Footer Section */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
