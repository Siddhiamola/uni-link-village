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
  Bell,
  Award,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusOS — Centralized Student Operations, Grievance Redressal & Peer Services" },
      { name: "description", content: "CampusOS — Centralized Student Operations, Grievance Redressal & Peer Services." },
      { property: "og:title", content: "CampusOS — Centralized Student Operations" },
      { property: "og:description", content: "Centralized Student Operations, Grievance Redressal & Peer Services." },
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

const TABS: { id: TabId; label: string; icon: typeof Users }[] = [
  { id: "collab", label: "Who Can Help?", icon: Users },
  { id: "transport", label: "Smart Transport", icon: Bus },
  { id: "hostel", label: "Hostel Hub", icon: Building2 },
  { id: "senior", label: "Senior Bridge", icon: GraduationCap },
  { id: "resource", label: "Resource Sharing", icon: RefreshCw },
  { id: "map", label: "Campus Map & Cleanliness", icon: Map },
  { id: "risk", label: "Academic Risk Detector", icon: BarChart3 },
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
  honor?: string;
};

const STUDENTS: Student[] = [
  {
    id: 1,
    name: "Rohan Verma",
    branch: "B.Tech CSE",
    year: "3rd Year",
    skills: ["Arduino", "Embedded C", "Robotics", "PCB Design"],
    availability: "Free for Hackathons",
    tags: ["SIH", "Arduino", "Robotics"],
    email: "rohan.verma@campus.edu",
    phone: "+91 98200 11234",
    linkedin: "in/rohanverma",
    github: "@rohanverma",
    honor: "SIH Finalist 2025",
  },
  {
    id: 2,
    name: "Ananya Iyer",
    branch: "B.Tech ECE",
    year: "Final Year",
    skills: ["React", "Node.js", "Web Dev", "GraphQL"],
    availability: "Available weekends",
    tags: ["Web Dev", "SIH"],
    email: "ananya.iyer@campus.edu",
    phone: "+91 98765 43210",
    linkedin: "in/ananyaiyer",
    github: "@ananyaiyer",
    honor: "SIH Finalist 2025",
  },
  {
    id: 3,
    name: "Kartik Sharma",
    branch: "B.Tech Mechanical",
    year: "2nd Year",
    skills: ["ROS", "Robotics", "Python", "CAD"],
    availability: "Free for Hackathons",
    tags: ["Robotics", "ML"],
    email: "kartik.sharma@campus.edu",
    phone: "+91 90011 22334",
    linkedin: "in/kartiksharma",
    github: "@kartiksharma",
  },
  {
    id: 4,
    name: "Priya Nair",
    branch: "B.Tech IT",
    year: "3rd Year",
    skills: ["ML", "Python", "PyTorch", "Data Viz"],
    availability: "Open to collaborate",
    tags: ["ML", "Web Dev"],
    email: "priya.nair@campus.edu",
    phone: "+91 91234 56780",
    linkedin: "in/priyanair",
    github: "@priyanair",
  },
  {
    id: 5,
    name: "Aditya Reddy",
    branch: "B.Tech ECE",
    year: "1st Year",
    skills: ["Arduino", "Sensors", "IoT", "C++"],
    availability: "Free for Hackathons",
    tags: ["Arduino", "SIH"],
    email: "aditya.reddy@campus.edu",
    phone: "+91 93456 78901",
    linkedin: "in/adityareddy",
    github: "@adityareddy",
  },
  {
    id: 6,
    name: "Sneha Kulkarni",
    branch: "B.Tech CSE",
    year: "Final Year",
    skills: ["Web Dev", "TypeScript", "Firebase", "UI/UX"],
    availability: "Available evenings",
    tags: ["Web Dev", "SIH", "ML"],
    email: "sneha.kulkarni@campus.edu",
    phone: "+91 94567 89012",
    linkedin: "in/snehakulkarni",
    github: "@snehakulkarni",
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
            <div className="h-9 w-9 rounded-lg bg-primary grid place-items-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-foreground">
                CampusOS
              </h1>
              <p className="text-[11px] text-muted-foreground">Student Portal</p>
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
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "sidebar-active"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate text-left">{t.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="rounded-lg border border-border bg-secondary px-3 py-3">
            <p className="text-xs font-semibold text-foreground">Siddhi Amola</p>
            <p className="text-[11px] text-muted-foreground">ECE · 3rd Year</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top portal navbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-3">
          <div>
            <h1 className="text-sm font-bold tracking-tight text-foreground">
              CampusOS <span className="text-muted-foreground font-normal">— Centralized Student Operations, Grievance Redressal &amp; Peer Services</span>
            </h1>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              Aryabhatta Academic Complex · North Campus
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="border border-border bg-emerald-50 text-emerald-700 hidden sm:inline-flex">
              Semester: Odd 2025–26
            </Badge>
            <button
              aria-label="Notifications"
              className="relative h-9 w-9 rounded-lg border border-border bg-card grid place-items-center text-muted-foreground transition-colors hover:text-foreground hover:border-primary"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground ring-2 ring-card">
                2
              </span>
            </button>
          </div>
        </header>

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

      <footer className="border-t border-border bg-card px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 CampusOS — Centralized Campus Operations System
        </p>
      </footer>

      {/* Connect modal */}
      <Dialog open={!!connectStudent} onOpenChange={(o) => !o && setConnectStudent(null)}>
        <DialogContent className="bg-card border-border text-card-foreground max-w-md">
          {connectStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="h-10 w-10 rounded-full bg-primary grid place-items-center text-primary-foreground font-bold">
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

                <div className="space-y-1.5 rounded-lg border border-border p-3 bg-secondary/50">
                  <ContactRow icon={Mail} value={connectStudent.email} />
                  <ContactRow icon={Phone} value={connectStudent.phone} />
                  <ContactRow icon={Linkedin} value={connectStudent.linkedin} />
                  <ContactRow icon={Github} value={connectStudent.github} />
                </div>

                {sent ? (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent to {connectStudent.name}.
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
                      className="w-full resize-none rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Who Can Help?</h2>
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
          placeholder="e.g. Need someone who knows Arduino for SIH"
          className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filter tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
              activeFilter === f
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-secondary",
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
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="text-base font-medium text-foreground">No matches found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search term or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 shrink-0 rounded-full bg-primary grid place-items-center text-base font-bold text-primary-foreground">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground truncate">{s.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{s.branch}</p>
                  <p className="text-xs text-muted-foreground">{s.year}</p>
                </div>
              </div>

              {s.honor && (
                <div className="mt-3">
                  <Badge className="border border-amber-200 bg-amber-50 text-amber-700 gap-1">
                    <Award className="h-3 w-3" />
                    {s.honor}
                  </Badge>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.skills.map((sk) => (
                  <Badge
                    key={sk}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {sk}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
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
  { id: "Bus 3", route: "Main Gate", eta: 7, crowd: "moderate", crowdLabel: "Moderate" },
  { id: "Shuttle A", route: "Metro Station", eta: 2, crowd: "packed", crowdLabel: "Packed" },
  { id: "Bus 1", route: "Campus Outer", eta: 14, crowd: "low", crowdLabel: "Low" },
];

const STOP_TIMELINE: { stop: string; status: "done" | "current" | "upcoming"; time: string }[] = [
  { stop: "Central Library Ground Floor", status: "done", time: "10:42" },
  { stop: "Sports Complex", status: "done", time: "10:48" },
  { stop: "Main Gate", status: "current", time: "11:02" },
  { stop: "Metro Station", status: "upcoming", time: "11:11" },
  { stop: "Hostel Block 4 (Kaveri)", status: "upcoming", time: "11:24" },
];

function crowdBadge(level: CrowdLevel) {
  switch (level) {
    case "low":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "moderate":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "packed":
      return "bg-red-50 text-red-700 border-red-200";
  }
}

function SmartTransport() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Smart Transport</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Live campus shuttle status, route stops, and schedule announcements.
        </p>
      </header>

      {/* Announcement banner */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <Megaphone className="h-5 w-5 shrink-0 text-amber-700 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Schedule change notice</p>
          <p className="text-xs text-amber-700">
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
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-blue-50 grid place-items-center">
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
      <div className="rounded-xl border border-border bg-card p-5">
        <ol className="relative space-y-5 before:absolute before:left-[7px] before:top-1 before:bottom-1 before:w-px before:bg-border">
          {STOP_TIMELINE.map((stop) => (
            <li key={stop.stop} className="relative flex items-center gap-3 pl-8">
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2",
                  stop.status === "done" && "bg-secondary border-border",
                  stop.status === "current" && "bg-primary border-primary ring-4 ring-primary/15",
                  stop.status === "upcoming" && "bg-card border-border",
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

const HOSTELS = ["Hostel Block 4 (Kaveri)", "Hostel Block 6 (Ganga)", "Hostel Block 2 (Yamuna)"];

const MESS_MENU: Record<string, Record<string, { name: string; desc: string }[]>> = {
  "Hostel Block 4 (Kaveri)": {
    Breakfast: [
      { name: "Poha", desc: "garnished with sev & lemon" },
      { name: "Sprouts", desc: "moong & chana mix" },
      { name: "Boiled Eggs", desc: "2 per student" },
      { name: "Chai", desc: "masala tea" },
    ],
    Lunch: [
      { name: "Rajma Chawal", desc: "Punjabi style" },
      { name: "Roti", desc: "unlimited" },
      { name: "Curd", desc: "fresh" },
      { name: "Salad", desc: "seasonal" },
    ],
    Snacks: [
      { name: "Samosa", desc: "with imli chutney" },
      { name: "Masala Chai", desc: "cutting" },
    ],
    Dinner: [
      { name: "Dal Tadka", desc: "yellow dal, ghee tadka" },
      { name: "Paneer Butter Masala", desc: "rich gravy" },
      { name: "Rice", desc: "steamed" },
      { name: "Roti", desc: "unlimited" },
    ],
  },
  "Hostel Block 6 (Ganga)": {
    Breakfast: [
      { name: "Idli Sambhar", desc: "4 pieces" },
      { name: "Sprouts", desc: "protein bowl" },
      { name: "Boiled Eggs", desc: "2 per student" },
      { name: "Chai", desc: "filter coffee" },
    ],
    Lunch: [
      { name: "Chole Bhature", desc: "with onion rings" },
      { name: "Roti", desc: "butter optional" },
      { name: "Curd", desc: "fresh" },
      { name: "Salad", desc: "seasonal" },
    ],
    Snacks: [
      { name: "Veg Sandwich", desc: "grilled" },
      { name: "Maggi", desc: "masala" },
      { name: "Masala Chai", desc: "cutting" },
    ],
    Dinner: [
      { name: "Dal Tadka", desc: "yellow dal" },
      { name: "Aloo Gobi", desc: "dry sabzi" },
      { name: "Steamed Rice", desc: "with ghee" },
      { name: "Roti", desc: "unlimited" },
    ],
  },
  "Hostel Block 2 (Yamuna)": {
    Breakfast: [
      { name: "Aloo Paratha", desc: "with curd & pickle" },
      { name: "Sprouts", desc: "protein bowl" },
      { name: "Boiled Eggs", desc: "2 per student" },
      { name: "Chai", desc: "masala tea" },
    ],
    Lunch: [
      { name: "Rajma Chawal", desc: "Punjabi style" },
      { name: "Roti", desc: "unlimited" },
      { name: "Curd", desc: "fresh" },
      { name: "Salad", desc: "seasonal" },
    ],
    Snacks: [
      { name: "Bhel Puri", desc: "Mumbai style" },
      { name: "Masala Chai", desc: "cutting" },
    ],
    Dinner: [
      { name: "Dal Tadka", desc: "yellow dal" },
      { name: "Paneer Butter Masala", desc: "with naan" },
      { name: "Rice", desc: "steamed" },
      { name: "Roti", desc: "unlimited" },
    ],
  },
};

const MESS_TABS = ["Breakfast", "Lunch", "Snacks", "Dinner"];

const ISSUE_CATEGORIES = [
  { value: "Water", icon: Droplet },
  { value: "Electricity", icon: Zap },
  { value: "Cleaning", icon: Sparkle },
  { value: "Laundry", icon: WashingMachine },
];

const SEED_COMPLAINTS: { id: string; category: string; detail: string; status: "Open" | "In Review" | "Resolved"; time: string }[] = [
  { id: "#GRV-2026-091", category: "Water", detail: "No hot water in Kaveri Wing B-204 since morning", status: "In Review", time: "2h ago" },
  { id: "#GRV-2026-090", category: "Cleaning", detail: "Bathroom on Block 6 3rd floor not cleaned", status: "Open", time: "5h ago" },
  { id: "#GRV-2026-089", category: "Electricity", detail: "Wi-Fi router down in Kaveri Wing B", status: "Resolved", time: "1d ago" },
];

function HostelHub() {
  const [hostel, setHostel] = useState(HOSTELS[0]!);
  const [messTab, setMessTab] = useState("Breakfast");
  const [category, setCategory] = useState("Water");
  const [detail, setDetail] = useState("");
  const [complaints, setComplaints] = useState(SEED_COMPLAINTS);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = detail.trim();
    if (trimmed === "") return;
    const nextId = `#GRV-2026-${92 + complaints.length - 3}`;
    setComplaints([
      { id: nextId, category, detail: trimmed.slice(0, 200), status: "Open", time: "Just now" },
      ...complaints,
    ]);
    setDetail("");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Hostel Hub</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Mess menu, maintenance alerts, and a quick way to report hostel issues.
        </p>
      </header>

      {/* Alert banner */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-red-800">Maintenance Notice</p>
          <p className="text-xs text-red-700">
            Hostel Block 6 (Ganga) has experienced 4 water outages this month. Maintenance scheduled for Saturday.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mess menu */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Today's Mess Menu</h3>
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {HOSTELS.map((h) => (
              <button
                key={h}
                onClick={() => setHostel(h)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  hostel === h
                    ? "border-primary bg-blue-50 text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground",
                )}
              >
                {h}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {MESS_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setMessTab(t)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border",
                  messTab === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-secondary",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <ul className="space-y-2">
            {(MESS_MENU[hostel]?.[messTab] ?? []).map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 px-3 py-2.5"
              >
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Report issue form */}
        <div className="rounded-xl border border-border bg-card p-5">
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
                        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                        active
                          ? "border-primary bg-blue-50 text-primary"
                          : "border-border bg-secondary text-muted-foreground hover:text-foreground",
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
                placeholder="e.g. Tap leaking in Kaveri B-204 washroom"
                className="mt-1.5 w-full resize-none rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
            >
              <div className="h-9 w-9 shrink-0 rounded-lg bg-blue-50 grid place-items-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground truncate">{c.detail}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono">{c.id}</span> · {c.category} · {c.time}
                </p>
              </div>
              <Badge
                className={cn(
                  "border",
                  c.status === "Open"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : c.status === "In Review"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200",
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
  { label: "Course", options: ["CS301 — Operating Systems", "MA201 — Discrete Mathematics", "EC204 — Signals & Systems"] },
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
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Senior Bridge</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Notes, papers, and prof intel — passed down from seniors, filtered to your exact semester.
        </p>
      </header>

      {/* Nested filter selector */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
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
                      "rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors",
                      selections[i] === opt
                        ? "border-primary bg-blue-50 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:text-foreground",
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
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <GraduationCap className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Pick your Branch, Year, Semester and Course to unlock senior-shared material.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SENIOR_RESOURCES.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.id} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-lg bg-blue-50 grid place-items-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground">{r.title}</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
                    <p className="mt-1 text-[11px] text-emerald-700">{r.meta}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDownloaded(r.id)}
                  className={cn(
                    "mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors border",
                    downloaded === r.id
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
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
  { id: "hdmi", name: "HDMI Cable", owner: "Rohan Verma", dept: "CSE", available: true },
  { id: "draw", name: "Engineering Drawing Instruments", owner: "Kartik Sharma", dept: "ME", available: true },
  { id: "dmm", name: "Digital Multimeter", owner: "Aditya Reddy", dept: "ECE", available: true },
  { id: "arduino", name: "Arduino Uno Kit", owner: "Sneha Kulkarni", dept: "ECE", available: true },
];

function ResourceSharing() {
  const [borrowItem, setBorrowItem] = useState<(typeof EQUIPMENT)[number] | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Resource Sharing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Peer-to-peer equipment borrowing — request it, scan the QR, return it.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EQUIPMENT.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-lg bg-blue-50 grid place-items-center">
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
                <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">Available</Badge>
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
                <li>Meet the owner at the Aryabhatta Academic Complex, 2nd floor Innovation Lab.</li>
                <li>Show this QR check-out code at pickup.</li>
                <li>Return within 48 hours to keep your borrow score.</li>
              </ol>
              <div className="mx-auto flex flex-col items-center gap-2 rounded-lg border border-border bg-secondary/50 p-5">
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
  { id: "lib", name: "Central Library Ground Floor", crowd: "Low", score: 94, note: "Quiet floors available" },
  { id: "gym", name: "Campus Gym", crowd: "High", score: 71, note: "Peak hours 5–7 PM" },
  { id: "food", name: "Main Canteen", crowd: "Moderate", score: 82, note: "Lunch rush expected 1 PM" },
];

const GRIEVANCE_TYPES = ["Overflowing Bins", "Broken Projector", "Potholes", "Water Leakage"];

function crowdColor(crowd: string) {
  if (crowd === "High") return "bg-red-50 text-red-700 border-red-200";
  if (crowd === "Moderate") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

function CampusMap() {
  const [zone, setZone] = useState(ZONES[3]!);
  const [grievanceOpen, setGrievanceOpen] = useState(false);
  const [grievance, setGrievance] = useState<string | null>(null);
  const [reported, setReported] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Campus Map &amp; Cleanliness</h2>
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
              "rounded-xl border p-4 text-left transition-colors",
              zone.id === z.id
                ? "border-primary bg-blue-50"
                : "border-border bg-card hover:border-primary",
            )}
          >
            <MapPin className={cn("h-5 w-5 mb-2", zone.id === z.id ? "text-primary" : "text-muted-foreground")} />
            <p className="text-sm font-semibold text-foreground">{z.name}</p>
            <Badge className={cn("mt-2 border", crowdColor(z.crowd))}>{z.crowd}</Badge>
          </button>
        ))}
      </div>

      {/* Zone detail */}
      <div className="rounded-xl border border-border bg-card p-6">
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
              <Gauge className="h-5 w-5 text-emerald-600" />
              <span className="text-3xl font-bold text-foreground">{zone.score}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <p className="text-xs text-muted-foreground">Cleanliness score</p>
          </div>
        </div>
        <div className="mt-4 h-2.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={cn("h-full rounded-full", zone.score >= 85 ? "bg-emerald-500" : zone.score >= 75 ? "bg-primary" : "bg-amber-500")}
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
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              {grievance} reported at {zone.name}. Ticket #GRV-2026-092 created.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {GRIEVANCE_TYPES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGrievance(g)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium text-left transition-colors",
                    grievance === g
                      ? "border-primary bg-blue-50 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground",
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
    { label: "Internal Marks", value: "14/30", pct: 47, danger: true, hint: "CS301 mid-sem" },
    { label: "Assignment Completion", value: "72%", pct: 72, danger: false, hint: "2 pending submissions" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Academic Risk Detector</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Early-warning analysis of attendance, marks, and submissions.
        </p>
      </header>

      {/* Warning banner */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-4">
        <AlertTriangle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-red-800">Attention Required</p>
          <p className="text-xs text-red-700">
            Current attendance &amp; internal pattern flags risk in CS301 (Operating Systems).
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.label}</p>
              <BarChart3 className={cn("h-4 w-4", m.danger ? "text-red-600" : "text-emerald-600")} />
            </div>
            <p className={cn("mt-2 text-3xl font-bold", m.danger ? "text-red-700" : "text-foreground")}>
              {m.value}
            </p>
            <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className={cn("h-full rounded-full", m.danger ? "bg-red-500" : "bg-emerald-500")}
                style={{ width: `${m.pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{m.hint}</p>
          </div>
        ))}
      </div>

      {/* Advisor note + action */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Advisor recommendation</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Attend the next 4 CS301 lectures consecutively to cross the 75% attendance bar, and submit the
              pending process-scheduling assignment by Friday. A peer tutor from 4th year can revise CPU
              scheduling and Deadlocks with you before the end-sem.
            </p>
            <button
              onClick={() => setBooked(true)}
              disabled={booked}
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors border",
                booked
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default"
                  : "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
              )}
            >
              <CalendarCheck className="h-4 w-4" />
              {booked ? "Peer Tutor booked — Sat 11 AM, Central Library Room 3" : "Book Peer Tutor"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderModule({ tab }: { tab: { label: string; icon: typeof Users } }) {
  const Icon = tab.icon;
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{tab.label}</h2>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-dashed border-border bg-card p-8 text-center"
          >
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-secondary grid place-items-center">
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
