import { Lightbulb, Users, Globe, Award } from 'lucide-react';
import './About.css';

const highlights = [
  {
    icon: <Lightbulb size={24} />,
    title: 'Innovation First',
    desc: 'Tackle real-world problems using cutting-edge technology and creative thinking.',
  },
  {
    icon: <Users size={24} />,
    title: 'Team Collaboration',
    desc: 'Form diverse teams of 2–4 and combine your skills to build impactful solutions.',
  },
  {
    icon: <Globe size={24} />,
    title: 'National Platform',
    desc: 'Compete with talented students from across the country on a prestigious stage.',
  },
  {
    icon: <Award size={24} />,
    title: 'Win Big',
    desc: 'Compete for a prize pool of ₹18K+ and unlock exciting opportunities.',
  },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left: Text */}
          <div className="about-text">
            <span className="section-label">About the Event</span>
            <h2 className="section-title">
              What is <span>SANKALP 2026?</span>
            </h2>
            <p className="about-para">
              <strong>SANKALP 2026</strong> - short for <em>Shaping A Nation through Knowledge,
              Action, Learning & Progressive Thinking</em> - is a flagship national-level
              hackathon organised by the <strong>RCAS Innovation and Startup Cell</strong>.
            </p>
            <p className="about-para">
              Over 24 intense hours, student innovators from across India will design, develop,
              and demo technology solutions addressing three critical problem domains. Whether you
              are a coder, designer, domain expert, or idea person - SANKALP 2026 is your arena.
            </p>
            <p className="about-para">
              We believe innovation should be inclusive. Students with disabilities are warmly
              encouraged to participate. <strong>Fee waivers</strong> are available for
              differently-abled participants - see the Registration section for details.
            </p>

            <div className="about-meta">
              <div className="about-meta-item">
                <span className="about-meta-label">📅 Date</span>
                <span className="about-meta-value">April 30, 2026</span>
              </div>
              <div className="about-meta-item">
                <span className="about-meta-label">📍 Venue</span>
                <span className="about-meta-value">RCAS Campus, Main Auditorium</span>
              </div>
              <div className="about-meta-item">
                <span className="about-meta-label">⏱ Duration</span>
                <span className="about-meta-value">24 Hours</span>
              </div>
              <div className="about-meta-item">
                <span className="about-meta-label">🎓 Eligibility</span>
                <span className="about-meta-value">UG / PG Students (All Streams)</span>
              </div>
            </div>
          </div>

          {/* Right: Highlights */}
          <div className="about-highlights">
            {highlights.map(({ icon, title, desc }) => (
              <div className="highlight-card card" key={title}>
                <div className="highlight-icon">{icon}</div>
                <div>
                  <h3 className="highlight-title">{title}</h3>
                  <p className="highlight-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
