import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import {
  BookOpen,
  FileText,
  GitFork,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Dna,
  Microscope,
  Activity,
  Pill,
  Brain,
  HeartPulse,
  Shield,
  ClipboardCheck,
  Syringe,
  AlertCircle,
  Bed,
  ClipboardList,
  Thermometer,
  Heart,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
  activeSection?: string;
}

const sidebarSections: Record<
  string,
  Array<{ title: string; icon: JSX.Element; items: string[] }>
> = {
  handbook: [
    {
      title: "General Oncology Principles",
      icon: <Dna className="h-4 w-4" />,
      items: [
        "Tumor Biology & Genetics",
        "Oncogenic Pathways",
        "Cancer Staging & Grading",
        "Tumor Markers",
      ],
    },
    {
      title: "Cancer Diagnosis & Staging",
      icon: <Microscope className="h-4 w-4" />,
      items: [
        "Biopsy Techniques",
        "Imaging in Oncology",
        "Molecular Testing",
        "Pathology Reports",
      ],
    },
    {
      title: "Treatment Modalities",
      icon: <Activity className="h-4 w-4" />,
      items: [
        "Chemotherapy",
        "Immunotherapy",
        "Radiation Oncology",
        "Surgical Oncology",
      ],
    },
    {
      title: "Pharmacology & Toxicities",
      icon: <Pill className="h-4 w-4" />,
      items: ["Side Effects", "Drug Interactions", "Supportive Care"],
    },
    {
      title: "Research & AI",
      icon: <Brain className="h-4 w-4" />,
      items: ["AI in Diagnosis", "Clinical Trials", "Latest Research"],
    },
    {
      title: "Supportive Care",
      icon: <HeartPulse className="h-4 w-4" />,
      items: [
        "Fatigue Management",
        "Rehabilitation",
        "Nutrition",
        "Survivorship",
      ],
    },
  ],
  opd: [
    {
      title: "First-Time Consultation",
      icon: <Users className="h-4 w-4" />,
      items: [
        "History Taking",
        "Physical Examination",
        "Initial Workup",
        "Documentation",
      ],
    },
    {
      title: "Follow-Up Care",
      icon: <Activity className="h-4 w-4" />,
      items: [
        "Surveillance Protocol",
        "Managing Side Effects",
        "Treatment Response",
        "Quality of Life",
      ],
    },
    {
      title: "Cancer Prevention",
      icon: <Shield className="h-4 w-4" />,
      items: [
        "Screening Guidelines",
        "Genetic Counseling",
        "Risk Assessment",
        "Lifestyle Modifications",
      ],
    },
  ],
  chemo: [
    {
      title: "Pre-Chemotherapy",
      icon: <ClipboardCheck className="h-4 w-4" />,
      items: [
        "Assessment Protocol",
        "Baseline Tests",
        "Consent Process",
        "Patient Education",
      ],
    },
    {
      title: "Administration",
      icon: <Syringe className="h-4 w-4" />,
      items: [
        "Safe Handling",
        "Infusion Guidelines",
        "Emergency Protocols",
        "Documentation",
      ],
    },
    {
      title: "Monitoring",
      icon: <Activity className="h-4 w-4" />,
      items: [
        "Side Effects",
        "Lab Monitoring",
        "Dose Adjustments",
        "Treatment Response",
      ],
    },
  ],
  inpatient: [
    {
      title: "Emergency Care",
      icon: <AlertCircle className="h-4 w-4" />,
      items: [
        "Neutropenic Fever",
        "Tumor Lysis",
        "Spinal Cord Compression",
        "Major Bleeding",
      ],
    },
    {
      title: "Ward Management",
      icon: <Bed className="h-4 w-4" />,
      items: [
        "Daily Assessment",
        "Pain Management",
        "Nutrition Support",
        "Infection Control",
      ],
    },
    {
      title: "Discharge Planning",
      icon: <ClipboardList className="h-4 w-4" />,
      items: [
        "Medication Review",
        "Follow-up Plan",
        "Home Care Instructions",
        "Support Services",
      ],
    },
  ],
  palliative: [
    {
      title: "Pain Management",
      icon: <Thermometer className="h-4 w-4" />,
      items: [
        "Assessment Tools",
        "Medication Protocol",
        "Non-Pharmacological",
        "Breakthrough Pain",
      ],
    },
    {
      title: "Symptom Control",
      icon: <Activity className="h-4 w-4" />,
      items: [
        "Respiratory",
        "Gastrointestinal",
        "Neurological",
        "Psychological",
      ],
    },
    {
      title: "End of Life Care",
      icon: <Heart className="h-4 w-4" />,
      items: [
        "Advance Care Planning",
        "Family Support",
        "Spiritual Care",
        "Bereavement Support",
      ],
    },
  ],
};

