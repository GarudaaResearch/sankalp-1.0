import './Prizes.css';

const prizes = [
  {
    rank: '2nd',
    label: 'Runner Up',
    amount: '₹5,000',
    icon: '🥈',
    perks: ['Cash Prize', 'Internship Opportunity', 'Certificate of Excellence', 'Mentorship Session'],
    highlight: false,
  },
  {
    rank: '1st',
    label: 'Grand Winner',
    amount: '₹10,000',
    icon: '🥇',
    perks: ['Cash Prize', 'Incubation Support', 'Industry Mentorship', 'Media Coverage', 'Certificate of Excellence'],
    highlight: true,
  },
  {
    rank: '3rd',
    label: 'Second Runner Up',
    amount: '₹3,000',
    icon: '🥉',
    perks: ['Cash Prize', 'Certificate of Excellence', 'Recognition Award'],
    highlight: false,
  },
];

const special = [
  { title: 'Best UI/UX Design', award: '' },
  { title: 'Most Innovative Idea', award: '' },
  { title: 'Best Social Impact', award: '' },
  { title: 'Best Beginner Team', award: '' },
  { title: 'People\'s Choice', award: '' },
];

export default function Prizes() {
  return (
    <section className="section section-alt" id="prizes">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Rewards</span>
          <h2 className="section-title">
            Prizes & <span>Recognition</span>
          </h2>
          <p className="section-subtitle">
            Compete for a total prize pool of over ₹18K - plus special awards, certificates, and career opportunities.
          </p>
        </div>

        {/* Podium */}
        <div className="prizes-podium">
          {prizes.map((p) => (
            <div className={`prize-card ${p.highlight ? 'prize-card-main' : ''}`} key={p.rank}>
              {p.highlight && <div className="prize-crown">👑 Grand Winner</div>}
              <div className="prize-icon">{p.icon}</div>
              <div className="prize-rank">{p.rank} Place</div>
              <div className="prize-label">{p.label}</div>
              <div className="prize-amount">{p.amount}</div>
              <ul className="prize-perks">
                {p.perks.map((perk) => (
                  <li key={perk}>
                    <span className="perk-check">✓</span> {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Special Awards */}
        <div className="special-awards">
          <h3 className="special-title">Special Category Awards</h3>
          <div className="special-grid">
            {special.map(({ title, award }) => (
              <div className="special-card card" key={title}>
                <span className="special-emoji">🏅</span>
                <div>
                  <div className="special-cat">{title}</div>
                  <div className="special-award">{award}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
