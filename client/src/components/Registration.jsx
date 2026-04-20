import { useState } from 'react';
import { Send, Users, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import './Registration.css';

const tracks = [
  'Future Fuels: Current Crisis',
  'Solar as Source',
  'Alternative Energies'
];

export default function Registration() {
  const [mode, setMode] = useState('team'); // 'solo' | 'team'
  const [isDisabled, setIsDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [form, setForm] = useState({
    teamName: '', track: '', leaderName: '', leaderEmail: '', leaderPhone: '',
    leaderCollege: '', member2: '', member3: '', member4: '',
    ideaTitle: '', ideaBrief: '', disabilityProof: '',
    transactionId: '', paymentDate: '', payerName: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit.');
        e.target.value = null;
        return;
      }
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      
      if (type === 'idea') {
        if (!['pdf', 'ppt', 'pptx'].includes(ext)) {
          alert('Invalid file type. Only PDF and PPT are allowed.');
          e.target.value = null;
          return;
        }
        setFile(selectedFile);
      } else if (type === 'payment') {
        if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
          alert('Invalid image type. Only JPG, PNG, and WEBP are allowed.');
          e.target.value = null;
          return;
        }
        setPaymentScreenshot(selectedFile);
      }
    }
  };

  const fee = isDisabled ? 0 : mode === 'solo' ? 200 : 400;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDisabled && !paymentScreenshot) {
      alert('Please upload your payment screenshot.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      formData.append('disabled', isDisabled);
      formData.append('mode', mode);
      
      if (file) {
        formData.append('ideaFile', file);
      }
      if (paymentScreenshot) {
        formData.append('paymentProof', paymentScreenshot);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      setSubmitted(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="section" id="register">
        <div className="container">
          <div className="reg-success">
            <div className="reg-success-icon"><CheckCircle2 size={56} /></div>
            <h2>Registration Submitted!</h2>
            <p>Thank you for registering for <strong>SANKALP 2026</strong>. We have received your details.</p>
            <p>Check your email for a confirmation. Shortlisted teams will be notified by <strong>April 25, 2026</strong>.</p>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Register Another Team</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="register">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Join SANKALP 2026</span>
          <h2 className="section-title">Register <span>Your Team</span></h2>
          <p className="section-subtitle">
            Fill in the details below to secure your spot. <br />
            Registrations close <strong>April 20, 2026</strong>.
          </p>
        </div>

        <div className="reg-layout">
          {/* Pricing cards */}
          <div className="reg-pricing">
            <h3 className="reg-pricing-title">Registration Fees</h3>

            <div className={`pricing-card ${mode === 'solo' ? 'pricing-active' : ''}`}
              onClick={() => setMode('solo')} role="button" tabIndex={0}>
              <div className="pricing-icon"><User size={22} /></div>
              <div className="pricing-info">
                <div className="pricing-label">Individual</div>
                <div className="pricing-desc">Solo participant (1 person)</div>
              </div>
              <div className="pricing-amount">{isDisabled ? <span className="free">FREE</span> : '₹200'}</div>
            </div>

            <div className={`pricing-card ${mode === 'team' ? 'pricing-active' : ''}`}
              onClick={() => setMode('team')} role="button" tabIndex={0}>
              <div className="pricing-icon"><Users size={22} /></div>
              <div className="pricing-info">
                <div className="pricing-label">Team</div>
                <div className="pricing-desc">2–4 members per team</div>
              </div>
              <div className="pricing-amount">{isDisabled ? <span className="free">FREE</span> : '₹400'}</div>
            </div>

            <div className="disability-waiver">
              <label className="waiver-label">
                <input
                  type="checkbox"
                  checked={isDisabled}
                  onChange={e => setIsDisabled(e.target.checked)}
                />
                <div className="waiver-text">
                  <span className="waiver-title">Fee Waiver for Differently-Abled</span>
                  <span className="waiver-desc">
                    Eligible students can participate for <b>FREE</b> upon verification.
                  </span>
                </div>
              </label>
            </div>

            <div className="reg-fee-summary">
              <span>Total Fee Payable</span>
              <span className="fee-total">{isDisabled ? 'FREE' : `₹${fee}`}</span>
            </div>

            <div className="reg-notes">
              <div className="reg-note"><AlertCircle size={14} /> Official receipt at event</div>
              <div className="reg-note"><AlertCircle size={14} /> All streams eligible</div>
              <div className="reg-note"><AlertCircle size={14} /> Team leader is primary contact</div>
            </div>
          </div>

          {/* Form */}
          <form className="reg-form card" onSubmit={handleSubmit}>
            <h3 className="form-section-title">
              {mode === 'team' ? '👥 Team Details' : '👤 Participant Details'}
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label>{mode === 'team' ? 'Team Name *' : 'Participant Name *'}</label>
                <input required placeholder={mode === 'team' ? 'e.g. Team Innovators' : 'Your full name'}
                  value={form.teamName} onChange={e => set('teamName', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Problem Track *</label>
                <select required value={form.track} onChange={e => set('track', e.target.value)}>
                  <option value="">Select a track</option>
                  {tracks.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <h3 className="form-section-title" style={{ marginTop: '8px' }}>
              {mode === 'team' ? '🧑‍💼 Team Leader' : '📋 Contact Info'}
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input required placeholder="Leader's full name"
                  value={form.leaderName} onChange={e => set('leaderName', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input required type="email" placeholder="email@example.com"
                  value={form.leaderEmail} onChange={e => set('leaderEmail', e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input required type="tel" placeholder="+91 XXXXX XXXXX"
                  value={form.leaderPhone} onChange={e => set('leaderPhone', e.target.value)} />
              </div>
              <div className="form-group">
                <label>College / Institution *</label>
                <input required placeholder="Your institution name"
                  value={form.leaderCollege} onChange={e => set('leaderCollege', e.target.value)} />
              </div>
            </div>

            {mode === 'team' && (
              <>
                <h3 className="form-section-title" style={{ marginTop: '8px' }}>👥 Team Members (Optional)</h3>
                <div className="form-row form-row-3">
                  <div className="form-group">
                    <label>Member 2 Name</label>
                    <input placeholder="Full name" value={form.member2} onChange={e => set('member2', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Member 3 Name</label>
                    <input placeholder="Full name" value={form.member3} onChange={e => set('member3', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Member 4 Name</label>
                    <input placeholder="Full name" value={form.member4} onChange={e => set('member4', e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <h3 className="form-section-title" style={{ marginTop: '8px' }}>💡 Idea Brief</h3>

            <div className="form-group">
              <label>Idea / Project Title *</label>
              <input required placeholder="One-line title for your idea"
                value={form.ideaTitle} onChange={e => set('ideaTitle', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Brief Description * <span className="label-hint">(max 300 words)</span></label>
              <textarea required rows={4}
                placeholder="Describe the problem you're solving, your proposed solution, and its impact..."
                value={form.ideaBrief} onChange={e => set('ideaBrief', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Upload Idea / Presentation <span className="label-hint">(PDF or PPT, max 10MB)</span></label>
              <input type="file" accept=".pdf,.ppt,.pptx" onChange={e => handleFileChange(e, 'idea')} />
              <span className="input-hint">Highly recommended to help us understand your project better.</span>
            </div>

            {isDisabled ? (
              <div className="form-group">
                <label>Disability Certificate Details *</label>
                <input required placeholder="Certificate No. / Issuing Authority"
                  value={form.disabilityProof} onChange={e => set('disabilityProof', e.target.value)} />
                <span className="input-hint">Original certificate must be shown at the venue for fee waiver.</span>
              </div>
            ) : (
              <>
                <div className="payment-info-card">
                  <h4>💳 Official Payment Details</h4>
                  <div className="payment-details-grid">
                    <div className="payment-qr-wrap">
                      <img src="/src/assets/payment_qr.jpg" alt="Payment QR Code" className="payment-qr" />
                    </div>
                    <div className="payment-text-info">
                      <div className="payment-field">
                        <label>Pay To:</label>
                        <span>RATHINAM COLLEGE OF ARTS AND SCIENCE</span>
                      </div>
                      <div className="payment-field">
                        <label>UPI ID:</label>
                        <span className="upi-id">vyapar.173351355001@hdfcbank</span>
                      </div>
                      <p className="payment-hint">
                        Scan the QR code or use the UPI ID above to pay the registration fee. 
                        After payment, please upload the screenshot below.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="form-section-title" style={{ marginTop: '24px' }}>💰 Payment Proof Upload (Backup)</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>UPI Transaction ID *</label>
                    <input required placeholder="12-digit UPI reference number"
                      value={form.transactionId} onChange={e => set('transactionId', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Payer Name *</label>
                    <input required placeholder="Name of person who paid"
                      value={form.payerName} onChange={e => set('payerName', e.target.value)} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Payment Date & Time *</label>
                    <input required type="datetime-local"
                      value={form.paymentDate} onChange={e => set('paymentDate', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Screenshot Upload *</label>
                    <input required type="file" accept="image/*" onChange={e => handleFileChange(e, 'payment')} />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spinner" /> 
                  <span>Uploading Details...</span>
                </div>
              ) : (
                <><Send size={16} /> Submit Registration</>
              )}
            </button>
            {loading && (
              <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
                Please do not refresh. Uploading files may take a few moments...
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
