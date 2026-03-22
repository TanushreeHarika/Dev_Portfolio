"use client";
import { useEffect, useState, useCallback } from "react";

interface PortfolioData {
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

type SectionKey = "hero" | "about" | "projects" | "experience" | "contact" | "footer";

const sections: { key: SectionKey; label: string; icon: string }[] = [
  { key: "hero", label: "Hero", icon: "🏠" },
  { key: "about", label: "About", icon: "👤" },
  { key: "projects", label: "Projects", icon: "🚀" },
  { key: "experience", label: "Experience", icon: "💼" },
  { key: "contact", label: "Contact", icon: "✉️" },
  { key: "footer", label: "Footer", icon: "📝" },
];

/* ── Reusable styled input/textarea ── */
function Field({
  label,
  value,
  onChange,
  multiline,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  type?: string;
}) {
  const base =
    "w-full bg-cream border border-border px-4 py-2.5 font-dm text-[0.85rem] text-ink placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300";
  return (
    <div>
      <label className="block font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted mb-1.5">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${base} resize-y min-h-[80px]`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted mb-1.5">
        {label}
      </label>
      <input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full bg-cream border border-border px-4 py-2.5 font-dm text-[0.85rem] text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300"
      />
    </div>
  );
}

function CheckboxField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-[#C8A96E] w-4 h-4"
      />
      <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-muted group-hover:text-ink transition-colors">
        {label}
      </span>
    </label>
  );
}

/* ── Card wrapper ── */
function EditorCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-parchment/60 backdrop-blur-sm border border-border p-5 md:p-6 space-y-4 hover:border-accent/30 transition-colors duration-300">
      {title && (
        <h3 className="font-playfair text-base font-bold text-ink border-b border-border pb-2 mb-1">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

/* ── Section editors ── */

function HeroEditor({
  data,
  onChange,
}: {
  data: PortfolioData["hero"];
  onChange: (d: PortfolioData["hero"]) => void;
}) {
  const update = (patch: Partial<PortfolioData["hero"]>) => onChange({ ...data, ...patch });
  return (
    <div className="space-y-5">
      <EditorCard title="Basic Info">
        <Field label="Full Name" value={data.name} onChange={(v) => update({ name: v })} />
        <Field label="Initials" value={data.initials} onChange={(v) => update({ initials: v })} />
        <Field label="Availability Text" value={data.availabilityText} onChange={(v) => update({ availabilityText: v })} />
        <Field label="Bio" value={data.bio} onChange={(v) => update({ bio: v })} multiline />
      </EditorCard>

      <EditorCard title="Roles (Typewriter)">
        {data.roles.map((role, i) => (
          <div key={i} className="flex gap-2">
            <Field
              label={`Role ${i + 1}`}
              value={role}
              onChange={(v) => {
                const r = [...data.roles];
                r[i] = v;
                update({ roles: r });
              }}
            />
            <button
              onClick={() => update({ roles: data.roles.filter((_, j) => j !== i) })}
              className="self-end text-red-400 hover:text-red-600 transition-colors text-lg font-bold px-2 pb-2"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => update({ roles: [...data.roles, ""] })}
          className="font-mono text-[0.65rem] tracking-wider uppercase text-accent hover:text-ink transition-colors"
        >
          + Add Role
        </button>
      </EditorCard>

      <EditorCard title="Social Links">
        <Field
          label="GitHub URL"
          value={data.socialLinks.github}
          onChange={(v) => update({ socialLinks: { ...data.socialLinks, github: v } })}
        />
        <Field
          label="LinkedIn URL"
          value={data.socialLinks.linkedin}
          onChange={(v) => update({ socialLinks: { ...data.socialLinks, linkedin: v } })}
        />
      </EditorCard>
    </div>
  );
}

function AboutEditor({
  data,
  onChange,
}: {
  data: PortfolioData["about"];
  onChange: (d: PortfolioData["about"]) => void;
}) {
  const update = (patch: Partial<PortfolioData["about"]>) => onChange({ ...data, ...patch });
  return (
    <div className="space-y-5">
      <EditorCard title="Bio Paragraphs">
        {data.bioParas.map((p, i) => (
          <div key={i} className="flex gap-2">
            <div className="flex-1">
              <Field
                label={`Paragraph ${i + 1}`}
                value={p}
                onChange={(v) => {
                  const paras = [...data.bioParas];
                  paras[i] = v;
                  update({ bioParas: paras });
                }}
                multiline
              />
            </div>
            <button
              onClick={() => update({ bioParas: data.bioParas.filter((_, j) => j !== i) })}
              className="self-end text-red-400 hover:text-red-600 transition-colors text-lg font-bold px-2 pb-2"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => update({ bioParas: [...data.bioParas, ""] })}
          className="font-mono text-[0.65rem] tracking-wider uppercase text-accent hover:text-ink transition-colors"
        >
          + Add Paragraph
        </button>
      </EditorCard>

      <EditorCard title="Tech Skills">
        {data.techSkills.map((s, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex-1">
              <Field
                label="Skill"
                value={s.name}
                onChange={(v) => {
                  const sk = [...data.techSkills];
                  sk[i] = { ...sk[i], name: v };
                  update({ techSkills: sk });
                }}
              />
            </div>
            <div className="w-24">
              <NumberField
                label="%"
                value={s.pct}
                onChange={(v) => {
                  const sk = [...data.techSkills];
                  sk[i] = { ...sk[i], pct: v };
                  update({ techSkills: sk });
                }}
              />
            </div>
            <button
              onClick={() => update({ techSkills: data.techSkills.filter((_, j) => j !== i) })}
              className="text-red-400 hover:text-red-600 transition-colors text-lg font-bold px-2 pb-2"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => update({ techSkills: [...data.techSkills, { name: "", pct: 50 }] })}
          className="font-mono text-[0.65rem] tracking-wider uppercase text-accent hover:text-ink transition-colors"
        >
          + Add Skill
        </button>
      </EditorCard>

      <EditorCard title="Soft Skills">
        {data.softSkills.map((s, i) => (
          <div key={i} className="border border-border/50 p-3 space-y-2">
            <div className="flex gap-2">
              <div className="w-16">
                <Field label="Icon" value={s.icon} onChange={(v) => {
                  const sk = [...data.softSkills]; sk[i] = { ...sk[i], icon: v }; update({ softSkills: sk });
                }} />
              </div>
              <div className="flex-1">
                <Field label="Title" value={s.title} onChange={(v) => {
                  const sk = [...data.softSkills]; sk[i] = { ...sk[i], title: v }; update({ softSkills: sk });
                }} />
              </div>
              <div className="self-end pb-1">
                <CheckboxField label="Highlight" value={s.highlight} onChange={(v) => {
                  const sk = [...data.softSkills]; sk[i] = { ...sk[i], highlight: v }; update({ softSkills: sk });
                }} />
              </div>
              <button
                onClick={() => update({ softSkills: data.softSkills.filter((_, j) => j !== i) })}
                className="self-start text-red-400 hover:text-red-600 transition-colors text-lg font-bold px-1"
              >
                ×
              </button>
            </div>
            <Field label="Note" value={s.note} onChange={(v) => {
              const sk = [...data.softSkills]; sk[i] = { ...sk[i], note: v }; update({ softSkills: sk });
            }} />
          </div>
        ))}
        <button
          onClick={() => update({ softSkills: [...data.softSkills, { icon: "✨", title: "", note: "", highlight: false }] })}
          className="font-mono text-[0.65rem] tracking-wider uppercase text-accent hover:text-ink transition-colors"
        >
          + Add Soft Skill
        </button>
      </EditorCard>

      <EditorCard title="Currently Exploring">
        <div className="flex flex-wrap gap-2">
          {data.currentlyExploring.map((tag, i) => (
            <div key={i} className="flex items-center gap-1 bg-cream border border-border px-2 py-1">
              <input
                value={tag}
                onChange={(e) => {
                  const t = [...data.currentlyExploring];
                  t[i] = e.target.value;
                  update({ currentlyExploring: t });
                }}
                className="bg-transparent font-mono text-[0.7rem] text-ink w-24 focus:outline-none"
              />
              <button
                onClick={() => update({ currentlyExploring: data.currentlyExploring.filter((_, j) => j !== i) })}
                className="text-red-400 hover:text-red-600 text-sm font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => update({ currentlyExploring: [...data.currentlyExploring, ""] })}
          className="font-mono text-[0.65rem] tracking-wider uppercase text-accent hover:text-ink transition-colors mt-2"
        >
          + Add Tag
        </button>
      </EditorCard>

      <EditorCard title="LeetCode">
        <Field label="Profile URL" value={data.leetcode.profileUrl} onChange={(v) => update({ leetcode: { ...data.leetcode, profileUrl: v } })} />
        <Field label="Status Text" value={data.leetcode.statusText} onChange={(v) => update({ leetcode: { ...data.leetcode, statusText: v } })} />
        <Field label="Description" value={data.leetcode.description} onChange={(v) => update({ leetcode: { ...data.leetcode, description: v } })} multiline />
      </EditorCard>
    </div>
  );
}

function ProjectsEditor({
  data,
  onChange,
}: {
  data: PortfolioData["projects"];
  onChange: (d: PortfolioData["projects"]) => void;
}) {
  return (
    <div className="space-y-5">
      {data.map((proj, i) => (
        <EditorCard key={i} title={proj.title || `Project ${i + 1}`}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Number" value={proj.num} onChange={(v) => { const p = [...data]; p[i] = { ...p[i], num: v }; onChange(p); }} />
            <Field label="Type" value={proj.type} onChange={(v) => { const p = [...data]; p[i] = { ...p[i], type: v }; onChange(p); }} />
          </div>
          <Field label="Title" value={proj.title} onChange={(v) => { const p = [...data]; p[i] = { ...p[i], title: v }; onChange(p); }} />
          <Field label="Description" value={proj.desc} onChange={(v) => { const p = [...data]; p[i] = { ...p[i], desc: v }; onChange(p); }} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Link" value={proj.link} onChange={(v) => { const p = [...data]; p[i] = { ...p[i], link: v }; onChange(p); }} />
            <Field label="GitHub URL" value={proj.github} onChange={(v) => { const p = [...data]; p[i] = { ...p[i], github: v }; onChange(p); }} />
          </div>
          <Field
            label="Tags (comma-separated)"
            value={proj.tags.join(", ")}
            onChange={(v) => { const p = [...data]; p[i] = { ...p[i], tags: v.split(",").map((t) => t.trim()).filter(Boolean) }; onChange(p); }}
          />
          <div className="flex items-center justify-between">
            <CheckboxField label="Featured" value={proj.highlight} onChange={(v) => { const p = [...data]; p[i] = { ...p[i], highlight: v }; onChange(p); }} />
            <button
              onClick={() => onChange(data.filter((_, j) => j !== i))}
              className="font-mono text-[0.6rem] tracking-wider uppercase text-red-400 hover:text-red-600 transition-colors"
            >
              Remove Project
            </button>
          </div>
        </EditorCard>
      ))}
      <button
        onClick={() =>
          onChange([
            ...data,
            { num: String(data.length + 1).padStart(2, "0"), type: "", title: "", desc: "", tags: [], link: "#", github: "", highlight: false },
          ])
        }
        className="w-full py-3 border border-dashed border-accent/50 font-mono text-[0.7rem] tracking-wider uppercase text-accent hover:bg-accent/5 hover:border-accent transition-all duration-300"
      >
        + Add Project
      </button>
    </div>
  );
}

function ExperienceEditor({
  data,
  onChange,
}: {
  data: PortfolioData["experience"];
  onChange: (d: PortfolioData["experience"]) => void;
}) {
  return (
    <div className="space-y-5">
      {data.map((exp, i) => (
        <EditorCard key={i} title={exp.role || `Entry ${i + 1}`}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Period" value={exp.period} onChange={(v) => { const e = [...data]; e[i] = { ...e[i], period: v }; onChange(e); }} />
            <Field label="Company" value={exp.company} onChange={(v) => { const e = [...data]; e[i] = { ...e[i], company: v }; onChange(e); }} />
          </div>
          <Field label="Role" value={exp.role} onChange={(v) => { const e = [...data]; e[i] = { ...e[i], role: v }; onChange(e); }} />
          <Field label="Description" value={exp.desc} onChange={(v) => { const e = [...data]; e[i] = { ...e[i], desc: v }; onChange(e); }} multiline />
          <Field
            label="Tags (comma-separated)"
            value={exp.tags.join(", ")}
            onChange={(v) => { const e = [...data]; e[i] = { ...e[i], tags: v.split(",").map((t) => t.trim()).filter(Boolean) }; onChange(e); }}
          />
          <button
            onClick={() => onChange(data.filter((_, j) => j !== i))}
            className="font-mono text-[0.6rem] tracking-wider uppercase text-red-400 hover:text-red-600 transition-colors"
          >
            Remove Entry
          </button>
        </EditorCard>
      ))}
      <button
        onClick={() => onChange([...data, { period: "", role: "", company: "", desc: "", tags: [] }])}
        className="w-full py-3 border border-dashed border-accent/50 font-mono text-[0.7rem] tracking-wider uppercase text-accent hover:bg-accent/5 hover:border-accent transition-all duration-300"
      >
        + Add Experience
      </button>
    </div>
  );
}

function ContactEditor({
  data,
  onChange,
}: {
  data: PortfolioData["contact"];
  onChange: (d: PortfolioData["contact"]) => void;
}) {
  const update = (patch: Partial<PortfolioData["contact"]>) => onChange({ ...data, ...patch });
  return (
    <EditorCard title="Contact Section">
      <Field label="Heading" value={data.heading} onChange={(v) => update({ heading: v })} />
      <Field label="Description" value={data.description} onChange={(v) => update({ description: v })} multiline />
      <Field label="Email" value={data.email} onChange={(v) => update({ email: v })} type="email" />
      <Field label="LinkedIn URL" value={data.linkedinUrl} onChange={(v) => update({ linkedinUrl: v })} />
    </EditorCard>
  );
}

function FooterEditor({
  data,
  onChange,
}: {
  data: PortfolioData["footer"];
  onChange: (d: PortfolioData["footer"]) => void;
}) {
  const update = (patch: Partial<PortfolioData["footer"]>) => onChange({ ...data, ...patch });
  return (
    <EditorCard title="Footer">
      <Field label="Copyright Text" value={data.copyright} onChange={(v) => update({ copyright: v })} />
      <Field
        label="GitHub URL"
        value={data.socialLinks.github}
        onChange={(v) => update({ socialLinks: { ...data.socialLinks, github: v } })}
      />
      <Field
        label="LinkedIn URL"
        value={data.socialLinks.linkedin}
        onChange={(v) => update({ socialLinks: { ...data.socialLinks, linkedin: v } })}
      />
    </EditorCard>
  );
}

/* ── Main Dashboard ── */

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setToast({ type: "error", message: "Failed to load content" }))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSave = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setToast({ type: "success", message: "Changes saved! Refresh the site to see updates." });
      } else {
        setToast({ type: "error", message: "Failed to save. Please try again." });
      }
    } catch {
      setToast({ type: "error", message: "Network error." });
    } finally {
      setSaving(false);
    }
  }, [data]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-muted">
            Loading content...
          </p>
        </div>
      </div>
    );
  }

  const renderEditor = () => {
    switch (activeSection) {
      case "hero":
        return <HeroEditor data={data.hero} onChange={(d) => setData({ ...data, hero: d })} />;
      case "about":
        return <AboutEditor data={data.about} onChange={(d) => setData({ ...data, about: d })} />;
      case "projects":
        return <ProjectsEditor data={data.projects} onChange={(d) => setData({ ...data, projects: d })} />;
      case "experience":
        return <ExperienceEditor data={data.experience} onChange={(d) => setData({ ...data, experience: d })} />;
      case "contact":
        return <ContactEditor data={data.contact} onChange={(d) => setData({ ...data, contact: d })} />;
      case "footer":
        return <FooterEditor data={data.footer} onChange={(d) => setData({ ...data, footer: d })} />;
    }
  };

  return (
    <div className="px-4 md:px-10 py-8 max-w-5xl mx-auto">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-6 z-50 px-5 py-3 border font-mono text-[0.72rem] tracking-wider shadow-lg transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-50 border-green-300 text-green-800"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="font-playfair text-[clamp(1.8rem,4vw,2.5rem)] font-black tracking-tight text-ink">
          Content <em className="italic text-accent">Manager</em>
        </h1>
        <p className="font-dm text-[0.88rem] text-muted mt-1">
          Edit your portfolio content. Changes are saved to the data file and reflected on site refresh.
        </p>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`font-mono text-[0.68rem] tracking-[0.1em] uppercase px-4 py-2 border transition-all duration-300 flex items-center gap-2 ${
              activeSection === s.key
                ? "bg-ink text-cream border-ink"
                : "bg-transparent text-muted border-border hover:border-ink hover:text-ink"
            }`}
          >
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Editor area */}
      <div className="mb-8">{renderEditor()}</div>

      {/* Save button */}
      <div className="sticky bottom-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="font-mono text-[0.75rem] tracking-[0.12em] uppercase bg-ink text-cream px-8 py-3.5 border border-ink hover:bg-accent hover:border-accent hover:text-ink transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shine-sweep"
        >
          {saving ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes →"
          )}
        </button>
      </div>
    </div>
  );
}
