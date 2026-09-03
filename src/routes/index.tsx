import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  Users,
  Bus,
  Building2,
  GraduationCap,
  RefreshCw,
  Map,
  BarChart3,
  Sparkles,
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Megaphone,
  Droplet,
  Zap,
  Sparkle,
  WashingMachine,
  CircleDot,
  Utensils,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusOS — One app for campus life" },
      { name: "description", content: "CampusOS unifies collaboration finder, transport, hostel, mentorship, resources, maps and academic risk tracking into one super-app." },
      { property: "og:title", content: "CampusOS — One app for campus life" },
      { property: "og:description", content: "Collaboration finder, transport, hostel, mentorship, resources, maps and academic risk tracking in one app." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CampusOS,
});

type TabId =
  | "collab"
  | "transport"
  | "hostel"
  | "senior"
  | "resource"
  | "map"
  | "risk";

const TABS: { id: TabId; label: string; icon: typeof Users; emoji: string }[] = [
  { id: "collab", label: "Who Can Help?", icon: Users, emoji: "🧑‍💻" },
  { id: "transport", label: "Smart Transport", icon: Bus, emoji: "🚌" },
  { id: "hostel", label: "Hostel Hub", icon: Building2, emoji: "🏢" },
  { id: "senior", label: "Senior Bridge", icon: GraduationCap, emoji: "📚" },
  { id: "resource", label: "Resource Sharing", icon: RefreshCw, emoji: "🔄" },
  { id: "map", label: "Campus Map & Cleanliness", icon: Map, emoji: "🗺️" },
  { id: "risk", label: "Academic Risk Detector", icon: BarChart3, emoji: "📊" },
];

type Student = {
  id: number;
  name: string;
  branch: string;
  year: string;
  skills: string[];
  availability: string;
  tags: string[];
  email: string;
  phone: string;
  linkedin: string;
  github: string;
};

const STUDENTS: Student[] = [
  {
    id: 1,
    name: "Aarav Mehta",
    branch: "Electronics & Communication",
    year: "3rd Year",
    skills: ["Arduino", "Embedded C", "Robotics", "PCB Design"],
    availability: "Free for Hackathons",
    tags: ["SIH", "Arduino", "Robotics"],
    email: "aarav.mehta@campus.edu",
    phone: "+91 98200 11234",
    linkedin: "in/aaravmehta",
    github: "@aaravmehta",
  },
  {
    id: 2,
    name: "Diya Sharma",
    branch: "Computer Science",
    year: "4th Year",
    skills: ["React", "Node.js", "Web Dev", "GraphQL"],
    availability: "Available weekends",
    tags: ["Web Dev", "SIH"],
    email: "diya.sharma@campus.edu",
    phone: "+91 98765 43210",
    linkedin: "in/diyasharma",
    github: "@diyasharma",
  },
  {
    id: 3,
    name: "Kabir Nair",
    branch: "Mechanical Engineering",
    year: "2nd Year",
    skills: ["ROS", "Robotics", "Python", "CAD"],
    availability: "Free for Hackathons",
    tags: ["Robotics", "ML"],
    email: "kabir.nair@campus.edu",
    phone: "+91 90011 22334",
    linkedin: "in/kabirnair",
    github: "@kabirnair",
  },
  {
    id: 4,
    name: "Ishita Verma",
    branch: "Information Technology",
    year: "3rd Year",
    skills: ["ML", "Python", "PyTorch", "Data Viz"],
    availability: "Open to collaborate",
    tags: ["ML", "Web Dev"],
    email: "ishita.verma@campus.edu",
    phone: "+91 91234 56780",
    linkedin: "in/ishitaverma",
    github: "@ishitaverma",
  },
  {
    id: 5,
    name: "Arjun Reddy",
    branch: "Electronics & Communication",
    year: "1st Year",
    skills: ["Arduino", "Sensors", "IoT", "C++"],
    availability: "Free for Hackathons",
    tags: ["Arduino", "SIH"],
    email: "arjun.reddy@campus.edu",
    phone: "+91 93456 78901",
    linkedin: "in/arjunreddy",
    github: "@arjunreddy",
  },
  {
    id: 6,
    name: "Sara Khan",
    branch: "Computer Science",
    year: "4th Year",
    skills: ["Web Dev", "TypeScript", "Firebase", "UI/UX"],
    availability: "Available evenings",
    tags: ["Web Dev", "SIH", "ML"],
    email: "sara.khan@campus.edu",
    phone: "+91 94567 89012",
    linkedin: "in/sarakhan",
    github: "@sarakhan",
  },
];

