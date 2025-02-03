import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const preventionTips = [
  {
    title: "Protect Your Personal Information",
    tip: "Never share your policy details or personal information through unsolicited emails or phone calls.",
    category: "Identity Protection",
  },
  {
    title: "Document Everything",
    tip: "Keep detailed records of all insurance-related transactions and communications.",
    category: "Documentation",
  },
  {
    title: "Regular Policy Review",
    tip: "Review your policy statements regularly to spot any unauthorized changes or suspicious activities.",
    category: "Monitoring",
  },
  {
    title: "Verify Insurance Professionals",
    tip: "Always verify the credentials of insurance agents and companies before sharing information.",
    category: "Due Diligence",
  },
  {
    title: "Report Suspicious Activity",
    tip: "If you notice any suspicious activity, report it immediately to your insurance provider.",
    category: "Reporting",
  },
];

export function PreventionTips() {
  const [currentTip, setCurrentTip] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % preventionTips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % preventionTips.length);
    setIsAutoPlay(false);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + preventionTips.length) % preventionTips.length);
    setIsAutoPlay(false);
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Daily Fraud Prevention Tips
        </CardTitle>
        <CardDescription>
          Stay informed about the latest fraud prevention practices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            className="min-h-[150px] transition-opacity duration-500"
            key={currentTip}
          >
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm font-medium text-primary">
                {preventionTips[currentTip].category}
              </p>
              <h3 className="text-lg font-semibold mt-2">
                {preventionTips[currentTip].title}
              </h3>
              <p className="text-gray-600 mt-2">{preventionTips[currentTip].tip}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTip}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-500">
              Tip {currentTip + 1} of {preventionTips.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTip}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
