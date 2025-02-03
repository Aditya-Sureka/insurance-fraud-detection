import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "@/hooks/use-auth";
import { RiskAssessment } from "@/components/risk-assessment";
import { FraudSimulator } from "@/components/fraud-simulator";
import { ClaimTracker } from "@/components/claim-tracker";
import { PreventionTips } from "@/components/prevention-tips";

const fraudStats = {
  monthlyData: [
    { month: "Jan", cases: 45 },
    { month: "Feb", cases: 52 },
    { month: "Mar", cases: 48 },
    { month: "Apr", cases: 61 },
    { month: "May", cases: 55 },
    { month: "Jun", cases: 67 },
  ],
  caseTypes: [
    { name: "Identity Theft", value: 35 },
    { name: "False Claims", value: 45 },
    { name: "Policy Fraud", value: 20 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome back, {user?.username}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Fraud Cases Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fraudStats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#005BAA"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Types of Fraud</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fraudStats.caseTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {fraudStats.caseTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RiskAssessment />
        <FraudSimulator />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClaimTracker />
        <PreventionTips />
      </div>
    </div>
  );
}