import { OncologyDoc } from "@/lib/types";

const Sidebar = ({ className, activeSection = "handbook" }: SidebarProps) => {
  const [headings, setHeadings] = React.useState<OncologyDoc[]>([]);
  const [expandedHeadings, setExpandedHeadings] = React.useState<
    Record<string, boolean>
  >({});
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchHeadings = async (section: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("oncology_docs")
        .select("*")
        .eq("section", section)
        .is("parent_id", null)
        .order("index_path");

      if (error) throw error;
      setHeadings(data || []);
    } catch (error) {
      console.error("Error fetching headings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubheadings = async (parentId: string) => {
    try {
      const { data, error } = await supabase
        .from("oncology_docs")
        .select("*")
        .eq("parent_id", parentId)
        .order("index_path");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching subheadings:", error);
      return [];
    }
  };

  const handleHeadingClick = async (heading: OncologyDoc) => {
    if (!heading.is_category) {
      setSelectedItem(heading.id);
      // Emit event for MainContent to fetch content
      const event = new CustomEvent("contentSelected", { detail: heading });
      window.dispatchEvent(event);
      return;
    }

    const isExpanded = expandedHeadings[heading.id];
    const newExpanded = { ...expandedHeadings, [heading.id]: !isExpanded };

    if (!isExpanded && !heading.children) {
      const subheadings = await fetchSubheadings(heading.id);
      setHeadings(
        headings.map((h) =>
          h.id === heading.id ? { ...h, children: subheadings } : h,
        ),
      );
    }

    setExpandedHeadings(newExpanded);
  };

  React.useEffect(() => {
    fetchHeadings(activeSection);
    setExpandedHeadings({});
    setSelectedItem(null);
  }, [activeSection]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const sections = sidebarSections[activeSection] || sidebarSections.handbook;

  return (
    <div
      className={cn(
        "flex flex-col h-screen w-[280px] border-r bg-white",
        className,
      )}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Oncology Support</h1>
        <p className="text-sm text-muted-foreground">
          Clinical Guidelines Portal
        </p>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="space-y-2">
            {headings.map((heading) => (
              <div key={heading.id} className="space-y-1">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-sm",
                    selectedItem === heading.id && "bg-primary/10",
                  )}
                  onClick={() => handleHeadingClick(heading)}
                >
                  <div className="flex items-center gap-2">
                    {heading.is_category && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedHeadings[heading.id] && "rotate-90",
                        )}
                      />
                    )}
                    <span>{heading.title}</span>
                  </div>
                </Button>
                {expandedHeadings[heading.id] && heading.children && (
                  <div className="pl-6 space-y-1">
                    {heading.children.map((subheading) => (
                      <Button
                        key={subheading.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-sm",
                          selectedItem === subheading.id && "bg-primary/10",
                        )}
                        onClick={() => handleHeadingClick(subheading)}
                      >
                        <div className="flex items-center gap-2">
                          {subheading.is_category && (
                            <ChevronRight
                              className={cn(
                                "h-4 w-4 transition-transform",
                                expandedHeadings[subheading.id] && "rotate-90",
                              )}
                            />
                          )}
                          <span>{subheading.title}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

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
