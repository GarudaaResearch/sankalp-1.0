import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Tracks from '../components/Tracks';
import Timeline from '../components/Timeline';
import Prizes from '../components/Prizes';
import Registration from '../components/Registration';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <Prizes />
      <Registration />
      <Team />
      <FAQ />
      <Footer />
    </>
  );
}
