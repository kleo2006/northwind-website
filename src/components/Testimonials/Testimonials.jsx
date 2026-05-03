import { motion } from "framer-motion";
import { useState } from "react";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "./Testimonials.css";


const TESTIMONIALS = [
  {
    id: 1,
    name: "James Hartwell",
    role: "CTO",
    company: "FinTech Solutions Ltd",
    initials: "JH",
    color: "#38bdf8",
    rating: 5,
    text: "NorthWind completely transformed our infrastructure. The AWS migration was flawless — zero downtime, 41% cost reduction, and our team barely noticed the transition. Their engineers are genuinely world-class.",
  },
  {
    id: 2,
    name: "Dr. Sarah Okonkwo",
    role: "Operations Director",
    company: "MedCore Clinics",
    initials: "SO",
    color: "#34d399",
    rating: 5,
    text: "After a security incident with our previous provider, we brought in NorthWind for a full cybersecurity overhaul. They passed our external audit on the first attempt. I sleep much better now knowing our patient data is protected.",
  },
  {
    id: 3,
    name: "Marco Bellini",
    role: "CEO",
    company: "LogiTrack Europe",
    initials: "MB",
    color: "#818cf8",
    rating: 5,
    text: "We had four disconnected systems slowing us down. NorthWind built us a custom ERP in 14 weeks that replaced all of them. Our invoicing time dropped by 60%. The ROI was visible within the first month.",
  },
  {
    id: 4,
    name: "Claire Stevenson",
    role: "IT Manager",
    company: "RetailMax Group",
    initials: "CS",
    color: "#fb923c",
    rating: 5,
    text: "The helpdesk support NorthWind provides is unlike anything we've experienced. Average resolution time went from 4 hours to 28 minutes. Our staff actually compliment the IT support now — that never happened before.",
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Head of Marketing",
    company: "GrowthMetrics Agency",
    initials: "PN",
    color: "#f472b6",
    rating: 5,
    text: "Our reporting used to take 3 days every month. NorthWind built us a real-time dashboard pulling from 8 data sources. Now we have live insights at our fingertips. It has genuinely changed how we make decisions.",
  },
  {
    id: 6,
    name: "Thomas Keller",
    role: "Managing Partner",
    company: "Meridian Law Partners",
    initials: "TK",
    color: "#facc15",
    rating: 5,
    text: "NorthWind guided our entire digital transformation with patience and expertise. They didn't just implement technology — they made sure our team understood and embraced it. Our IT overhead dropped 38% in year one.",
  },
];
 
/* ── Real SVG logos ─────────────────────────────────────────── */
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
 
const NetflixLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.398 0v24l5.8-1.301L12 20.48l.802 2.219L18.602 24V0h-4.8v13.04L12 9.36l-1.802 3.68V0H5.398z" fill="#E50914"/>
  </svg>
);
 
const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h11.377v11.372H0z" fill="#F25022"/>
    <path d="M12.623 0H24v11.372H12.623z" fill="#7FBA00"/>
    <path d="M0 12.623h11.377V24H0z" fill="#00A4EF"/>
    <path d="M12.623 12.623H24V24H12.623z" fill="#FFB900"/>
  </svg>
);
 
const AmazonLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.958 10.09c0 1.232.029 2.256-.59 3.346-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.698-3.182v.69zm3.186 7.705a.66.66 0 01-.76.074c-1.068-.886-1.258-1.295-1.845-2.138-1.763 1.799-3.012 2.338-5.296 2.338-2.704 0-4.806-1.669-4.806-5.006 0-2.608 1.415-4.385 3.43-5.253 1.746-.772 4.185-.909 6.047-1.12v-.418c0-.769.06-1.676-.392-2.338-.394-.594-1.148-.839-1.813-.839-1.231 0-2.328.631-2.597 1.939-.055.29-.269.576-.561.59l-3.138-.338c-.264-.059-.556-.272-.48-.677C5.922 1.67 8.854.5 11.47.5c1.34 0 3.091.356 4.147 1.371 1.34 1.249 1.211 2.916 1.211 4.73v4.284c0 1.288.534 1.854 1.037 2.55.177.248.215.546-.009.73l-2.712 2.63-.001-.001z" fill="#FF9900"/>
    <path d="M20.945 19.5c-2.667 1.867-6.533 2.867-9.867 2.867-4.667 0-8.867-1.733-12.043-4.6-.25-.233-.027-.55.275-.367 3.43 2 7.664 3.2 12.037 3.2 2.95 0 6.2-.617 9.193-1.883.45-.193.833.3.405.783z" fill="#FF9900"/>
    <path d="M22.078 18.19c-.34-.44-2.257-.207-3.117-.105-.262.033-.302-.196-.066-.36 1.527-1.073 4.031-.764 4.324-.404.293.363-.077 2.878-1.51 4.078-.22.185-.43.087-.332-.158.322-.808 1.04-2.61.701-3.051z" fill="#FF9900"/>
  </svg>
);
 
