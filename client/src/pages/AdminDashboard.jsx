import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, FileText, CheckCircle, Clock, XCircle,
  Download, Search, Filter, Eye, LogOut, BarChart2
} from 'lucide-react';
import './AdminDashboard.css';

// Mock registration data
const mockData = [
  { id: 1, teamName: 'CodeCraft', track: 'Education Technology', leader: 'Arjun S', email: 'arjun@example.com', college: 'Anna University', members: 3, fee: 500, status: 'approved', date: '2026-04-11', disabled: false },
  { id: 2, teamName: 'GreenByte', track: 'Sustainable Environment', leader: 'Priya R', email: 'priya@example.com', college: 'SRM Institute', members: 4, fee: 500, status: 'pending', date: '2026-04-12', disabled: false },
  { id: 3, teamName: 'MediTech', track: 'Healthcare & Wellness', leader: 'Mohammed A', email: 'moha@example.com', college: 'VIT Vellore', members: 2, fee: 500, status: 'pending', date: '2026-04-13', disabled: false },
  { id: 4, teamName: 'AgroSense', track: 'Smart Agriculture', leader: 'Kavya L', email: 'kavya@example.com', college: 'PSG College', members: 3, fee: 0, status: 'approved', date: '2026-04-14', disabled: true },
  { id: 5, teamName: 'CivicAI', track: 'Smart Governance', leader: 'Ravi T', email: 'ravi@example.com', college: 'Loyola College', members: 4, fee: 500, status: 'rejected', date: '2026-04-15', disabled: false },
  { id: 6, teamName: 'FinFlow', track: 'FinTech & Digital Economy', leader: 'Sneha M', email: 'sneha@example.com', college: 'BITS Pilani', members: 2, fee: 500, status: 'approved', date: '2026-04-15', disabled: false },
  { id: 7, teamName: 'Solo Coder', track: 'Education Technology', leader: 'Vignesh P', email: 'vig@example.com', college: 'NIT Trichy', members: 1, fee: 200, status: 'pending', date: '2026-04-16', disabled: false },
  { id: 8, teamName: 'HealthBridge', track: 'Healthcare & Wellness', leader: 'Ananya K', email: 'ananya@example.com', college: 'Madras Medical', members: 4, fee: 0, status: 'pending', date: '2026-04-16', disabled: true },
];

const ADMIN_PASS = 'sankalp2026';

