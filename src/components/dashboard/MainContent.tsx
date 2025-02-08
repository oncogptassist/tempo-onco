import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuidelinesList from "../guidelines/GuidelinesList";
import { Activity, BookOpen, Clock } from "lucide-react";

interface RecentActivity {
  id: string;
  title: string;
  timestamp: string;
  type: string;
}

interface MainContentProps {
  recentActivities?: RecentActivity[];
  selectedGuideline?: any;
  onGuidelineSelect?: (guideline: any) => void;
}

const defaultRecentActivities: RecentActivity[] = [
  {
    id: "1",
    title: "Breast Cancer Treatment Protocol viewed",
    timestamp: "2 hours ago",
    type: "guideline_view",
  },
  {
    id: "2",
    title: "Lung Cancer Screening Guidelines updated",
    timestamp: "4 hours ago",
    type: "guideline_update",
  },
  {
    id: "3",
    title: "Colorectal Cancer Management accessed",
    timestamp: "1 day ago",
    type: "guideline_view",
  },
];

const MainContent = ({
  recentActivities = defaultRecentActivities,
  selectedGuideline,
  onGuidelineSelect = () => {},
}: MainContentProps) => {
  return (
    <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, Doctor
          </h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="guidelines" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="guidelines" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guidelines
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guidelines">
            <GuidelinesList onGuidelineSelect={onGuidelineSelect} />
          </TabsContent>

          <TabsContent value="recent">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activities
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.timestamp}
                      </p>
                    </div>
                    <div className="text-sm text-blue-600">
                      {activity.type === "guideline_view"
                        ? "Viewed"
                        : "Updated"}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainContent;
