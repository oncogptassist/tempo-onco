import React from "react";
import { Calculator, BookOpen, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface TopHeaderProps {
  onCalculatorOpen?: () => void;
  onNotesOpen?: () => void;
  notifications?: Array<{ id: string; text: string }>;
}

const defaultNotifications = [
  { id: "1", text: "New clinical guideline update available" },
  { id: "2", text: "Reminder: Weekly team meeting at 2 PM" },
  { id: "3", text: "New treatment protocol added for review" },
];

const TopHeader = ({
  onCalculatorOpen = () => {},
  onNotesOpen = () => {},
  notifications = defaultNotifications,
}: TopHeaderProps) => {
  const [isCalculatorOpen, setIsCalculatorOpen] = React.useState(false);
  const [isNotesOpen, setIsNotesOpen] = React.useState(false);
  const [noteText, setNoteText] = React.useState("");

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>Calculators</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Medical Calculators</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button variant="outline" className="w-full justify-start">
                BSA Calculator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Carboplatin Dose Calculator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Creatinine Clearance
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Quick Notes</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Quick Notes</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Type your notes here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={() => setIsNotesOpen(false)}>Save Note</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id}>
                {notification.text}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
