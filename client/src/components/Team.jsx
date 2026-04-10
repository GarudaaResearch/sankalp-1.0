import { Mail, Phone } from 'lucide-react';
import DeanImg from '../assets/Dean KPVS.png';
import ISCDirectorImg from '../assets/ISC-Director.png';
import TamilarasanImg from '../assets/THAMIZHARASAN N.png';
import MayurImg from '../assets/Mayur S.png';
import HarishImg from '../assets/Harish Rohit.png';
import KethciyalImg from '../assets/Kethcial.png';
import SubhaHariniImg from '../assets/Suba Harini.png';
import JoshvaImg from '../assets/Josua (2).png';
import TamilImg from '../assets/Tamil.png';
import './Team.css';

const faculty = [
  {
    name: 'Dr. K.P.V. Sabareesh',
    role: 'Dean – Research & Development',
    dept: 'Chief Patron',
    avatar: '👩‍🏫',
    image: DeanImg,
    color: '#1e3a8a',
  },
  {
    name: 'Prof. R. Anjit Raja',
    role: 'Head, Innovation and Startup Cell',
    dept: 'Event Director',
    avatar: '👨‍💼',
    image: ISCDirectorImg,
    color: '#d97706',
  },
  {
    name: 'Prof. N. Tamilarasan',
    role: 'Faculty Coordinator',
    dept: 'Department of CS',
    avatar: '👨‍💻',
    image: TamilarasanImg,
    color: '#7c3aed',
  },
];

const coordinators = [
  {
    name: 'Mr. Mayur P',
    role: 'Student Coordinator',
    year: '3rd Year, B.Sc. CT',
    phone: '+91 6381390205',
    email: 'mayurp.bct23@rathinam.in',
    avatar: '🧑‍💻',
    image: MayurImg,
    color: '#1e3a8a',
  },
  {
    name: 'Mr. Harish Rohith S',
    role: 'Operations Head',
    year: '2nd Year, B.Sc. CT',
    phone: '+91 6379101487',
    email: 'harishrohiths.bct24@rathinam.in',
    avatar: '👨‍💼',
    image: HarishImg,
    color: '#dc2626',
  },
  {
    name: 'Ms. Kethciyal S',
    role: 'Technical Lead',
    year: '1st Year, B.Sc. DCFS',
    phone: '+91 9787033352',
    email: 'kethciyals.bdc25@rathinam.in',
    avatar: '👩‍🔧',
    image: KethciyalImg,
    color: '#059669',
  },
  {
    name: 'Ms. SubhaHarini S',
    role: 'Registrations & Finance',
    year: '2nd Year, B.Sc. CT',
    phone: '+91 9787724203',
    email: 'subhaharini.bct24@rathinam.in',
    avatar: '👩‍💼',
    image: SubhaHariniImg,
    color: '#d97706',
  },
  {
    name: 'Mr. Tamil TM',
    role: 'Design & Outreach',
    year: '2nd Year, BCA (DevOps)',
    phone: '+91 8526554673',
    email: 'tamiltm.bca24@rathinam.in',
    avatar: '🎨',
    image: TamilImg,
    color: '#7c3aed',
  },
  {
    name: 'Mr. Joshva I',
    role: 'Events & Logistics',
    year: '2nd Year, BCA DevOps.',
    phone: '+91 9894191506',
    email: 'joshva.bca24@rathinam.in',
    avatar: '📋',
    image: JoshvaImg,
    color: '#0891b2',
  },
];

export default function Team() {
  return (
    <section className="section section-alt" id="team">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Team</span>
          <h2 className="section-title">Meet the <span>Organizers</span></h2>
          <p className="section-subtitle">
            The passionate minds behind SANKALP 2026. Reach out to any coordinator for queries.
          </p>
        </div>

        {/* Faculty */}
        <div className="faculty-row">
          {faculty.map(({ name, role, dept, avatar, image, color }) => (
            <div className="faculty-card card" key={name}>
              <div className="faculty-avatar" style={{ background: `${color}15`, color, padding: image ? 0 : undefined, overflow: 'hidden' }}>
                {image ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} /> : avatar}
              </div>
              <div className="faculty-info">
                <div className="faculty-name">{name}</div>
                <div className="faculty-role">{role}</div>
                <span className="badge badge-primary">{dept}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="team-sub-title">Student Coordinators</h3>

        <div className="coordinators-grid">
          {coordinators.map(({ name, role, year, phone, email, avatar, image, color }) => (
            <div className="coord-card card" key={name}>
              <div className="coord-header">
                <div className="coord-avatar" style={{ background: `${color}15`, color, padding: image ? 0 : undefined, overflow: 'hidden' }}>
                  {image ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} /> : avatar}
                </div>
                <div>
                  <div className="coord-name">{name}</div>
                  <div className="coord-role">{role}</div>
                  <div className="coord-year">{year}</div>
                </div>
              </div>
              <div className="coord-contacts">
                <a href={`tel:${phone}`} className="coord-link">
                  <Phone size={13} /> {phone}
                </a>
                <a href={`mailto:${email}`} className="coord-link">
                  <Mail size={13} /> {email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
