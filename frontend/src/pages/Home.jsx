// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import About from "../components/About";
import Contact from "../components/Contact";
import Module from "../components/Module";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Feature />
      <Module />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
