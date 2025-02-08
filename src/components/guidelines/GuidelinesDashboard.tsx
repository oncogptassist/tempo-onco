import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GuidelineCategory {
  id: string;
  title: string;
  guidelines: Guideline[];
}

interface Guideline {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  cancerType: string;
}

interface GuidelinesDashboardProps {
  categories?: GuidelineCategory[];
  onSearch?: (term: string) => void;
  onFilter?: (cancerType: string) => void;
}

const defaultCategories: GuidelineCategory[] = [
  {
    id: "1",
    title: "Breast Cancer Guidelines",
    guidelines: [
      {
        id: "b1",
        title: "Early Stage Breast Cancer Treatment",
        description:
          "Comprehensive guidelines for treating early stage breast cancer",
        lastUpdated: "2024-03-15",
        cancerType: "Breast",
      },
      {
        id: "b2",
        title: "Metastatic Breast Cancer Management",
        description: "Treatment protocols for metastatic breast cancer",
        lastUpdated: "2024-03-10",
        cancerType: "Breast",
      },
    ],
  },
  {
    id: "2",
    title: "Lung Cancer Guidelines",
    guidelines: [
      {
        id: "l1",
        title: "NSCLC Treatment Protocol",
        description: "Treatment guidelines for non-small cell lung cancer",
        lastUpdated: "2024-03-12",
        cancerType: "Lung",
      },
      {
        id: "l2",
        title: "SCLC Management",
        description: "Small cell lung cancer treatment guidelines",
        lastUpdated: "2024-03-08",
        cancerType: "Lung",
      },
    ],
  },
];

const GuidelinesDashboard = ({
  categories = defaultCategories,
  onSearch = () => {},
  onFilter = () => {},
}: GuidelinesDashboardProps) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Clinical Guidelines
            </h1>
            <p className="text-gray-500">
              Browse and search through clinical guidelines
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search guidelines..."
                className="pl-10"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
          <Select onValueChange={onFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by cancer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="breast">Breast Cancer</SelectItem>
              <SelectItem value="lung">Lung Cancer</SelectItem>
              <SelectItem value="colorectal">Colorectal Cancer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Guidelines Content */}
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="hover:bg-gray-50 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      {category.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({category.guidelines.length} guidelines)
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 p-4">
                    {category.guidelines.map((guideline) => (
                      <Card key={guideline.id}>
                        <CardHeader>
                          <CardTitle>{guideline.title}</CardTitle>
                          <CardDescription>
                            {guideline.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Last updated: {guideline.lastUpdated}</span>
                            <Button variant="outline" size="sm">
                              View Guidelines
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesDashboard;
