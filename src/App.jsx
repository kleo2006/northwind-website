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

import ScrollToTop from "./components/ScrollToTop";
import WhatsApp from "./components/WhatsApp/wa";


function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Pricing />
                <Team />
                <Blog />
                <Contact />
              </>
            }
          />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div className="container section">Page not found</div>} />
        </Routes>
      </main>
      <WhatsApp/>
      <Footer />
    </>
  );
}

export default App;