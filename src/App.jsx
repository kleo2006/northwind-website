import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Pricing from "./components/Pricing/Pricing";
import Team from "./components/Team/Team";
import Blog from "./components/Blog/Blog";
import ContactForm from "./components/ContactForm/ContactForm";
import Footer from "./components/Footer/Footer";
 // optional but recommended

// HomePage component for modularity
function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Pricing />
      <Team />
      <Blog />
      <ContactForm />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
     

      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Pages */}
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />

          {/* Contact Page */}
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;

