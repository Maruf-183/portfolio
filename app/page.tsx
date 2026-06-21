import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#0B0F19" }}>
      <Navbar />
      <Hero />
      <Marquee />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}