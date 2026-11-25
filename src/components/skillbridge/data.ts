export type Skill = "Python" | "SQL/MySQL" | "Web Dev" | "Data Analysis";
export type Status = "open" | "in_progress" | "completed";
export interface Task {
  id: string; company: string; title: string; skill: Skill; stack: string[];
  hours: number; difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string; location: string; status: Status;
  repo?: string; completedAt?: string; credentialId?: string;
}
export const SKILLS: ("All" | Skill)[] = ["All", "Python", "SQL/MySQL", "Web Dev", "Data Analysis"];

export const initialTasks: Task[] = [
  { id: "t1", company: "Savanna Logistics", title: "Build a Sales CSV Parser in Python", skill: "Python", stack: ["Python", "pandas", "CLI"], hours: 6, difficulty: "Beginner", location: "Mombasa", description: "Parse weekly sales CSV exports and output a clean regional summary report.", status: "open" },
  { id: "t2", company: "Nairobi Fresh Grocers", title: "Optimize Inventory MySQL Queries", skill: "SQL/MySQL", stack: ["MySQL", "Indexing", "EXPLAIN"], hours: 8, difficulty: "Intermediate", location: "Nairobi", description: "Speed up slow stock-level queries powering the store's restock dashboard.", status: "open" },
  { id: "t3", company: "Pwani Tech Hub", title: "Create a Responsive Event Landing Page", skill: "Web Dev", stack: ["HTML", "CSS", "JavaScript"], hours: 5, difficulty: "Beginner", location: "Kilifi", description: "A mobile-first landing page with schedule and RSVP section for a hackathon.", status: "open" },
  { id: "t4", company: "Mama Mboga Co-op", title: "Analyze Seasonal Produce Prices", skill: "Data Analysis", stack: ["Python", "Matplotlib", "Excel"], hours: 7, difficulty: "Intermediate", location: "Kisumu", description: "Chart 12 months of produce prices and highlight the best buying windows.", status: "open" },
  { id: "t5", company: "Rift Valley Clinics", title: "Design a Patient Appointments Schema", skill: "SQL/MySQL", stack: ["MySQL", "ERD", "Normalization"], hours: 6, difficulty: "Advanced", location: "Nakuru", description: "Model appointments, doctors and patients with sensible constraints.", status: "open" },
  { id: "t6", company: "Lake Basin Crafts", title: "Add a Product Gallery to Shop Site", skill: "Web Dev", stack: ["React", "Tailwind"], hours: 4, difficulty: "Beginner", location: "Kisumu", description: "Build a filterable gallery of handmade products for the cooperative's site.", status: "open" },
  { id: "c1", company: "Kibera Solar Kiosk", title: "Automate Daily Sales Reports", skill: "Python", stack: ["Python", "openpyxl"], hours: 5, difficulty: "Beginner", location: "Nairobi", description: "Script that emails a daily sales summary.", status: "completed", repo: "https://github.com/aminaochieng/solar-reports", completedAt: "2026-10-14", credentialId: "SB-2026-612" },
  { id: "c2", company: "Eldoret Agro Supplies", title: "Clean Supplier Database Records", skill: "SQL/MySQL", stack: ["MySQL", "Data Cleaning"], hours: 6, difficulty: "Intermediate", location: "Eldoret", description: "Deduplicate and normalize supplier tables.", status: "completed", repo: "https://github.com/aminaochieng/agro-db-clean", completedAt: "2026-11-02", credentialId: "SB-2026-741" },
];

export const talent = [
  { name: "Brian Mwangi", track: "PLP Full-Stack", skills: ["React", "Node", "MySQL"], verified: 9, rating: 4.9 },
  { name: "Amina Ochieng", track: "PLP Software Engineering", skills: ["Python", "MySQL", "Git"], verified: 2, rating: 4.8 },
  { name: "Faith Wanjiru", track: "PLP Data Analytics", skills: ["Python", "Pandas", "Power BI"], verified: 7, rating: 4.8 },
  { name: "Kevin Otieno", track: "PLP Software Engineering", skills: ["SQL", "Django"], verified: 6, rating: 4.7 },
  { name: "Grace Achieng", track: "PLP Web Dev", skills: ["HTML", "CSS", "JavaScript"], verified: 5, rating: 4.6 },
];
