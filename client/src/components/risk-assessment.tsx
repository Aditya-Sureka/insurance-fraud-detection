import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: 1,
    question: "Have you ever shared your policy details online?",
    options: ["Yes", "No", "Not Sure"],
    riskWeights: [3, 0, 1],
  },
  {
    id: 2,
    question: "How often do you review your insurance documents?",
    options: ["Monthly", "Yearly", "Never"],
    riskWeights: [0, 1, 3],
  },
  {
    id: 3,
    question: "Have you experienced any suspicious insurance-related contacts?",
    options: ["Yes", "No", "Maybe"],
    riskWeights: [3, 0, 2],
  },
];

export function RiskAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (weightIndex: number) => {
    const newAnswers = [...answers, questions[currentQuestion].riskWeights[weightIndex]];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateRiskLevel = () => {
    const totalRisk = answers.reduce((sum, weight) => sum + weight, 0);
    const maxRisk = questions.length * 3; // Maximum possible risk
    return (totalRisk / maxRisk) * 100;
  };

  const getRiskCategory = (riskPercentage: number) => {
    if (riskPercentage < 30) return { level: "Low", color: "text-green-600" };
    if (riskPercentage < 70) return { level: "Medium", color: "text-yellow-600" };
    return { level: "High", color: "text-red-600" };
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const riskPercentage = calculateRiskLevel();
    const { level, color } = getRiskCategory(riskPercentage);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Risk Assessment Results</CardTitle>
          <CardDescription>Based on your answers, here's your fraud risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={riskPercentage} className="w-full" />
            <p className="text-center text-lg">
              Risk Level: <span className={`font-bold ${color}`}>{level}</span>
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-4">
                {level === "Low"
                  ? "Great job! You're taking good precautions against fraud."
                  : level === "Medium"
                  ? "There's room for improvement in your fraud prevention practices."
                  : "You should take immediate steps to improve your security practices."}
              </p>
              <Button onClick={restart} className="w-full">
                Retake Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Assessment Tool</CardTitle>
        <CardDescription>
          Answer these questions to assess your fraud risk level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-gray-600">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
