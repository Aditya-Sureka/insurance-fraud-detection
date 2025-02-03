import { User, InsertUser, Claim, InsertClaim } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Claims operations
  getClaim(id: number): Promise<Claim | undefined>;
  getClaimsByUserId(userId: number): Promise<Claim[]>;
  createClaim(userId: number, claim: InsertClaim): Promise<Claim>;
  updateClaimStatus(id: number, status: string): Promise<Claim | undefined>;
  
  // Session store for auth
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private claims: Map<number, Claim>;
  private currentUserId: number;
  private currentClaimId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.claims = new Map();
    this.currentUserId = 1;
    this.currentClaimId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      id, 
      ...insertUser,
      role: 'user' // Default role for new users
    };
    this.users.set(id, user);
    return user;
  }

  // Claims operations
  async getClaim(id: number): Promise<Claim | undefined> {
    return this.claims.get(id);
  }

  async getClaimsByUserId(userId: number): Promise<Claim[]> {
    return Array.from(this.claims.values()).filter(
      (claim) => claim.userId === userId,
    );
  }

  async createClaim(userId: number, insertClaim: InsertClaim): Promise<Claim> {
    const id = this.currentClaimId++;
    const claim: Claim = {
      id,
      userId,
      ...insertClaim,
      status: 'pending',
      submittedAt: new Date()
    };
    this.claims.set(id, claim);
    return claim;
  }

  async updateClaimStatus(id: number, status: string): Promise<Claim | undefined> {
    const claim = this.claims.get(id);
    if (!claim) return undefined;

    const updatedClaim = { ...claim, status };
    this.claims.set(id, updatedClaim);
    return updatedClaim;
  }
}

// Create and export a single instance of the storage
export const storage = new MemStorage();
