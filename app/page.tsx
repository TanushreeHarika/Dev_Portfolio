import { readData } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DockNav from "@/components/DockNav";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  const data = readData();

  return (
    <main>
      <PageLoader initials={data.hero.initials} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar initials={data.hero.initials} />
      <Hero data={data.hero} />
      <Marquee />
      <About data={data.about} />
      <Projects data={data.projects} githubUrl={data.hero.socialLinks.github} />
      <Experience data={data.experience} />
      <Contact data={data.contact} />
      <Footer data={data.footer} />
      <DockNav />
    </main>
  );
}
