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
  BookOpen,
  FileText,
  Download,
  QrCode,
  MapPin,
  Lightbulb,
  CalendarCheck,
  Gauge,
  Trash2,
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
        ) : activeTab === "transport" ? (
          <SmartTransport />
        ) : activeTab === "hostel" ? (
          <HostelHub />
        ) : activeTab === "senior" ? (
          <SeniorBridge />
        ) : activeTab === "resource" ? (
          <ResourceSharing />
        ) : activeTab === "map" ? (
          <CampusMap />
        ) : activeTab === "risk" ? (
          <RiskDetector />
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

type CrowdLevel = "low" | "moderate" | "packed";

const SHUTTLES: {
  id: string;
  route: string;
  eta: number;
  crowd: CrowdLevel;
  crowdLabel: string;
}[] = [
  { id: "Bus 3", route: "Main Gate", eta: 7, crowd: "moderate", crowdLabel: "Moderate crowd" },
  { id: "Shuttle A", route: "Metro", eta: 2, crowd: "packed", crowdLabel: "Packed" },
  { id: "Bus 1", route: "Campus Outer", eta: 14, crowd: "low", crowdLabel: "Low crowd" },
];

const STOP_TIMELINE: { stop: string; status: "done" | "current" | "upcoming"; time: string }[] = [
  { stop: "Library Block", status: "done", time: "10:42" },
  { stop: "Sports Complex", status: "done", time: "10:48" },
  { stop: "Main Gate", status: "current", time: "11:02" },
  { stop: "Metro Station", status: "upcoming", time: "11:11" },
  { stop: "Hostel Circle", status: "upcoming", time: "11:24" },
];

function crowdBadge(level: CrowdLevel) {
  switch (level) {
    case "low":
      return "bg-emerald/15 text-emerald border-emerald/30";
    case "moderate":
      return "bg-amber-400/15 text-amber-300 border-amber-400/30";
    case "packed":
      return "bg-destructive/15 text-destructive border-destructive/30";
  }
}

function SmartTransport() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">🚌 Smart Transport</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Live campus shuttle status, route stops, and schedule announcements.
        </p>
      </header>

      {/* Announcement banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3">
        <Megaphone className="h-5 w-5 shrink-0 text-amber-300 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-200">Schedule change notice</p>
          <p className="text-xs text-amber-200/80">
            Shuttle A will skip the Sports Complex stop from 11:30 AM–12:30 PM due to event setup. Use Bus 3 instead.
          </p>
        </div>
      </div>

      {/* Shuttle status cards */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Live shuttle status
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SHUTTLES.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-border bg-card/70 glass-card p-5 transition-all hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-primary/15 grid place-items-center">
                  <Bus className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">{s.id}</span>
              </div>
              <Badge className={cn("border", crowdBadge(s.crowd))}>
                {s.crowdLabel}
              </Badge>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="text-foreground font-medium">→ {s.route}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-foreground">{s.eta}</span>
              <span className="text-sm text-muted-foreground">min ETA</span>
            </div>
          </div>
        ))}
      </div>

      {/* Route stop timeline */}
      <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Route timeline — Bus 3
      </h3>
      <div className="rounded-2xl border border-border bg-card/70 glass-card p-5">
        <ol className="relative space-y-5 before:absolute before:left-[7px] before:top-1 before:bottom-1 before:w-px before:bg-border">
          {STOP_TIMELINE.map((stop) => (
            <li key={stop.stop} className="relative flex items-center gap-3 pl-8">
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2",
                  stop.status === "done" && "bg-secondary border-secondary",
                  stop.status === "current" && "bg-primary border-primary ring-4 ring-primary/20",
                  stop.status === "upcoming" && "bg-background border-border",
                )}
              />
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      stop.status === "current" ? "text-primary" : "text-foreground",
                    )}
                  >
                    {stop.stop}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stop.status === "done"
                      ? "Departed"
                      : stop.status === "current"
                        ? "Arriving now"
                        : "Upcoming"}
                  </p>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{stop.time}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const MESS_MENU: Record<string, { name: string; desc: string }[]> = {
  Breakfast: [
    { name: "Aloo Paratha", desc: "with curd & pickle" },
    { name: "Poha", desc: "garnished with sev" },
    { name: "Boiled Eggs", desc: "2 per student" },
    { name: "Tea / Coffee", desc: "filter coffee" },
  ],
  Lunch: [
    { name: "Rajma Chawal", desc: "Punjabi style" },
    { name: "Phulka", desc: "butter optional" },
    { name: "Paneer Bhurji", desc: "with capsicum" },
    { name: "Salad & Curd", desc: "seasonal" },
    { name: "Gulab Jamun", desc: "dessert" },
  ],
  Snacks: [
    { name: "Veg Sandwich", desc: "grilled" },
    { name: "Samosa", desc: "with chutney" },
    { name: "Masala Chai", desc: "cutting" },
    { name: "Bhel Puri", desc: "Mumbai style" },
  ],
  Dinner: [
    { name: "Chicken Curry", desc: "home style" },
    { name: "Jeera Rice", desc: "with ghee" },
    { name: "Dal Tadka", desc: "yellow dal" },
    { name: "Roti", desc: "unlimited" },
    { name: "Kheer", desc: "dessert" },
  ],
};

