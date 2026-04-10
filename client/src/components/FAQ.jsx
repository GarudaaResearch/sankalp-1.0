import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    q: 'Who can participate in SANKALP 2026?',
    a: 'Any student currently enrolled in an undergraduate or postgraduate program in India can participate. Students from all streams - Engineering, Science, Arts, Commerce - are welcome. There are no branch restrictions.',
  },
  {
    q: 'Can I participate as a solo individual?',
    a: 'Yes! You can register as an individual participant at a fee of ₹200. However, teamwork is encouraged - teams of 2 to 4 members can register at ₹500 per team.',
  },
  {
    q: 'Is there a fee waiver for differently-abled students?',
    a: 'Absolutely. Students with physical disabilities are fully exempt from the registration fee. Simply check the fee waiver option during registration and bring your disability certificate (issued by a government authority) to the venue for verification.',
  },
  {
    q: 'Do all team members need to be from the same college?',
    a: 'No. You are free to form teams across different institutions. Cross-college collaboration is actively encouraged as it brings diverse perspectives.',
  },
  {
    q: 'What should I submit for the idea brief?',
    a: 'A concise description (up to 300 words) of the problem you are addressing, your proposed solution, and its expected impact. You may optionally attach a 5-slide deck or a 1-page PDF through email.',
  },
  {
    q: 'What happens after I register?',
    a: 'All submissions will be reviewed by a panel. Shortlisted teams will be notified by April 25, 2026 via email. Selected teams must attend a pre-event orientation on April 28 before the 24-hour hackathon begins on April 30.',
  },
  {
    q: 'What should we bring on the hackathon day?',
    a: 'Bring your laptops, chargers, a valid college ID, and any hardware/tools relevant to your project. Venue will provide Wi-Fi, power outlets, meals, and refreshments throughout the 24-hour event.',
  },
  {
    q: 'Will there be mentors available during the hackathon?',
    a: 'Yes! Industry experts and faculty mentors will be available throughout the hackathon to guide teams on their problem statements, technical approach, and presentation skills.',
  },
  {
    q: 'How will the projects be judged?',
    a: 'Projects are evaluated on Innovation & Creativity (30%), Technical Implementation (25%), Social Impact & Relevance (20%), Presentation & Demo (15%), and Scalability (10%).',
  },
  {
    q: 'How do I contact the organizers?',
    a: 'You can reach our student coordinators directly via the contact details listed in the Team section above. Alternatively, email us at rcasinnovationstartupcell@rathinam.in.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Got Questions?</span>
          <h2 className="section-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about SANKALP 2026. Still have questions? Contact our team.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? 'faq-open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <ChevronDown className="faq-chevron" size={20} />
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>Still have questions?</p>
          <a href="mailto:rcasinnovationstartupcell@rathinam.in" className="btn btn-outline">
            Email Us at rcasinnovationstartupcell@rathinam.in
          </a>
        </div>
      </div>
    </section>
  );
}
