import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");
const KV_KEY = "portfolio-data";

const kv = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  : null;

export interface PortfolioData {
  hero: {
    name: string;
    initials: string;
    profilePicture: string;
    roles: string[];
    bio: string;
    availabilityText: string;
    socialLinks: { github: string; linkedin: string };
  };
  about: {
    bioParas: string[];
    softSkills: { icon: string; title: string; note: string; highlight: boolean }[];
    techSkills: { name: string; pct: number }[];
    currentlyExploring: string[];
    leetcode: { profileUrl: string; statusText: string; description: string };
  };
  projects: {
    num: string;
    type: string;
    title: string;
    desc: string;
    tags: string[];
    link: string;
    github: string;
    highlight: boolean;
  }[];
  experience: {
    period: string;
    role: string;
    company: string;
    desc: string;
    tags: string[];
  }[];
  contact: {
    email: string;
    linkedinUrl: string;
    heading: string;
    description: string;
  };
  footer: {
    copyright: string;
    socialLinks: { github: string; linkedin: string };
  };
}

export async function readData(): Promise<PortfolioData> {
  if (kv) {
    try {
      const data = await kv.get(KV_KEY);
      if (data) {
        if (typeof data === 'string') {
          return JSON.parse(data);
        } else {
          // Data is already an object (possibly from direct Redis manipulation)
          return data as PortfolioData;
        }
      }
    } catch (error) {
      console.warn("Failed to read from Redis:", error);
    }
  }
  // Fallback to local file
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function writeData(data: PortfolioData): Promise<void> {
  if (!kv) {
    throw new Error("Redis not configured");
  }
  const json = JSON.stringify(data, null, 2);
  await kv.set(KV_KEY, json);
}
