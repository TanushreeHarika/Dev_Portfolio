import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

export interface PortfolioData {
  hero: {
    name: string;
    initials: string;
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

export function readData(): PortfolioData {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function writeData(data: PortfolioData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}
