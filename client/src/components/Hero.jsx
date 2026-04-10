import { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import './Hero.css';

const HACKATHON_DATE = new Date('2026-04-30T09:00:00');

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(HACKATHON_DATE);

  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  const scrollToRegister = () =>
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero-section" id="home">
      {/* Background layers */}
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      <div className="hero-content container">
        {/* Main Logo */}
        <div className="hero-logo-container animate-fade-up">
          <img src="/RCASlogo1.png" alt="RCAS Logo" className="hero-main-logo" />
        </div>

        {/* Badge */}
        <div className="hero-badge animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="hero-badge-dot" />
          National Level Hackathon · April 30, 2026
        </div>

        {/* Title */}
        <h1 className="hero-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
          RCAS <span className="hero-title-accent">SANKALP</span>
          <br />
          <span className="hero-title-year">2026</span>
        </h1>

        {/* Tagline */}
        <p className="hero-tagline animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Innovate · Build · Transform
        </p>
        <p className="hero-description animate-fade-up" style={{ animationDelay: '0.25s' }}>
          A 24-hour hackathon where young minds converge to solve real-world challenges through
          technology, creativity, and collaboration. Present your ideas, build prototypes, and
          make an impact.
        </p>

        {/* CTAs */}
        <div className="hero-ctas animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <button className="btn btn-gold" onClick={scrollToRegister}>
            Register Your Team <ArrowRight size={18} />
          </button>
          <button className="btn btn-outline-white" onClick={scrollToAbout}>
            Learn More
          </button>
        </div>

        {/* Countdown */}
        <div className="hero-countdown animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <p className="countdown-label">Hackathon begins in</p>
          <div className="countdown-grid">
            {[
              { value: days, label: 'Days' },
              { value: hours, label: 'Hours' },
              { value: minutes, label: 'Minutes' },
              { value: seconds, label: 'Seconds' },
            ].map(({ value, label }, i) => (
              <div key={label} className="countdown-card">
                <span className="countdown-value">
                  {String(value ?? 0).padStart(2, '0')}
                </span>
                <span className="countdown-unit">{label}</span>
                {i < 3 && <span className="countdown-sep">:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="hero-stats animate-fade-up" style={{ animationDelay: '0.5s' }}>
          {[
            { value: '500+', label: 'Participants' },
            { value: '₹18K+', label: 'Prize Pool' },
            { value: '3', label: 'Tracks' },
            { value: '24hrs', label: 'Duration' },
          ].map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button className="hero-scroll-cue" onClick={scrollToAbout} aria-label="Scroll down">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
