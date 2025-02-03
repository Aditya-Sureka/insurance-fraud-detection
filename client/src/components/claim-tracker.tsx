import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const mockClaims = [
  {
    id: 1,
    policyNumber: "POL-2024-001",
    status: "completed",
    steps: [
      {
        title: "Claim Submitted",
        date: "2024-02-01",
        status: "completed",
      },
      {
        title: "Initial Review",
        date: "2024-02-02",
        status: "completed",
      },
      {
        title: "Fraud Check",
        date: "2024-02-02",
        status: "completed",
        details: "No suspicious patterns detected",
      },
      {
        title: "Claim Approved",
        date: "2024-02-03",
        status: "completed",
      },
    ],
  },
  {
    id: 2,
    policyNumber: "POL-2024-002",
    status: "in-progress",
    steps: [
      {
        title: "Claim Submitted",
        date: "2024-02-03",
        status: "completed",
      },
      {
        title: "Initial Review",
        date: "2024-02-03",
        status: "completed",
      },
      {
        title: "Fraud Check",
        date: "2024-02-03",
        status: "in-progress",
        details: "AI analysis in progress",
      },
      {
        title: "Claim Approval",
        status: "pending",
      },
    ],
  },
];

function StepIcon({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    case "in-progress":
      return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />;
    case "warning":
      return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    default:
      return <Clock className="h-6 w-6 text-gray-300" />;
  }
}

export function ClaimTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims Status Tracker</CardTitle>
        <CardDescription>
          Track your claims progress and fraud check status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {mockClaims.map((claim) => (
            <div key={claim.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Claim #{claim.policyNumber}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    claim.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {claim.status === "completed" ? "Completed" : "In Progress"}
                </span>
              </div>

              <div className="relative space-y-6">
                {claim.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <StepIcon status={step.status} />
                      {index < claim.steps.length - 1 && (
                        <div className="w-px h-full bg-gray-200 my-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{step.title}</p>
                      {step.date && (
                        <p className="text-sm text-gray-500">{step.date}</p>
                      )}
                      {step.details && (
                        <p className="text-sm text-gray-600 mt-1">
                          {step.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
