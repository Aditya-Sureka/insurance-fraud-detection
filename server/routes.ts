import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Mock API endpoints for dashboard data
  app.get("/api/fraud-stats", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const stats = {
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
    
    res.json(stats);
  });

  const httpServer = createServer(app);
  return httpServer;
}
