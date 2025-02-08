import React from "react";
import GuidelinesDashboard from "../guidelines/GuidelinesDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, BookOpen, Calendar, Star, TrendingUp } from "lucide-react";

interface DashboardContentProps {
  recentGuidelines?: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  upcomingEvents?: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  notifications?: Array<{
    id: string;
    message: string;
    time: string;
  }>;
}

const defaultRecentGuidelines = [
  {
    id: "1",
    title: "Updated Breast Cancer Treatment Protocol",
    date: "2024-03-15",
  },
  { id: "2", title: "New Immunotherapy Guidelines", date: "2024-03-14" },
  { id: "3", title: "Revised Pain Management Protocol", date: "2024-03-13" },
];

const defaultUpcomingEvents = [
  { id: "1", title: "Oncology Board Meeting", date: "2024-03-20 09:00 AM" },
  { id: "2", title: "Clinical Trial Review", date: "2024-03-21 02:00 PM" },
  { id: "3", title: "Department Conference", date: "2024-03-22 10:00 AM" },
];

const defaultNotifications = [
  {
    id: "1",
    message: "New clinical trial enrollment open",
    time: "1 hour ago",
  },
  {
    id: "2",
    message: "Updated safety protocols available",
    time: "2 hours ago",
  },
  { id: "3", message: "Reminder: Weekly team meeting", time: "3 hours ago" },
];

const DashboardContent = ({
  recentGuidelines = defaultRecentGuidelines,
  upcomingEvents = defaultUpcomingEvents,
  notifications = defaultNotifications,
}: DashboardContentProps) => {
  return (
    <div className="w-full min-h-screen bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Guidelines
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {recentGuidelines.map((guideline) => (
                <div
                  key={guideline.id}
                  className="mb-4 last:mb-0 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">{guideline.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {guideline.date}
                    </p>
                  </div>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="mb-4 last:mb-0">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {notifications.map((notification) => (
                <div key={notification.id} className="mb-4 last:mb-0">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guidelines" className="w-full">
        <TabsList>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="guidelines">
          <GuidelinesDashboard />
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics dashboard content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContent;