const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/>
  </svg>
);
 
const AirbnbLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 18.5c-1.657 0-3-1.12-3-2.5 0-.95.56-1.787 1.4-2.22-.196-.404-.4-.91-.4-1.28 0-1.105.896-2 2-2s2 .895 2 2c0 .37-.204.876-.4 1.28.84.433 1.4 1.27 1.4 2.22 0 1.38-1.343 2.5-3 2.5zM12 9c-.552 0-1-.448-1-1V5.5c0-.552.448-1 1-1s1 .448 1 1V8c0 .552-.448 1-1 1zm-5.657 2.343c-.39-.39-.39-1.023 0-1.414l1.768-1.768c.39-.39 1.023-.39 1.414 0 .39.39.39 1.023 0 1.414L7.757 11.343c-.39.39-1.023.39-1.414 0zm11.314 0c-.39.39-1.023.39-1.414 0l-1.768-1.768c-.39-.39-.39-1.023 0-1.414.39-.39 1.023-.39 1.414 0l1.768 1.768c.39.39.39 1.023 0 1.414z" fill="#FF5A5F"/>
  </svg>
);
 
const StripeLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" fill="#635BFF"/>
  </svg>
);
 
const SlackLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" fill="#E01E5A"/>
  </svg>
);
 
const NotionLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" fill="#000000"/>
  </svg>
);
 
const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
    <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
    <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
    <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
    <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
  </svg>
);
 
const LOGOS = [
  { name: "Google",    Logo: GoogleLogo    },
  { name: "Netflix",   Logo: NetflixLogo   },
  { name: "Microsoft", Logo: MicrosoftLogo },
  { name: "Amazon",    Logo: AmazonLogo    },
  { name: "Spotify",   Logo: SpotifyLogo   },
  { name: "Airbnb",    Logo: AirbnbLogo    },
  { name: "Stripe",    Logo: StripeLogo    },
  { name: "Slack",     Logo: SlackLogo     },
  { name: "Notion",    Logo: NotionLogo    },
  { name: "Figma",     Logo: FigmaLogo     },
];


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function StarRating({ count }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <HiStar key={i} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const { name, role, company, initials, color, rating, text } = testimonial;
  return (
    <motion.div
      className="testimonial-card"
      variants={fadeUp}
      style={{ "--t-color": color }}
    >
      <StarRating count={rating} />
      <p className="testimonial-card__text">"{text}"</p>
      <div className="testimonial-card__author">
        <div
          className="testimonial-card__avatar"
          style={{
            background: "color-mix(in srgb," + color + " 15%, var(--bg))",
            color: color,
            border: "2px solid color-mix(in srgb," + color + " 30%, transparent)",
          }}
        >
          {initials}
        </div>
        <div>
          <div className="testimonial-card__name">{name}</div>
          <div className="testimonial-card__meta">{role} · {company}</div>
        </div>
      </div>
      <div className="testimonial-card__glow" />
    </motion.div>
  );
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">

        {/* Header */}
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="testimonials__eyebrow">Client Stories</div>
          <h2 className="testimonials__title">
            Trusted by Teams <span className="accent">Across Industries</span>
          </h2>
          <p className="testimonials__sub">
            Don't take our word for it — here's what the people we work with
            have to say about working with NorthWind.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="testimonials__grid"
          key={page}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {visible.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="testimonials__pagination">
          <button
            className="testimonials__page-btn"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
          >
            <HiChevronLeft />
          </button>
          <div className="testimonials__dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={"testimonials__dot " + (i === page ? "testimonials__dot--active" : "")}
                onClick={() => setPage(i)}
                aria-label={"Page " + (i + 1)}
              />
            ))}
          </div>
          <button
            className="testimonials__page-btn"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next"
          >
            <HiChevronRight />
          </button>
        </div>

        {/* Logo wall */}
        {/* Logo wall */}
<motion.div
  className="testimonials__logos"
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  <p className="testimonials__logos-label">
    Trusted by leading innovators
  </p>
  <div className="testimonials__marquee-wrap">
    <div className="testimonials__marquee">
    {[...LOGOS, ...LOGOS].map(({ name, Logo }, i) => (
  <div key={i} className="testimonials__logo-item">
    <Logo />
    <span className="testimonials__logo-name">{name}</span>

  </div>
))}
<div className="testimonials__marquee">
 <div className="testimonials__marquee">
  
</div>
</div>
    </div>
  </div>
</motion.div>

      </div>
    </section>
  );
}