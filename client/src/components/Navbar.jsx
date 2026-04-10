import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/#about', label: 'About' },
  { to: '/#tracks', label: 'Tracks' },
  { to: '/#timeline', label: 'Timeline' },
  { to: '/#prizes', label: 'Prizes' },
  { to: '/#register', label: 'Register' },
  { to: '/#team', label: 'Team' },
  { to: '/#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleHashLink = (e, to) => {
    if (to === '/') {
      if (window.location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setMenuOpen(false);
    } else if (to.startsWith('/#')) {
      e.preventDefault();
      const id = to.replace('/#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={(e) => {
          if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          setMenuOpen(false);
        }}>
          <div className="brand-logos">
            <img src="/RCASlogo1.png" alt="RCAS" className="brand-logo rcas-logo-oval" />
            <img src="/Innovation_Logo-01.png" alt="Innovation Cell" className="brand-logo innovation-logo-circle" />
          </div>
          <div className="brand-text">
            <span className="brand-name">SANKALP 2026</span>
            <span className="brand-sub">RCAS Innovation and Startup Cell</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <a
                href={to}
                className="nav-link"
                onClick={(e) => handleHashLink(e, to)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <a
            href="/#register"
            className="btn btn-primary btn-sm"
            onClick={(e) => handleHashLink(e, '/#register')}
          >
            Register Now
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <a
                href={to}
                className="mobile-link"
                onClick={(e) => handleHashLink(e, to)}
                style={label === 'Home' ? { display: 'flex', alignItems: 'center', gap: '8px' } : undefined}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#register"
              className="btn btn-primary"
              style={{ marginTop: '8px', justifyContent: 'center' }}
              onClick={(e) => handleHashLink(e, '/#register')}
            >
              Register Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
