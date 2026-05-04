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
import CookieConsent from "./components/CookieConsent/CookieConsent";



function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
             <TrustBar/>
              <Services />
            
              <Pricing />
              <FAQ/>
              <Testimonials/>
              
              <Team />
              <Contact />
            </>
          } />
          <Route path="/services"        element={<Services />} />
          <Route path="/pricing"         element={<Pricing />} />
          <Route path="/testimonials"   element={<Testimonials/>}/>
          <Route path="/team"            element={<Team />} />
          <Route path="/blog/:slug"      element={<BlogPost />} />
          <Route path="/blog"            element={<Blog />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/portfolio"       element={<Portfolio />} />
          <Route path="/about"           element={<About />} />
          <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy"   element={<CookiePolicy />} />
          <Route path="*"                element={<div className="container section">Page not found</div>} />
        </Routes>
      </main>
      <WhatsApp />
      <ExitModal/>
      
     
      <Footer />
    </>
  );
}

export default App;