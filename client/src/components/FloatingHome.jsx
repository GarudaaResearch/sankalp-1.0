import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FloatingHome.css';

export default function FloatingHome() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className={`floating-home ${isVisible ? 'visible' : ''}`}>
      <button onClick={scrollToTop} aria-label="Go to Home" className="floating-home-btn">
        <Home size={24} />
      </button>
    </div>
  );
}
