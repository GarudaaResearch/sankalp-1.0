import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, BookOpen } from 'lucide-react';
import './Footer.css';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Register', href: '#register' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { 
    label: 'RCAS-Innovation & Startup Cell Magazine', 
    href: 'https://rcas-isc-magazine.netlify.app/',
    icon: <BookOpen size={40} style={{ marginRight: '14px' }} />,
    color: '#fbbf24' // Yellow-400
  },
];

const scroll = (href) =>
  document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-brand-logos">
            <img src="/RCASlogo1.png" alt="RCAS" className="footer-logo" />
            <img src="/Innovation_Logo-01.png" alt="Innovation Cell" className="footer-logo innovation-logo-circle" />
          </div>
          <h3 className="footer-brand-name">SANKALP 2026</h3>
          <p className="footer-tagline">RCAS Innovation and Startup Cell<br />National Level Hackathon</p>
          <p className="footer-desc">
            Empowering student innovators to build solutions that matter. Join us on April 30, 2026 for a transformative 24-hour experience.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/in/rcas-innovation-and-startup-cell-8629433a7/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map(({ label, href, icon, color }) => (
              <li key={label}>
                {href.startsWith('#') ? (
                  <button onClick={() => scroll(href)} className="footer-link">{label}</button>
                ) : (
                  <a href={href} target="_blank" rel="noreferrer" className="footer-link" style={{ color: color || 'inherit', display: 'flex', alignItems: 'center' }}>
                    {icon}{label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <div className="footer-contacts">
            <div className="footer-contact-item">
              <Mail size={15} />
              <a href="mailto:rcasinnovationstartupcell@rathinam.in">rcasinnovationstartupcell@rathinam.in</a>
            </div>
            <div className="footer-contact-item">
              <Phone size={15} />
              <a href="tel:+917299408979">+91 7299408979</a>
            </div>
            <div className="footer-contact-item">
              <Phone size={15} />
              <a href="tel:+916380653178">+91 6380653178</a>
            </div>
            <div className="footer-contact-item" style={{ alignItems: 'flex-start' }}>
              <MapPin size={15} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>
                Research Hub, Rathinam College of Arts & Science<br />
                Rathinam Techzone, Eachanari<br />
                Coimbatore, Tamil Nadu - 641021.
              </span>
            </div>
          </div>
        </div>

        {/* Important Dates */}
        <div className="footer-col">
          <h4 className="footer-col-title">Important Dates</h4>
          <div className="footer-dates">
            {[
              { date: 'Apr 10', label: 'Registrations Open' },
              { date: 'Apr 20', label: 'Idea Submission' },
              { date: 'Apr 25', label: 'Shortlisting' },
              { date: 'Apr 30', label: '🚀 Hackathon Day' },
              { date: 'Apr 30', label: 'Prize Ceremony' },
            ].map(({ date, label }) => (
              <div key={`${date}-${label}`} className="footer-date-row">
                <span className="footer-date-tag">{date}</span>
                <span className="footer-date-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 RCAS Innovation and Startup Cell. All rights reserved.</span>
          <span>
            @ developed by <a href="https://www.linkedin.com/in/profanjitraja/" target="_blank" rel="noreferrer" style={{textDecoration: 'underline', color: 'inherit'}}>Prof. Anjit Raja R</a>, Head | I & S Cell, RCAS.
          </span>
          <a href="/admin" className="admin-link">Admin Portal →</a>
        </div>
      </div>
    </footer>
  );
}
