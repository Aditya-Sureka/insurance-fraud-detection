import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, X } from "lucide-react";

const fraudScenarios = [
  {
    id: 1,
    title: "Identity Theft Detection",
    description: "Multiple policies under similar details",
    patterns: [
      "Multiple policies with same contact info",
      "Different beneficiary names",
      "Inconsistent employment history",
    ],
    aiExplanation:
      "AI detected a pattern of multiple policies created with similar contact information but different beneficiary names, a common indicator of identity theft.",
  },
  {
    id: 2,
    title: "Claims Padding",
    description: "Inflated claim amounts",
    patterns: [
      "Unusually high claim amount",
      "Multiple similar claims",
      "Vague documentation",
    ],
    aiExplanation:
      "AI identified claim amounts significantly higher than average for similar incidents, combined with vague documentation.",
  },
  {
    id: 3,
    title: "False Documentation",
    description: "Suspicious document patterns",
    patterns: [
      "Inconsistent dates",
      "Mismatched signatures",
      "Altered documents",
    ],
    aiExplanation:
      "AI detected inconsistencies in document dates and potential alterations in submitted documentation.",
  },
];

export function FraudSimulator() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSimulate = () => {
    setAnalyzing(true);
    setShowAnalysis(false);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setShowAnalysis(true);
    }, 2000);
  };

  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % fraudScenarios.length);
    setShowAnalysis(false);
  };

  const scenario = fraudScenarios[currentScenario];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraud Case Simulator</CardTitle>
        <CardDescription>
          See how our AI system detects different types of fraud patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
            <p className="text-sm text-gray-600">{scenario.description}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Suspicious Patterns:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {scenario.patterns.map((pattern, index) => (
                <li key={index} className="text-gray-600">
                  {pattern}
                </li>
              ))}
            </ul>
          </div>

          {!analyzing && !showAnalysis && (
            <Button onClick={handleSimulate} className="w-full">
              Run AI Analysis
            </Button>
          )}

          {analyzing && (
            <div className="text-center py-4">
              <AlertCircle className="h-8 w-8 text-primary animate-pulse mx-auto" />
              <p className="mt-2">AI analyzing patterns...</p>
            </div>
          )}

          {showAnalysis && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Fraud Detected</p>
                    <p className="text-sm text-green-700 mt-1">
                      {scenario.aiExplanation}
                    </p>
                  </div>
                </div>
              </div>
              <Button onClick={nextScenario} className="w-full">
                Next Scenario
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
