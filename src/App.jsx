// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Hero from "./components/Hero/Hero";
// import Services from "./components/Services/Services";
// import Pricing from "./components/Pricing/Pricing"; 
// import Team from "./components/Team/Team";
// import Blog from "./components/Blog/Blog";
// import Contact from "./components/ContactForm/ContactForm";
// import Footer from "./components/Footer/Footer";
// import ScrollToTop from "./components/ScrollToTop";

// function App() {
//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />
//       <main>
//         <Routes>

          
//           <Route path="/" element={
//             <>
//               <Hero />
//               <Services />
//               <Pricing />
//               <Team />
//               <Blog />
//               <Contact />
//             </>
//           } />

         
//           <Route path="/services" element={<Services />} />
//           <Route path="/pricing"  element={<Pricing />} />
//           <Route path="/team"     element={<Team />} />
//           <Route path="/blog"     element={<Blog />} />
//           <Route path="/contact"  element={<Contact />} />

//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default App;
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Hero from "./components/Hero/Hero";
// import Services from "./components/Services/Services";
// import Pricing from "./components/Pricing/Pricing";
// import Team from "./components/Team/Team";
// import Blog from "./components/Blog/Blog";
// import BlogPost from "./components/Blog/BlogPost";
// import Contact from "./components/ContactForm/ContactForm";
// import Footer from "./components/Footer/Footer";
// import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
// import TermsOfService from "./components/Legal/TermsOfService";
// import CookiePolicy from "./components/Legal/CookiePolicy";
// import Portfolio from "./components/Portofolio/Portofolio";
// import About from "./components/About/About";
// import ScrollToTop from "./components/ScrollToTop";
// import WhatsApp from "./components/WhatsApp/wa";
// import Testimonials from "./components/Testimonials/Testimonials";
// import FAQ from "./components/FAQ/FAQ";

// import ExitModal from "./components/ExitModal/ExitModal";
// import TrustBar from "./components/TrustBar/TrustBar";




// function App() {
//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />
//       <main>
//         <Routes>
//           <Route path="/" element={
//             <>
//               <Hero />
//              <TrustBar/>
//               <Services />
            
//               <Pricing />
//               <FAQ/>
//               <Testimonials/>
              
//               <Team />
//               <Contact />
//             </>
//           } />
//           <Route path="/services"        element={<Services />} />
//           <Route path="/pricing"         element={<Pricing />} />
//           <Route path="/testimonials"   element={<Testimonials/>}/>
//           <Route path="/team"            element={<Team />} />
//           <Route path="/blog/:slug"      element={<BlogPost />} />
//           <Route path="/blog"            element={<Blog />} />
//           <Route path="/contact"         element={<Contact />} />
//           <Route path="/portfolio"       element={<Portfolio />} />
//           <Route path="/about"           element={<About />} />
//           <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
//           <Route path="/terms-of-service" element={<TermsOfService />} />
//           <Route path="/cookie-policy"   element={<CookiePolicy />} />
//           <Route path="*"                element={<div className="container section">Page not found</div>} />
//         </Routes>
//       </main>
//       <WhatsApp />
//       <ExitModal/>
      
     
//       <Footer />
//     </>
//   );
// }

// export default App;


import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Pricing from "./components/Pricing/Pricing";
import Team from "./components/Team/Team";
import Blog from "./components/Blog/Blog";
import BlogPost from "./components/Blog/BlogPost";
import Contact from "./components/ContactForm/ContactForm";
import Footer from "./components/Footer/Footer";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
import TermsOfService from "./components/Legal/TermsOfService";
import CookiePolicy from "./components/Legal/CookiePolicy";
import Portfolio from "./components/Portofolio/Portofolio";
import About from "./components/About/About";
import ScrollToTop from "./components/ScrollToTop";
import WhatsApp from "./components/WhatsApp/wa";
import Testimonials from "./components/Testimonials/Testimonials";
import FAQ from "./components/FAQ/FAQ";
import ExitModal from "./components/ExitModal/ExitModal";
import TrustBar from "./components/TrustBar/TrustBar";
import SEO from "./components/SEO/SEO";

const Chatbot = lazy(() => import("./components/Chatbot/Chatbot"));

const HOME_SEO = {
  description: "NorthWind delivers enterprise-grade IT services and consulting for growing businesses — cloud migration, cybersecurity, software development, and 24/7 managed IT support.",
  canonical: "/",
};