const statusColors = {
  approved: { bg: '#f0fdf4', text: '#16a34a', dot: '#22c55e' },
  pending:  { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
  rejected: { bg: '#fff5f5', text: '#dc2626', dot: '#ef4444' },
};

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('registrations'); // 'registrations' | 'analytics'
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTrack, setFilterTrack] = useState('all');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/registrations`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = (e) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) { setAuth(true); setErr(''); }
    else setErr('Incorrect password. Try again.');
  };

  const filtered = data.filter(r => {
    const matchSearch = (r.teamName || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.leaderName || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.leaderCollege || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchTrack = filterTrack === 'all' || r.track === filterTrack;
    return matchSearch && matchStatus && matchTrack;
  });

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setData(d => d.map(r => r.id === id ? { ...r, status } : r));
        if (selected?.id === id) setSelected(s => ({ ...s, status }));
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const stats = {
    total: data.length,
    approved: data.filter(r => r.status === 'approved').length,
    pending: data.filter(r => r.status === 'pending').length,
    disabled: data.filter(r => r.disabled).length,
    revenue: data.filter(r => r.status === 'approved').reduce((s, r) => s + r.fee, 0),
  };

  const tracks = [
    'Future Fuels: Current Crisis',
    'Solar as Source',
    'Alternative Energies'
  ];

  if (!auth) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-login-icon">🔐</div>
          <h1>Admin Portal</h1>
          <p>SANKALP 2026 - Dashboard Access</p>
          <form onSubmit={login} className="admin-login-form">
            <input
              type="password"
              placeholder="Enter admin password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              autoFocus
            />
            {err && <span className="admin-err">{err}</span>}
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
              Login
            </button>
          </form>
          <Link to="/" className="back-link">← Back to Website</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dash">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">⚡</span>
          <div>
            <div className="sidebar-title">SANKALP 2026</div>
            <div className="sidebar-sub">Admin Dashboard</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`sidebar-link ${activeTab === 'registrations' ? 'active' : ''}`} 
            onClick={() => setActiveTab('registrations')}
          >
            <Users size={16} /> Registrations
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`} 
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart2 size={16} /> Analytics
          </button>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link" onClick={() => setAuth(false)}>
            <LogOut size={16} /> Logout
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {activeTab === 'registrations' ? (
          <>
            {/* Header */}
            <div className="admin-header">
              <div>
                <h1 className="admin-title">Registrations</h1>
                <p className="admin-subtitle">Manage all SANKALP 2026 team registrations</p>
              </div>
              <button className="btn btn-outline" onClick={() => {
                const csv = ['ID,Team,Track,Leader,Email,College,Status,Date',
                  ...filtered.map(r => `${r.id},${r.teamName},${r.track},${r.leaderName},${r.leaderEmail},${r.leaderCollege},${r.status},${r.createdAt}`)
                ].join('\n');
                const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv]));
                a.download = 'sankalp2026_registrations.csv'; a.click();
              }}>
                <Download size={16} /> Export CSV
              </button>
            </div>

            {/* Stats */}
            <div className="admin-stats">
              {[
                { label: 'Total Registrations', value: stats.total, icon: <Users size={20} />, color: '#1e3a8a' },
                { label: 'Approved', value: stats.approved, icon: <CheckCircle size={20} />, color: '#16a34a' },
                { label: 'Pending Review', value: stats.pending, icon: <Clock size={20} />, color: '#d97706' },
                { label: 'Fee Waivers', value: stats.disabled, icon: '♿', color: '#7c3aed' },
              ].map(({ label, value, icon, color }) => (
                <div className="admin-stat-card" key={label} style={{ '--stat-color': color }}>
                  <div className="admin-stat-icon">{icon}</div>
                  <div className="admin-stat-value">{value}</div>
                  <div className="admin-stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="admin-filters">
              <div className="admin-search">
                <Search size={16} />
                <input
                  placeholder="Search by team, leader, college..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select value={filterTrack} onChange={e => setFilterTrack(e.target.value)}>
                <option value="all">All Tracks</option>
                {tracks.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Table */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Team</th>
                    <th>Track</th>
                    <th>Leader</th>
                    <th>College</th>
                    <th className="center">Idea</th>
                    <th className="center">Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => {
                    const sc = statusColors[r.status];
                    return (
                      <tr key={r.id} className={selected?.id === r.id ? 'row-selected' : ''}>
                        <td>{r.id}</td>
                        <td>
                          <div className="team-cell">
                            <span className="team-name">{r.teamName}</span>
                            {r.disabled && <span className="waiver-badge">♿ Waiver</span>}
                          </div>
                        </td>
                        <td className="track-cell">{r.track}</td>
                        <td>
                          <div className="leader-cell">
                            <span>{r.leaderName}</span>
                            <span className="leader-email">{r.leaderEmail}</span>
                          </div>
                        </td>
                        <td>{r.leaderCollege}</td>
                        <td className="center">
                          {r.ideaFile ? (
                            <a 
                              href={`${import.meta.env.VITE_API_URL}/uploads/${r.ideaFile}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="file-link"
                              title="View Presentation"
                            >
                              <FileText size={18} />
                            </a>
                          ) : (
                            <span className="no-file">—</span>
                          )}
                        </td>
                        <td className="center">
                          {r.paymentProof ? (
                            <a 
                              href={`${import.meta.env.VITE_API_URL}/uploads/${r.paymentProof}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="file-link payment-link"
                              title={`TXN: ${r.transactionId}`}
                            >
                              <CheckCircle size={18} style={{ color: '#16a34a' }} />
                            </a>
                          ) : (
                            <span className="no-file">{r.disabled ? 'N/A' : '—'}</span>
                          )}
                        </td>
                        <td>
                          <span className="status-badge" style={{ background: sc.bg, color: sc.text }}>
                            <span style={{ background: sc.dot }} className="status-dot" />
                            {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn view" onClick={() => setSelected(r)} title="View Detail"><Eye size={14} /></button>
                            {r.status !== 'approved' && (
                              <button className="action-btn approve" onClick={() => updateStatus(r.id, 'approved')} title="Approve">
                                <CheckCircle size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="empty-state">
                  <FileText size={36} />
                  <p>No registrations match your search.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="analytics-view">
            <div className="admin-header">
              <div>
                <h1 className="admin-title">Analytics</h1>
                <p className="admin-subtitle">Insights and statistics for SANKALP 2026</p>
              </div>
            </div>

            <div className="analytics-grid">
              <div className="analytics-card main-stats">
                <h3>Track Distribution</h3>
                <div className="track-stats">
                  {tracks.map(track => {
                    const count = data.filter(r => r.track === track).length;
                    const percentage = (count / data.length * 100) || 0;
                    return (
                      <div key={track} className="track-stat-row">
                        <div className="track-stat-info">
                          <span>{track}</span>
                          <span className="track-count">{count} teams</span>
                        </div>
                        <div className="track-progress-bg">
                          <div className="track-progress-fill" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="analytics-card status-pie">
                <h3>Status Breakdown</h3>
                <div className="status-stats">
                  {[
                    { label: 'Approved', count: stats.approved, color: '#16a34a' },
                    { label: 'Pending', count: stats.pending, color: '#d97706' },
                    { label: 'Rejected', count: data.filter(r => r.status === 'rejected').length, color: '#dc2626' },
                  ].map(s => (
                    <div key={s.label} className="status-stat-item">
                      <div className="status-stat-bar" style={{ height: `${(s.count / data.length * 100) || 5}px`, background: s.color }} />
                      <span className="status-stat-label">{s.label}</span>
                      <span className="status-stat-value">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Detail Drawer */}
      {selected && (
        <div className="detail-overlay" onClick={() => setSelected(null)}>
          <div className="detail-drawer" onClick={e => e.stopPropagation()}>
            <div className="detail-header">
              <div>
                <h2>{selected.teamName}</h2>
                <span className="detail-date">Registered on {selected.date}</span>
              </div>
              <button className="detail-close" onClick={() => setSelected(null)}>×</button>
            </div>

            <div className="detail-body">
              {[
                ['Track', selected.track],
                ['Leader', selected.leaderName],
                ['Email', selected.leaderEmail],
                ['Phone', selected.leaderPhone],
                ['College', selected.leaderCollege],
                ['Idea Title', selected.ideaTitle],
                ['Brief', selected.ideaBrief],
                ['Disability Waiver', selected.disabled ? 'Yes ♿' : 'No'],
              ].map(([k, v]) => (
                <div className="detail-row" key={k}>
                  <span className="detail-key">{k}</span>
                  <span className="detail-val">{v}</span>
                </div>
              ))}

              {!selected.disabled && (
                <>
                  <div className="detail-divider">Payment Details</div>
                  {[
                    ['Transaction ID', selected.transactionId],
                    ['Payer Name', selected.payerName],
                    ['Payment Date', selected.paymentDate],
                  ].map(([k, v]) => (
                    <div className="detail-row" key={k}>
                      <span className="detail-key">{k}</span>
                      <span className="detail-val">{v || '—'}</span>
                    </div>
                  ))}
                </>
              )}

              <div className="detail-divider">Attachments</div>
              {selected.ideaFile && (
                <div className="detail-row">
                  <span className="detail-key">Idea Presentation</span>
                  <span className="detail-val">
                    <a 
                      href={`${import.meta.env.VITE_API_URL}/uploads/${selected.ideaFile}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-link"
                      style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      View Presentation
                    </a>
                  </span>
                </div>
              )}
              {selected.paymentProof && (
                <div className="detail-row">
                  <span className="detail-key">Payment Proof</span>
                  <span className="detail-val">
                    <a 
                      href={`${import.meta.env.VITE_API_URL}/uploads/${selected.paymentProof}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-link"
                      style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      View Screenshot
                    </a>
                  </span>
                </div>
              )}
            </div>

            <div className="detail-actions">
              <button className="btn btn-primary" onClick={() => updateStatus(selected.id, 'approved')}>
                <CheckCircle size={15} /> Approve
              </button>
              <button className="btn" style={{ background: '#fee2e2', color: '#dc2626', border: 'none' }}
                onClick={() => updateStatus(selected.id, 'rejected')}>
                <XCircle size={15} /> Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
