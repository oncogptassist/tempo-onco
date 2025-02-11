import React from "react";
import { Calculator, AlertTriangle, Beaker, GitBranch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RightSidebarProps {
  className?: string;
}

const RightSidebar = ({ className }: RightSidebarProps) => {
  const [bsa, setBsa] = React.useState<string>("");
  const [weight, setWeight] = React.useState<string>("");
  const [height, setHeight] = React.useState<string>("");

  const calculateBSA = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w && h) {
      // Mosteller formula
      const bsaValue = Math.sqrt((w * h) / 3600);
      setBsa(bsaValue.toFixed(2));
    }
  };

  return (
    <div className="w-[320px] border-l bg-white h-screen overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Oncology Tools</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* BSA Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                BSA Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                />
              </div>
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height"
                />
              </div>
              <Button
                onClick={calculateBSA}
                className="w-full"
                disabled={!weight || !height}
              >
                Calculate BSA
              </Button>
              {bsa && (
                <div className="mt-2 p-2 bg-blue-50 rounded text-center">
                  <span className="font-semibold">BSA: {bsa} m²</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Red Flags & Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="mb-2">
                <AlertDescription>
                  Neutrophil count {"<"} 0.5 × 10⁹/L
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertDescription>
                  Platelet count {"<"} 20 × 10⁹/L
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Lab References */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Beaker className="h-4 w-4" />
                Lab References
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>WBC</span>
                <span>4.0-11.0 × 10⁹/L</span>
              </div>
              <div className="flex justify-between">
                <span>Hemoglobin</span>
                <span>13.5-17.5 g/dL</span>
              </div>
              <div className="flex justify-between">
                <span>Platelets</span>
                <span>150-450 × 10⁹/L</span>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Algorithms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Treatment Algorithms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                >
                  Febrile Neutropenia
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                >
                  Tumor Lysis Syndrome
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                >
                  Chemotherapy Toxicity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightSidebar;