const PAGE_SEO = {
  about: {
    title: "About Us",
    description: "Learn about NorthWind — our story, mission, values, and the expert team behind our IT services and consulting practice.",
    canonical: "/about",
  },
  services: {
    title: "IT Services",
    description: "Explore NorthWind's full range of IT services — cloud solutions, cybersecurity, software development, IT support, data analytics, and strategic consulting.",
    canonical: "/services",
  },
  portfolio: {
    title: "Portfolio & Case Studies",
    description: "See real results from NorthWind client engagements — cloud migrations, cybersecurity overhauls, custom software, and more.",
    canonical: "/portfolio",
  },
  pricing: {
    title: "Pricing & Plans",
    description: "Transparent, no-lock-in IT service pricing. Choose from Starter, Professional, or Enterprise plans — or contact us for a custom quote.",
    canonical: "/pricing",
  },
  team: {
    title: "Our Team",
    description: "Meet the NorthWind team — certified IT engineers, cloud architects, security specialists, and strategic consultants.",
    canonical: "/team",
  },
  blog: {
    title: "Blog & Insights",
    description: "Practical IT guides, cybersecurity briefings, and technology strategy insights from the NorthWind consulting team.",
    canonical: "/blog",
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with NorthWind. Book a free IT consultation, ask about our services, or request a quote. We respond within 2 hours.",
    canonical: "/contact",
  },
  faq: {
    title: "FAQ",
    description: "Answers to the most common questions about NorthWind's IT services, pricing, process, and support.",
    canonical: "/faq",
  },
  privacy: {
    title: "Privacy Policy",
    description: "NorthWind's privacy policy — how we collect, use, and protect your personal data.",
    canonical: "/privacy-policy",
  },
  terms: {
    title: "Terms of Service",
    description: "NorthWind's terms of service — governing your use of our website and IT services.",
    canonical: "/terms-of-service",
  },
  cookies: {
    title: "Cookie Policy",
    description: "NorthWind's cookie policy — how we use cookies and how you can manage your preferences.",
    canonical: "/cookie-policy",
  },
  testimonials: {
  title: "Client Testimonials",
  description:
    "Read verified client testimonials about NorthWind's IT consulting, cloud solutions, cybersecurity, and managed support services.",
  canonical: "/testimonials",
},
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <SEO {...HOME_SEO} />
              <Hero />
              <TrustBar />
              
              <Testimonials />
              <Services/>
              
              <Pricing />
              <Contact />
            </>
          } />
          <Route path="/about" element={
            <><SEO {...PAGE_SEO.about} /><About /></>
          } />
          <Route path="/services" element={
            <><SEO {...PAGE_SEO.services} /><Services /></>
          } />
          <Route path="/portfolio" element={
            <><SEO {...PAGE_SEO.portfolio} /><Portfolio /></>
          } />
          <Route path="/pricing" element={
            <><SEO {...PAGE_SEO.pricing} /><Pricing /></>
          } />
          <Route path="/team" element={
            <><SEO {...PAGE_SEO.team} /><Team /></>
          } />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog" element={
            <><SEO {...PAGE_SEO.blog} /><Blog /></>
          } />
          <Route path="/contact" element={
            <><SEO {...PAGE_SEO.contact} /><Contact /></>
          } />
          <Route path="/faq" element={
            <><SEO {...PAGE_SEO.faq} /><FAQ /></>
          } />
          <Route path="/privacy-policy" element={
            <><SEO {...PAGE_SEO.privacy} /><PrivacyPolicy /></>
          } />
          <Route path="/terms-of-service" element={
            <><SEO {...PAGE_SEO.terms} /><TermsOfService /></>
          } />
          <Route path="/cookie-policy" element={
            <><SEO {...PAGE_SEO.cookies} /><CookiePolicy /></>
          } />
          <Route path="/testimonials" element={
            <><SEO {...PAGE_SEO.testimonials} /><Testimonials /></>
          } />
          <Route path="*" element={
            <>
              <SEO title="Page Not Found" description="The page you are looking for does not exist." />
              <div className="container section">
                <h2>Page not found</h2>
              </div>
            </>
          } />
        </Routes>
      </main>
      <WhatsApp />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
      <ExitModal />
     
      <Footer />
    </>
  );
}

export default App;