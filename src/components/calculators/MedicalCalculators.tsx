import React from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MedicalCalculators = () => {
  const [creatinine, setCreatinine] = React.useState("");
  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState("male");
  const [crcl, setCrcl] = React.useState<number | null>(null);
  const [bsa, setBsa] = React.useState<number | null>(null);
  const [bmi, setBmi] = React.useState<number | null>(null);

  const calculateCrCl = () => {
    const cr = parseFloat(creatinine);
    const w = parseFloat(weight);
    const a = parseFloat(age);

    if (cr && w && a) {
      // Cockcroft-Gault formula
      let crclValue = ((140 - a) * w) / (72 * cr);
      if (gender === "female") {
        crclValue *= 0.85;
      }
      setCrcl(Math.round(crclValue * 10) / 10);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Medical Calculators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crcl">
          <TabsList className="w-full">
            <TabsTrigger value="crcl" className="flex-1">
              CrCl
            </TabsTrigger>
            <TabsTrigger value="bsa" className="flex-1">
              BSA
            </TabsTrigger>
            <TabsTrigger value="bmi" className="flex-1">
              BMI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crcl" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Serum Creatinine (mg/dL)</Label>
              <Input
                type="number"
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
                placeholder="Enter creatinine"
              />
            </div>

            <div className="space-y-2">
              <Label>Age (years)</Label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
              />
            </div>

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
              <Label>Gender</Label>
              <div className="flex gap-4">
                <Button
                  variant={gender === "male" ? "default" : "outline"}
                  onClick={() => setGender("male")}
                >
                  Male
                </Button>
                <Button
                  variant={gender === "female" ? "default" : "outline"}
                  onClick={() => setGender("female")}
                >
                  Female
                </Button>
              </div>
            </div>

            <Button
              onClick={calculateCrCl}
              className="w-full"
              disabled={!creatinine || !age || !weight}
            >
              Calculate CrCl
            </Button>

            {crcl !== null && (
              <div className="mt-4 p-4 bg-blue-50 rounded text-center">
                <div className="font-semibold">Creatinine Clearance</div>
                <div className="text-2xl font-bold text-blue-600">
                  {crcl} mL/min
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bsa" className="space-y-4 mt-4">
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
              onClick={() => {
                const w = parseFloat(weight);
                const h = parseFloat(height);
                if (w && h) {
                  // Mosteller formula
                  const bsaValue = Math.sqrt((w * h) / 3600);
                  setBsa(Math.round(bsaValue * 100) / 100);
                }
              }}
              className="w-full"
              disabled={!weight || !height}
            >
              Calculate BSA
            </Button>
            {bsa !== null && (
              <div className="mt-4 p-4 bg-blue-50 rounded text-center">
                <div className="font-semibold">Body Surface Area</div>
                <div className="text-2xl font-bold text-blue-600">{bsa} m²</div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bmi" className="space-y-4 mt-4">
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
              onClick={() => {
                const w = parseFloat(weight);
                const h = parseFloat(height) / 100; // convert to meters
                if (w && h) {
                  const bmiValue = w / (h * h);
                  setBmi(Math.round(bmiValue * 10) / 10);
                }
              }}
              className="w-full"
              disabled={!weight || !height}
            >
              Calculate BMI
            </Button>
            {bmi !== null && (
              <div className="mt-4 p-4 bg-blue-50 rounded text-center">
                <div className="font-semibold">Body Mass Index</div>
                <div className="text-2xl font-bold text-blue-600">
                  {bmi} kg/m²
                </div>
                <div className="text-sm mt-2">
                  {bmi < 18.5
                    ? "Underweight"
                    : bmi < 25
                      ? "Normal weight"
                      : bmi < 30
                        ? "Overweight"
                        : "Obese"}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicalCalculators;
