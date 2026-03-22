"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

interface ProjectData {
  num: string;
  type: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  github: string;
  highlight: boolean;
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -50 : 50]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className={`group relative border bg-parchment overflow-hidden ${
        project.highlight ? "border-accent/40 shadow-xl shadow-accent/5" : "border-border"
      } ${index % 2 !== 0 ? "md:mt-24" : ""}`}
    >
      {/* Thumbnail Area */}
      <div className="aspect-[4/3] bg-surface relative overflow-hidden flex items-center justify-center p-12">
        <motion.span 
          initial={{ scale: 0.8, opacity: 0.2 }}
          whileInView={{ scale: 1, opacity: 0.6 }}
          className="font-playfair text-[8rem] font-black italic text-border/40 select-none"
        >
          {project.num}
        </motion.span>
        
        {project.highlight && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-accent text-ink px-3 py-1 font-mono text-[0.6rem] tracking-tighter uppercase">
            <span className="w-1.5 h-1.5 bg-ink rounded-full animate-pulse" />
            Featured Work
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
          <p className="text-accent font-mono text-[0.7rem] uppercase tracking-widest mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.type}
          </p>
          <h4 className="text-cream font-playfair text-2xl font-bold mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            {project.title}
          </h4>
          <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
            <a href={project.github} target="_blank" className="p-3 bg-cream/10 rounded-full hover:bg-accent hover:text-ink transition-colors">
              <Github size={20} />
            </a>
            <a href={project.link} target="_blank" className="p-3 bg-cream/10 rounded-full hover:bg-accent hover:text-ink transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Info Footer (Visible when not hovered) */}
      <div className="p-8 border-t border-border group-hover:border-accent/20 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-playfair text-xl font-bold text-ink">{project.title}</h3>
          <ArrowRight className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" size={18} />
        </div>
        <p className="font-dm text-sm text-muted/80 leading-relaxed line-clamp-2">
          {project.desc}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="font-mono text-[0.6rem] tracking-wider uppercase text-muted py-1">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ data, githubUrl }: { data: ProjectData[]; githubUrl: string }) {
  return (
    <section id="projects" className="px-6 md:px-16 lg:px-24 py-32 border-b border-border bg-parchment relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-label mb-8"
            >
              Selected Portfolio
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-playfair text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.1] tracking-tight text-ink"
            >
              Curation of <span className="italic text-accent">digital</span><br />
              experiments & stories.
            </motion.h2>
          </div>
          
          <motion.a
            href={githubUrl}
            target="_blank"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
          >
            Explore all archives
            <span className="w-12 h-px bg-border group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
          </motion.a>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12">
          {data.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
