import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Briefcase, Clock, Code2, GraduationCap, LayoutGrid, Plus, Search, ShieldCheck, Signal, Trophy, User, Building2, Globe2, Github, CheckCircle2 } from "lucide-react";
import { initialTasks, SKILLS, talent, type Skill, type Task } from "./data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

type Role = "student" | "partner";
type Tab = "market" | "workspace" | "partner";

const btn = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50";
const btnAction = `${btn} bg-action text-action-foreground hover:opacity-90 shadow-sm`;
const card = "rounded-2xl border border-border bg-card p-5 shadow-sm";
const input = "w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

export function SkillBridge() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [role, setRole] = useState<Role>("student");
  const [tab, setTab] = useState<Tab>("market");
  const [submitting, setSubmitting] = useState<Task | null>(null);

  const switchRole = (r: Role) => { setRole(r); setTab(r === "partner" ? "partner" : "market"); };
  const accept = (id: string) => {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: "in_progress" } : t)));
    toast.success("Task added to your workspace");
  };
  const complete = (id: string, repo: string) => {
    const credentialId = `SB-2026-${Math.floor(100 + Math.random() * 900)}`;
    setTasks((ts) => ts.map((t) => t.id === id ? { ...t, status: "completed", repo, credentialId, completedAt: new Date().toISOString().slice(0, 10) } : t));
    setSubmitting(null);
    toast.success(`Verified! Credential ${credentialId} issued`);
  };
  const post = (t: Task) => { setTasks((ts) => [t, ...ts]); toast.success("Task is live in the marketplace"); setTab("market"); };

  const tabs: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { id: "market", label: "Marketplace", icon: LayoutGrid },
    { id: "workspace", label: "My Workspace", icon: GraduationCap },
    { id: "partner", label: "Partner Portal", icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Code2 className="h-5 w-5" /></div>
            <span className="font-display text-xl font-bold">SkillBridge</span>
            <span className="hidden items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success sm:inline-flex"><Globe2 className="h-3.5 w-3.5" />SDGs 8 • 10 • 17</span>
          </div>
          <div className="flex rounded-full border border-border bg-muted p-1 text-xs font-semibold sm:text-sm">
            {(["student", "partner"] as Role[]).map((r) => (
              <button key={r} onClick={() => switchRole(r)} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all ${role === r ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}>
                {r === "student" ? <User className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
                {r === "student" ? "Student Developer View" : "Hiring Partner View"}
              </button>
            ))}
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
          {tabs.map(({ id, label, icon: I }) => (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium ${tab === id ? "border-action text-action" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <I className="h-4 w-4" />{label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "market" && <Marketplace tasks={tasks} role={role} onAccept={accept} />}
        {tab === "workspace" && <Workspace tasks={tasks} onSubmit={setSubmitting} goMarket={() => setTab("market")} />}
        {tab === "partner" && <Partner onPost={post} />}
      </main>

      <SubmitDialog task={submitting} onClose={() => setSubmitting(null)} onSubmit={complete} />
    </div>
  );
}

function Marketplace({ tasks, role, onAccept }: { tasks: Task[]; role: Role; onAccept: (id: string) => void }) {
  const [skill, setSkill] = useState<(typeof SKILLS)[number]>("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => tasks.filter((t) => t.status !== "completed" && (skill === "All" || t.skill === skill) &&
    `${t.title} ${t.company} ${t.stack.join(" ")}`.toLowerCase().includes(q.toLowerCase())), [tasks, skill, q]);
  return (
    <div className="space-y-6">
      <section className="bg-hero rounded-3xl p-6 text-primary-foreground sm:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest opacity-70">Micro-Task Marketplace</p>
        <h1 className="max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">Bridge the local experience gap.</h1>
        <p className="mt-2 max-w-2xl opacity-80">Complete real micro-tasks from local businesses and build a verified portfolio.</p>
      </section>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <button key={s} onClick={() => setSkill(s)} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${skill === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-action hover:text-action"}`}>{s}</button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input className={`${input} pl-9`} placeholder="Search tasks, companies, tech..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((t) => (
          <article key={t.id} className={`${card} flex flex-col gap-3 transition-shadow hover:shadow-md`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Building2 className="h-4 w-4" /><span className="font-semibold text-foreground">{t.company}</span> · {t.location}</div>
              {t.status === "in_progress" && <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">In Progress</span>}
            </div>
            <h3 className="text-lg font-semibold leading-snug">{t.title}</h3>
            <p className="text-sm text-muted-foreground">{t.description}</p>
            <div className="flex flex-wrap gap-1.5">{t.stack.map((s) => <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{s}</span>)}</div>
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{t.hours} hrs</span>
                <span className="flex items-center gap-1"><Signal className="h-4 w-4" />{t.difficulty}</span>
              </div>
              {role === "student" ? (
                <button disabled={t.status !== "open"} onClick={() => onAccept(t.id)} className={btnAction}>{t.status === "open" ? "Accept & Start Task" : "Accepted"}</button>
              ) : <span className="text-xs text-muted-foreground">Partner preview</span>}
            </div>
          </article>
        ))}
        {list.length === 0 && <p className="col-span-full py-12 text-center text-muted-foreground">No tasks match your filters.</p>}
      </div>
    </div>
  );
}

function Workspace({ tasks, onSubmit, goMarket }: { tasks: Task[]; onSubmit: (t: Task) => void; goMarket: () => void }) {
  const active = tasks.filter((t) => t.status === "in_progress");
  const done = tasks.filter((t) => t.status === "completed");
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <aside className={`${card} h-fit space-y-4`}>
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-hero text-lg font-bold text-primary-foreground">AO</div>
          <div><h2 className="font-semibold">Amina Ochieng</h2><p className="text-sm text-muted-foreground">PLP Software Engineering Track</p></div>
        </div>
        <div className="flex flex-wrap gap-1.5">{["Python", "MySQL", "Git"].map((s) => <span key={s} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{s}</span>)}</div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-muted p-3"><p className="text-2xl font-bold">{active.length}</p><p className="text-xs text-muted-foreground">Active</p></div>
          <div className="rounded-xl bg-success/10 p-3"><p className="text-2xl font-bold text-success">{done.length}</p><p className="text-xs text-muted-foreground">Verified</p></div>
        </div>
      </aside>
      <div className="space-y-8 lg:col-span-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold">Active Tasks</h2>
          {active.length === 0 ? (
            <div className={`${card} text-center text-sm text-muted-foreground`}>No active tasks yet. <button onClick={goMarket} className="font-semibold text-action">Browse the marketplace →</button></div>
          ) : <div className="space-y-3">{active.map((t) => (
            <div key={t.id} className={`${card} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
              <div><p className="text-sm text-muted-foreground">{t.company} · {t.hours} hrs</p><p className="font-semibold">{t.title}</p></div>
              <button onClick={() => onSubmit(t)} className={btnAction}><Github className="h-4 w-4" />Mark Complete & Submit Repo Link</button>
            </div>))}</div>}
        </section>
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><ShieldCheck className="h-5 w-5 text-success" />Verified Experience Ledger</h2>
          <div className="grid gap-4 sm:grid-cols-2">{done.map((t) => (
            <div key={t.id} className={`${card} space-y-3 border-success/30`}>
              <span className="inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-xs font-semibold text-success-foreground"><BadgeCheck className="h-3.5 w-3.5" />Verified by Partner</span>
              <div><p className="font-semibold">{t.title}</p><p className="text-sm text-muted-foreground">{t.company}</p></div>
              <div className="flex flex-wrap gap-1.5">{t.stack.map((s) => <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs">{s}</span>)}</div>
              <div className="flex justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span>Completed {t.completedAt}</span><span className="font-mono font-semibold text-foreground">{t.credentialId}</span>
              </div>
              {t.repo && <a href={t.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1 truncate text-xs text-action"><Github className="h-3.5 w-3.5" />{t.repo.replace("https://", "")}</a>}
            </div>))}</div>
        </section>
      </div>
    </div>
  );
}

function SubmitDialog({ task, onClose, onSubmit }: { task: Task | null; onClose: () => void; onSubmit: (id: string, repo: string) => void }) {
  const [repo, setRepo] = useState("https://github.com/aminaochieng/");
  return (
    <Dialog open={!!task} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Submit your work</DialogTitle><DialogDescription>{task?.title} — {task?.company}</DialogDescription></DialogHeader>
        <input className={input} value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="https://github.com/you/repo" />
        <DialogFooter><button className={btnAction} disabled={!repo.startsWith("http")} onClick={() => task && onSubmit(task.id, repo)}><CheckCircle2 className="h-4 w-4" />Submit for verification</button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Partner({ onPost }: { onPost: (t: Task) => void }) {
  const [f, setF] = useState({ title: "", company: "", skill: "Python" as Skill, hours: 5, description: "" });
  const ok = f.title && f.company && f.description && f.hours > 0;
  const stackFor: Record<Skill, string[]> = { Python: ["Python"], "SQL/MySQL": ["MySQL"], "Web Dev": ["HTML", "CSS", "JavaScript"], "Data Analysis": ["Python", "Excel"] };
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!ok) return;
    onPost({ id: crypto.randomUUID(), ...f, stack: stackFor[f.skill], difficulty: f.hours > 7 ? "Intermediate" : "Beginner", location: "Local", status: "open" });
    setF({ title: "", company: "", skill: "Python", hours: 5, description: "" });
  };
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <form onSubmit={submit} className={`${card} space-y-4 lg:col-span-2`}>
        <h2 className="flex items-center gap-2 text-lg font-semibold"><Plus className="h-5 w-5 text-action" />Post a Micro-Task</h2>
        <label className="block space-y-1 text-sm font-medium">Task Title<input className={input} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="e.g. Build a booking form" /></label>
        <label className="block space-y-1 text-sm font-medium">Company Name<input className={input} value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} placeholder="e.g. Malindi Tours" /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1 text-sm font-medium">Required Skill<select className={input} value={f.skill} onChange={(e) => setF({ ...f, skill: e.target.value as Skill })}>{SKILLS.slice(1).map((s) => <option key={s}>{s}</option>)}</select></label>
          <label className="block space-y-1 text-sm font-medium">Est. Hours<input type="number" min={1} className={input} value={f.hours} onChange={(e) => setF({ ...f, hours: Number(e.target.value) })} /></label>
        </div>
        <label className="block space-y-1 text-sm font-medium">Description<textarea rows={3} className={input} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} placeholder="What should the student deliver?" /></label>
        <button type="submit" disabled={!ok} className={`${btnAction} w-full`}>Publish to Marketplace</button>
      </form>
      <section className={`${card} overflow-x-auto lg:col-span-3`}>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Trophy className="h-5 w-5 text-success" />Talent Scout</h2>
        <table className="w-full min-w-[520px] text-sm">
          <thead><tr className="border-b border-border text-left text-xs uppercase text-muted-foreground"><th className="pb-2">#</th><th className="pb-2">Developer</th><th className="pb-2">Skills</th><th className="pb-2">Verified</th><th></th></tr></thead>
          <tbody>{[...talent].sort((a, b) => b.verified - a.verified).map((s, i) => (
            <tr key={s.name} className="border-b border-border last:border-0">
              <td className="py-3 font-bold text-muted-foreground">{i + 1}</td>
              <td className="py-3"><p className="font-semibold">{s.name}</p><p className="text-xs text-muted-foreground">{s.track}</p></td>
              <td className="py-3"><div className="flex flex-wrap gap-1">{s.skills.map((k) => <span key={k} className="rounded bg-muted px-1.5 py-0.5 text-xs">{k}</span>)}</div></td>
              <td className="py-3"><span className="inline-flex items-center gap-1 font-semibold text-success"><BadgeCheck className="h-4 w-4" />{s.verified}</span></td>
              <td className="py-3 text-right"><button onClick={() => toast.success(`Interview request sent to ${s.name}`)} className={`${btn} border border-border bg-card px-3 py-1.5 text-xs hover:border-action hover:text-action`}>Request Interview</button></td>
            </tr>))}</tbody>
        </table>
      </section>
    </div>
  );
}