const FILTERS = ["All", "SIH", "Arduino", "Web Dev", "Robotics", "ML"];

function CampusOS() {
  const [activeTab, setActiveTab] = useState<TabId>("collab");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [connectStudent, setConnectStudent] = useState<Student | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STUDENTS.filter((s) => {
      const matchesQuery =
        q === "" ||
        [s.name, s.branch, s.year, s.availability, ...s.skills, ...s.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesFilter =
        activeFilter === "All" || s.tags.includes(activeFilter);
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  function handleConnect(s: Student) {
    setConnectStudent(s);
    setMessage("");
    setSent(false);
  }

  function handleSend() {
    setSent(true);
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-foreground">
                CampusOS
              </h1>
              <p className="text-[11px] text-muted-foreground">one app, all of campus</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "sidebar-active text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                <span className="text-base leading-none">{t.emoji}</span>
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate text-left">{t.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="rounded-lg bg-secondary/60 px-3 py-3">
            <p className="text-xs font-semibold text-foreground">Siddhi Amola</p>
            <p className="text-[11px] text-muted-foreground">ECE · 3rd Year</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {activeTab === "collab" ? (
          <CollabFinder
            query={query}
            setQuery={setQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filtered={filtered}
            onConnect={handleConnect}
          />
        ) : (
          <PlaceholderModule tab={TABS.find((t) => t.id === activeTab)!} />
        )}
      </main>

      {/* Connect modal */}
      <Dialog open={!!connectStudent} onOpenChange={(o) => !o && setConnectStudent(null)}>
        <DialogContent className="bg-card border-border text-card-foreground max-w-md">
          {connectStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-bold">
                    {connectStudent.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <div className="text-base">{connectStudent.name}</div>
                    <div className="text-xs font-normal text-muted-foreground">
                      {connectStudent.branch} · {connectStudent.year}
                    </div>
                  </div>
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Contact details and message form for {connectStudent.name}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {connectStudent.skills.map((sk) => (
                      <Badge key={sk} variant="secondary" className="bg-secondary text-secondary-foreground">
                        {sk}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 rounded-lg border border-border p-3 bg-background/40">
                  <ContactRow icon={Mail} value={connectStudent.email} />
                  <ContactRow icon={Phone} value={connectStudent.phone} />
                  <ContactRow icon={Linkedin} value={connectStudent.linkedin} />
                  <ContactRow icon={Github} value={connectStudent.github} />
                </div>

                {sent ? (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm text-emerald">
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent to {connectStudent.name}!
                  </div>
                ) : (
                  <>
                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder={`Hi ${connectStudent.name.split(" ")[0]}, I saw your profile on CampusOS and…`}
                      className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      onClick={handleSend}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                      Send message
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactRow({ icon: Icon, value }: { icon: typeof Mail; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="truncate">{value}</span>
    </div>
  );
}

function CollabFinder({
  query,
  setQuery,
  activeFilter,
  setActiveFilter,
  filtered,
  onConnect,
}: {
  query: string;
  setQuery: (v: string) => void;
  activeFilter: string;
  setActiveFilter: (v: string) => void;
  filtered: Student[];
  onConnect: (s: Student) => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">🧑‍💻 Who Can Help?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Find the right collaborator across campus — search by skill, project, or hackathon.
        </p>
      </header>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='e.g. Need someone who knows Arduino for SIH'
          className="w-full rounded-2xl border border-input bg-card/60 glass-card py-3.5 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>

      {/* Filter tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeFilter === f
                ? "bg-primary text-primary-foreground shadow shadow-primary/30"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "collaborator" : "collaborators"} found
        </p>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
          <p className="text-base font-medium text-foreground">No matches found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search term or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="group rounded-2xl border border-border bg-card/70 glass-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-base font-bold text-primary-foreground">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground truncate">{s.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{s.branch}</p>
                  <p className="text-xs text-muted-foreground">{s.year}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.skills.map((sk) => (
                  <Badge
                    key={sk}
                    variant="secondary"
                    className="bg-primary/15 text-primary border border-primary/20"
                  >
                    {sk}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {s.availability}
              </div>

              <button
                onClick={() => onConnect(s)}
                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlaceholderModule({ tab }: { tab: { label: string; emoji: string; icon: typeof Users } }) {
  const Icon = tab.icon;
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {tab.emoji} {tab.label}
        </h2>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-dashed border-border bg-card/40 p-8 text-center"
          >
            <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-secondary/60 grid place-items-center">
              <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-base font-semibold text-foreground">Module coming next</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {tab.label} is on the roadmap. Stay tuned.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              In development
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
