import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { HiSun, HiMoon } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing",  to: "/pricing" },
  { label: "Team",     to: "/team" },
  { label: "Blog",     to: "/blog" },
  { label: "Contact",  to: "/contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">

        {/* ── Logo ── */}
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-mark">N</span>
          <span className="navbar__logo-text">
            North<span className="accent">Wind</span>
          </span>
        </NavLink>

        {/* ── Desktop Links ── */}
        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right Controls ── */}
        <div className="navbar__controls">
          {/* Theme Toggle */}
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>

          {/* CTA */}
          <NavLink to="/contact" className="navbar__cta" onClick={closeMenu}>
            Get a Quote
          </NavLink>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="navbar__mobile-links">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="navbar__cta navbar__cta--mobile" onClick={closeMenu}>
            Get a Quote
          </NavLink>
        </nav>
      </div>

      {/* ── Backdrop ── */}
      {menuOpen && (
        <div className="navbar__backdrop" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
}