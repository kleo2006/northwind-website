import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Pricing from "./components/Pricing/Pricing";
import Team from "./components/Team/Team";
import Blog from "./components/Blog/Blog";
import Contact from "./components/ContactForm/ContactForm";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>

          {/* ── Home (all sections) ── */}
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <Pricing />
              <Team />
              <Blog />
              <Contact />
            </>
          } />

          {/* ── Individual Pages ── */}
          <Route path="/services" element={<Services />} />
          <Route path="/pricing"  element={<Pricing />} />
          <Route path="/team"     element={<Team />} />
          <Route path="/blog"     element={<Blog />} />
          <Route path="/contact"  element={<Contact />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;