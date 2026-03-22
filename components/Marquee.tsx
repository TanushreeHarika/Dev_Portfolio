const items = [
  "Python", "FastAPI", "Flask", "HTML & CSS", "JavaScript",
  "SQL", "Git & GitHub", "C / C++", "API Integration", "LeetCode Grind",
  "Python", "FastAPI", "Flask", "HTML & CSS", "JavaScript",
  "SQL", "Git & GitHub", "C / C++", "API Integration", "LeetCode Grind",
];

export default function Marquee() {
  return (
    <div className="border-y border-border bg-ink overflow-hidden py-3.5 select-none">
      <div className="flex animate-marquee hover:animate-paused whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 group cursor-default">
            <span className="font-playfair italic text-cream/70 text-[0.95rem] group-hover:text-accent group-hover:scale-110 group-hover:animate-gradient-shift transition-all duration-300">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0 group-hover:bg-cream group-hover:scale-150 group-hover:animate-pulse transition-all duration-300" />
          </span>
        ))}
      </div>
    </div>
  );
}
