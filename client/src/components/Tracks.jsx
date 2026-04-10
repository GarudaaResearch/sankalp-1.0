import { Link } from 'react-router-dom';
import './Tracks.css';

const tracks = [
  {
    slug: 'future-fuels',
    emoji: '🌍',
    title: 'Future Fuels: Current Crisis',
    desc: 'Address real-world challenges around energy, environment, climate, food security, water scarcity, and societal issues. Innovate solutions that matter - not for tomorrow, but for today\'s crisis.',
    tags: ['Sustainable Systems', 'Resource Mgt', 'Disaster Prep', 'Pollution Control'],
    color: '#0891b2',
    bg: '#ecfeff',
    border: '#a5f3fc',
  },
  {
    slug: 'solar-as-source',
    emoji: '☀️',
    title: 'Solar as Source',
    desc: 'Harness the power of the sun. Design innovative products, systems, or services that use solar energy as a primary source to solve problems in agriculture, transportation, education, healthcare, or rural development.',
    tags: ['Solar IoT', 'Off-grid', 'Clean Mobility', 'Smart Agriculture'],
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
  },
  {
    slug: 'alternative-energies',
    emoji: '⚡',
    title: 'Alternative Energies',
    desc: 'Explore non-traditional sources of power like wind, kinetic, geothermal, and bio-energy. Design sustainable technological solutions to reduce dependence on fossil fuels.',
    tags: ['Wind Tech', 'Bio-energy'],
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
];

export default function Tracks() {
  return (
    <section className="section section-alt" id="tracks">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Problem Domains</span>
          <h2 className="section-title">
            Choose Your <span>Track</span>
          </h2>
          <p className="section-subtitle">
            Three critical problem areas. One goal - building meaningful solutions through technology
            and innovation.
          </p>
        </div>

        <div className="tracks-grid">
          {tracks.map((t) => (
            <Link
              to={`/tracks/${t.slug}`}
              className="track-card"
              key={t.title}
              style={{ '--track-color': t.color, '--track-bg': t.bg, '--track-border': t.border, textDecoration: 'none' }}
            >
              <div className="track-icon-wrap">
                <span className="track-emoji">{t.emoji}</span>
              </div>
              <h3 className="track-title">{t.title}</h3>
              <p className="track-desc">{t.desc}</p>
              <div className="track-tags">
                {t.tags.map((tag) => (
                  <span key={tag} className="track-tag">{tag}</span>
                ))}
              </div>
              <div className="track-footer">
                <span className="learn-more">Click for details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
