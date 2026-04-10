import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import './Timeline.css';

const events = [
  {
    date: 'Apr 10, 2026',
    title: 'Registrations Open',
    desc: 'Team and individual registrations go live. Early registrations get priority review.',
    status: 'upcoming',
    icon: '📢',
  },
  {
    date: 'Apr 20, 2026',
    title: 'Idea Submission Deadline',
    desc: 'Submit your initial idea brief (max 1 page PDF or 5-slide deck) through the portal.',
    status: 'upcoming',
    icon: '📝',
  },
  {
    date: 'Apr 25, 2026',
    title: 'Shortlisting Announcement',
    desc: 'Selected teams are notified via email. Shortlisted teams proceed to the grand event.',
    status: 'upcoming',
    icon: '📋',
  },
  {
    date: 'Apr 28, 2026',
    title: 'Pre-Hackathon Orientation',
    desc: 'Virtual orientation session for shortlisted teams. Guidelines, judging criteria briefing.',
    status: 'upcoming',
    icon: '🎯',
  },
  {
    date: 'Apr 30, 2026',
    title: 'Hackathon Day – 8:30 AM',
    desc: 'The 24-hour hackathon begins! Build, present, and compete for glory and prizes.',
    status: 'main',
    icon: '🚀',
  },
  {
    date: 'April 30, 2026',
    title: 'Final Presentations & Closing',
    desc: 'Project demos before the jury. Winners announced and prizes awarded at the valedictory.',
    status: 'upcoming',
    icon: '🏆',
  },
];

export default function Timeline() {
  return (
    <section className="section" id="timeline">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Schedule</span>
          <h2 className="section-title">
            Event <span>Timeline</span>
          </h2>
          <p className="section-subtitle">
            Mark your calendar - here's the complete roadmap to SANKALP 2026.
          </p>
        </div>

        <div className="timeline">
          {events.map((ev, idx) => (
            <div className={`timeline-item ${ev.status === 'main' ? 'timeline-main' : ''}`} key={idx}>
              <div className="timeline-connector">
                <div className="timeline-dot">
                  <span className="timeline-dot-icon">{ev.icon}</span>
                </div>
                {idx < events.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-card card">
                <span className="timeline-date">{ev.date}</span>
                <h3 className="timeline-title">{ev.title}</h3>
                <p className="timeline-desc">{ev.desc}</p>
                {ev.status === 'main' && (
                  <span className="timeline-badge badge badge-gold">⭐ Main Event</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