const MESS_TABS = ["Breakfast", "Lunch", "Snacks", "Dinner"];

const ISSUE_CATEGORIES = [
  { value: "Water", icon: Droplet },
  { value: "Electricity", icon: Zap },
  { value: "Cleaning", icon: Sparkle },
  { value: "Laundry", icon: WashingMachine },
];

const SEED_COMPLAINTS: { id: number; category: string; detail: string; status: "Open" | "In Progress"; time: string }[] = [
  { id: 101, category: "Water", detail: "No hot water in B-204 since morning", status: "In Progress", time: "2h ago" },
  { id: 100, category: "Cleaning", detail: "Bathroom on 3rd floor not cleaned", status: "Open", time: "5h ago" },
];

function HostelHub() {
  const [messTab, setMessTab] = useState("Breakfast");
  const [category, setCategory] = useState("Water");
  const [detail, setDetail] = useState("");
  const [complaints, setComplaints] = useState(SEED_COMPLAINTS);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = detail.trim();
    if (trimmed === "") return;
    setComplaints([
      { id: Date.now(), category, detail: trimmed.slice(0, 200), status: "Open", time: "Just now" },
      ...complaints,
    ]);
    setDetail("");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">🏢 Hostel Hub</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Mess menu, maintenance alerts, and a quick way to report hostel issues.
        </p>
      </header>

      {/* Alert banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-destructive">⚠️ Notice</p>
          <p className="text-xs text-destructive/80">
            Hostel Block B has experienced 4 water outages this month. Maintenance scheduled.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mess menu */}
        <div className="rounded-2xl border border-border bg-card/70 glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Today's Mess Menu</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {MESS_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setMessTab(t)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                  messTab === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <ul className="space-y-2">
            {(MESS_MENU[messTab] ?? []).map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-background/40 border border-border px-3 py-2.5"
              >
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Report issue form */}
        <div className="rounded-2xl border border-border bg-card/70 glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Report Hostel Issue</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Category
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {ISSUE_CATEGORIES.map((c) => {
                  const Icon = c.icon;
                  const active = category === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCategory(c.value)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                        active
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {c.value}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Describe the issue
              </label>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value.slice(0, 200))}
                rows={3}
                placeholder="e.g. Tap leaking in B-204 washroom"
                className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="mt-1 text-right text-[11px] text-muted-foreground">
                {detail.length}/200
              </p>
            </div>
            <button
              type="submit"
              disabled={detail.trim() === ""}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit complaint
            </button>
          </form>
        </div>
      </div>

      {/* Recent complaints */}
      <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Recent complaints
      </h3>
      <div className="space-y-2">
        {complaints.map((c) => {
          const cat = ISSUE_CATEGORIES.find((i) => i.value === c.category);
          const Icon = cat?.icon ?? CircleDot;
          return (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/70 glass-card px-4 py-3"
            >
              <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/15 grid place-items-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground truncate">{c.detail}</p>
                <p className="text-xs text-muted-foreground">
                  {c.category} · {c.time}
                </p>
              </div>
              <Badge
                className={cn(
                  "border",
                  c.status === "Open"
                    ? "bg-amber-400/15 text-amber-300 border-amber-400/30"
                    : "bg-primary/15 text-primary border-primary/30",
                )}
              >
                {c.status}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- Senior Bridge ----------------

const SENIOR_STEPS: { label: string; options: string[] }[] = [
  { label: "Branch", options: ["CSE", "ECE", "ME"] },
  { label: "Year", options: ["1st", "2nd", "3rd", "4th"] },
  {
    label: "Semester",
    options: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"],
  },
  { label: "Subject", options: ["DBMS", "Operating Systems", "DSA"] },
];

const SENIOR_RESOURCES: {
  id: string;
  title: string;
  desc: string;
  meta: string;
  icon: typeof FileText;
}[] = [
  { id: "pyq", title: "Previous Year Question Papers", desc: "Last 5 years, solved & unsolved sets", meta: "12 PDFs", icon: FileText },
  { id: "prof", title: "Prof Reviews", desc: "Grading patterns, attendance strictness, viva tips", meta: "28 reviews", icon: Users },
  { id: "lab", title: "Lab Manuals", desc: "Step-by-step experiments with viva answers", meta: "8 manuals", icon: BookOpen },
  { id: "notes", title: "Handwritten Notes", desc: "Scanned toppers' notes, unit-wise", meta: "15 scans", icon: FileText },
];

function SeniorBridge() {
  const [selections, setSelections] = useState<(string | null)[]>([null, null, null, null]);
  const [downloaded, setDownloaded] = useState<string | null>(null);

  function select(step: number, value: string) {
    setSelections((prev) => {
      const next = prev.slice(0, step);
      next[step] = value;
      while (next.length < 4) next.push(null);
      return next;
    });
    setDownloaded(null);
  }

  const allSelected = selections.every(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">📚 Senior Bridge</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Notes, papers, and prof intel — passed down from seniors, filtered to your exact semester.
        </p>
      </header>

      {/* Nested filter selector */}
      <div className="rounded-2xl border border-border bg-card/70 glass-card p-5 space-y-4">
        {SENIOR_STEPS.map((step, i) => {
          const locked = i > 0 && !selections[i - 1];
          return (
            <div key={step.label} className={cn(locked && "opacity-40 pointer-events-none")}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Step {i + 1} · {step.label}
                {locked && <span className="ml-2 normal-case font-normal">— select {SENIOR_STEPS[i - 1]!.label} first</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {step.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => select(i, opt)}
                    className={cn(
                      "rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all",
                      selections[i] === opt
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resources */}
      <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {allSelected
          ? `Resources · ${selections[0]} · ${selections[1]} Year · ${selections[2]} · ${selections[3]}`
          : "Resources — complete all 4 steps above"}
      </h3>
      {!allSelected ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
          <GraduationCap className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Pick your Branch, Year, Semester and Subject to unlock senior-shared material.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SENIOR_RESOURCES.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.id} className="rounded-2xl border border-border bg-card/70 glass-card p-5 transition-all hover:border-primary/40">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/15 grid place-items-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground">{r.title}</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
                    <p className="mt-1 text-[11px] text-emerald">{r.meta}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDownloaded(r.id)}
                  className={cn(
                    "mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                    downloaded === r.id
                      ? "bg-emerald/15 text-emerald border border-emerald/30"
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  {downloaded === r.id ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Downloaded
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" /> Download / View
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------- Resource Sharing ----------------

const EQUIPMENT: { id: string; name: string; owner: string; dept: string; available: boolean }[] = [
  { id: "hdmi", name: "HDMI Cable", owner: "Rohan Patil", dept: "CSE", available: true },
  { id: "draw", name: "Engineering Drawing Instruments", owner: "Meera Joshi", dept: "ME", available: true },
  { id: "dmm", name: "Digital Multimeter", owner: "Aditya Rao", dept: "ECE", available: true },
  { id: "arduino", name: "Arduino Uno Kit", owner: "Sneha Kulkarni", dept: "ECE", available: true },
];

function ResourceSharing() {
  const [borrowItem, setBorrowItem] = useState<(typeof EQUIPMENT)[number] | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">🔄 Resource Sharing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Peer-to-peer equipment borrowing — request it, scan the QR, return it.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EQUIPMENT.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card/70 glass-card p-5 transition-all hover:border-primary/40">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-primary/15 grid place-items-center">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.owner} · {item.dept} Dept
                  </p>
                </div>
              </div>
              {item.available && (
                <Badge className="border bg-emerald/15 text-emerald border-emerald/30">Available</Badge>
              )}
            </div>
            <button
              onClick={() => setBorrowItem(item)}
              className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request to Borrow
            </button>
          </div>
        ))}
      </div>

      <Dialog open={!!borrowItem} onOpenChange={(o) => !o && setBorrowItem(null)}>
        <DialogContent className="bg-card border-border text-card-foreground max-w-sm">
          {borrowItem && (
            <>
              <DialogHeader>
                <DialogTitle>Pickup instructions</DialogTitle>
                <DialogDescription>
                  {borrowItem.name} · from {borrowItem.owner} ({borrowItem.dept})
                </DialogDescription>
              </DialogHeader>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Meet the owner at the Innovation Lab, 2nd floor.</li>
                <li>Show this QR check-out code at pickup.</li>
                <li>Return within 48 hours to keep your borrow score.</li>
              </ol>
              <div className="mx-auto flex flex-col items-center gap-2 rounded-xl border border-border bg-background/60 p-5">
                <QrCode className="h-28 w-28 text-foreground" strokeWidth={1.2} />
                <span className="font-mono text-xs text-muted-foreground tracking-widest">
                  CMP-CHK-{borrowItem.id.toUpperCase()}-7291
                </span>
              </div>
              <button
                onClick={() => setBorrowItem(null)}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Got it
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------- Campus Map & Cleanliness ----------------

const ZONES: { id: string; name: string; crowd: "High" | "Moderate" | "Low"; score: number; note: string }[] = [
  { id: "cse", name: "CSE Block", crowd: "Moderate", score: 88, note: "Labs busy, corridors tidy" },
  { id: "lib", name: "Central Library", crowd: "Low", score: 94, note: "Quiet floors available" },
  { id: "gym", name: "Campus Gym", crowd: "High", score: 71, note: "Peak hours 5–7 PM" },
  { id: "food", name: "Food Court", crowd: "Moderate", score: 82, note: "Lunch rush expected 1 PM" },
];

const GRIEVANCE_TYPES = ["Overflowing Bins", "Broken Projector", "Potholes", "Water Leakage"];

function crowdColor(crowd: string) {
  if (crowd === "High") return "bg-destructive/15 text-destructive border-destructive/30";
  if (crowd === "Moderate") return "bg-amber-400/15 text-amber-300 border-amber-400/30";
  return "bg-emerald/15 text-emerald border-emerald/30";
}

function CampusMap() {
  const [zone, setZone] = useState(ZONES[3]!);
  const [grievanceOpen, setGrievanceOpen] = useState(false);
  const [grievance, setGrievance] = useState<string | null>(null);
  const [reported, setReported] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">🗺️ Campus Map & Cleanliness</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Live crowd levels and cleanliness scores across campus zones.
        </p>
      </header>

      {/* Zone selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {ZONES.map((z) => (
          <button
            key={z.id}
            onClick={() => setZone(z)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-all",
              zone.id === z.id
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                : "border-border bg-card/70 glass-card hover:border-primary/40",
            )}
          >
            <MapPin className={cn("h-5 w-5 mb-2", zone.id === z.id ? "text-primary" : "text-muted-foreground")} />
            <p className="text-sm font-semibold text-foreground">{z.name}</p>
            <Badge className={cn("mt-2 border", crowdColor(z.crowd))}>{z.crowd}</Badge>
          </button>
        ))}
      </div>

      {/* Zone detail */}
      <div className="rounded-2xl border border-border bg-card/70 glass-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">{zone.name}</h3>
            <p className="text-sm text-muted-foreground">{zone.note}</p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Crowd level:</span>
              <Badge className={cn("border", crowdColor(zone.crowd))}>{zone.crowd}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-emerald" />
              <span className="text-3xl font-bold text-foreground">{zone.score}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <p className="text-xs text-muted-foreground">Cleanliness score</p>
          </div>
        </div>
        <div className="mt-4 h-2.5 rounded-full bg-secondary/60 overflow-hidden">
          <div
            className={cn("h-full rounded-full", zone.score >= 85 ? "bg-emerald" : zone.score >= 75 ? "bg-primary" : "bg-amber-400")}
            style={{ width: `${zone.score}%` }}
          />
        </div>
        <button
          onClick={() => {
            setGrievanceOpen(true);
            setGrievance(null);
            setReported(false);
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <AlertTriangle className="h-4 w-4" />
          Report Campus Grievance
        </button>
      </div>

      <Dialog open={grievanceOpen} onOpenChange={setGrievanceOpen}>
        <DialogContent className="bg-card border-border text-card-foreground max-w-sm">
          <DialogHeader>
            <DialogTitle>Report a grievance — {zone.name}</DialogTitle>
            <DialogDescription>Pick an issue type and we'll route it to campus maintenance.</DialogDescription>
          </DialogHeader>
          {reported ? (
            <div className="flex items-center gap-2 rounded-lg border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm text-emerald">
              <CheckCircle2 className="h-4 w-4" />
              {grievance} reported at {zone.name}. Ticket created!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {GRIEVANCE_TYPES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGrievance(g)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium text-left transition-all",
                    grievance === g
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Trash2 className="h-4 w-4 shrink-0" />
                  {g}
                </button>
              ))}
              <button
                disabled={!grievance}
                onClick={() => setReported(true)}
                className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit report
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------- Academic Risk Detector ----------------

function RiskDetector() {
  const [booked, setBooked] = useState(false);

  const metrics = [
    { label: "Attendance", value: "68%", pct: 68, danger: true, hint: "Below 75% threshold" },
    { label: "Internal Marks", value: "14/30", pct: 47, danger: true, hint: "DBMS mid-sem" },
    { label: "Assignment Completion", value: "72%", pct: 72, danger: false, hint: "2 pending submissions" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">📊 Academic Risk Detector</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Early-warning analysis of attendance, marks, and submissions.
        </p>
      </header>

      {/* Warning banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-4">
        <AlertTriangle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-destructive">⚠️ Attention Required</p>
          <p className="text-xs text-destructive/80">
            Current attendance &amp; internal pattern flags risk in DBMS (Database Management Systems).
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-card/70 glass-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.label}</p>
              <BarChart3 className={cn("h-4 w-4", m.danger ? "text-destructive" : "text-emerald")} />
            </div>
            <p className={cn("mt-2 text-3xl font-bold", m.danger ? "text-destructive" : "text-foreground")}>
              {m.value}
            </p>
            <div className="mt-3 h-2 rounded-full bg-secondary/60 overflow-hidden">
              <div
                className={cn("h-full rounded-full", m.danger ? "bg-destructive" : "bg-emerald")}
                style={{ width: `${m.pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{m.hint}</p>
          </div>
        ))}
      </div>

      {/* Advisor note + action */}
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Advisor recommendation</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Attend the next 4 DBMS lectures consecutively to cross the 75% attendance bar, and submit the
              pending ER-diagram assignment by Friday. A peer tutor from 4th year can revise Normalization
              and Indexing with you before the end-sem.
            </p>
            <button
              onClick={() => setBooked(true)}
              disabled={booked}
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                booked
                  ? "bg-emerald/15 text-emerald border border-emerald/30 cursor-default"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              <CalendarCheck className="h-4 w-4" />
              {booked ? "Peer Tutor booked — Sat 11 AM, Library Room 3" : "Book Peer Tutor"}
            </button>
          </div>
        </div>
      </div>
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
