import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Guideline {
  id: string;
  title: string;
  category: string;
  cancerType: string;
  content: string;
}

interface GuidelinesListProps {
  guidelines?: Guideline[];
  onGuidelineSelect?: (guideline: Guideline) => void;
}

const defaultGuidelines: Guideline[] = [
  // Breast Cancer Guidelines
  {
    id: "breast-1",
    title: "Early Stage Breast Cancer",
    category: "Breast Cancer",
    cancerType: "Breast",
    content:
      "Treatment guidelines for Stage I and II breast cancer including surgical options, adjuvant therapy, and hormone therapy.",
  },
  {
    id: "breast-2",
    title: "Locally Advanced Breast Cancer",
    category: "Breast Cancer",
    cancerType: "Breast",
    content:
      "Management of Stage III breast cancer with neoadjuvant chemotherapy, surgery, and radiation therapy protocols.",
  },
  // Lung Cancer Guidelines
  {
    id: "lung-1",
    title: "Non-Small Cell Lung Cancer",
    category: "Lung Cancer",
    cancerType: "Lung",
    content:
      "Comprehensive treatment approach for NSCLC including staging, surgical resection, and targeted therapy options.",
  },
  {
    id: "lung-2",
    title: "Small Cell Lung Cancer",
    category: "Lung Cancer",
    cancerType: "Lung",
    content:
      "Treatment protocols for limited and extensive stage SCLC with chemotherapy and radiation therapy guidelines.",
  },
  // Colorectal Cancer Guidelines
  {
    id: "colorectal-1",
    title: "Colon Cancer Management",
    category: "Colorectal Cancer",
    cancerType: "Colorectal",
    content:
      "Guidelines for colon cancer treatment including surgical approaches and adjuvant chemotherapy protocols.",
  },
  {
    id: "colorectal-2",
    title: "Rectal Cancer Protocol",
    category: "Colorectal Cancer",
    cancerType: "Colorectal",
    content:
      "Management of rectal cancer with neoadjuvant chemoradiation, surgery, and adjuvant therapy guidelines.",
  },
  // Prostate Cancer Guidelines
  {
    id: "prostate-1",
    title: "Localized Prostate Cancer",
    category: "Prostate Cancer",
    cancerType: "Prostate",
    content:
      "Treatment options for localized prostate cancer including active surveillance, surgery, and radiation therapy.",
  },
  {
    id: "prostate-2",
    title: "Advanced Prostate Cancer",
    category: "Prostate Cancer",
    cancerType: "Prostate",
    content:
      "Management of metastatic prostate cancer with hormone therapy and chemotherapy protocols.",
  },
  // Lymphoma Guidelines
  {
    id: "lymphoma-1",
    title: "Hodgkin Lymphoma",
    category: "Lymphoma",
    cancerType: "Lymphoma",
    content:
      "Treatment protocols for early and advanced stage Hodgkin lymphoma.",
  },
  {
    id: "lymphoma-2",
    title: "Non-Hodgkin Lymphoma",
    category: "Lymphoma",
    cancerType: "Lymphoma",
    content:
      "Guidelines for various subtypes of NHL including DLBCL and follicular lymphoma.",
  },
];

const GuidelinesList = ({
  guidelines = defaultGuidelines,
  onGuidelineSelect = () => {},
}: GuidelinesListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCancerType, setSelectedCancerType] = useState<string>("all");

  const cancerTypes = ["all", ...new Set(guidelines.map((g) => g.cancerType))];

  const filteredGuidelines = guidelines.filter((guideline) => {
    const matchesSearch =
      guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guideline.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCancerType =
      selectedCancerType === "all" ||
      guideline.cancerType === selectedCancerType;
    return matchesSearch && matchesCancerType;
  });

  const groupedGuidelines = filteredGuidelines.reduce(
    (acc, guideline) => {
      if (!acc[guideline.category]) {
        acc[guideline.category] = [];
      }
      acc[guideline.category].push(guideline);
      return acc;
    },
    {} as Record<string, Guideline[]>,
  );

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search guidelines..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cancerTypes.map((type) => (
              <Button
                key={type}
                variant={selectedCancerType === type ? "default" : "outline"}
                onClick={() => setSelectedCancerType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {Object.entries(groupedGuidelines).map(
            ([category, categoryGuidelines]) => (
              <AccordionItem
                key={category}
                value={category}
                className="border rounded-lg"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-lg font-semibold">{category}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <div className="space-y-3">
                    {categoryGuidelines.map((guideline) => (
                      <Card
                        key={guideline.id}
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => onGuidelineSelect(guideline)}
                      >
                        <h3 className="font-medium mb-2">{guideline.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {guideline.content}
                        </p>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default GuidelinesList;
