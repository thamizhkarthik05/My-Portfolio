import { useEffect, useState } from 'react';
import { GlobalBackground } from './components/GlobalBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/Hero';
import { EducationSection } from './sections/Education';
import { QuoteSection } from './sections/Quote';
import { ApproachSection } from './sections/Approach';
import { ExperienceSection } from './sections/Experience';
import { ProjectsSection } from './sections/Projects';
import { SkillsSection } from './sections/Skills';
import { AchievementsSection } from './sections/Achievements';
import { CertificationsSection } from './sections/Certifications';
import { PatentsSection } from './sections/Patents';
import { BeyondSection } from './sections/Beyond';
import { ContactSection } from './sections/Contact';
import { OrigamiDivider } from './components/UI';
import { SolarSystemLoader } from './components/SolarSystemLoader';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  // Ensure website always starts at the top of Home section on fresh load/refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <>
      {showLoader && (
        <SolarSystemLoader
          minDuration={2400}
          onComplete={() => setShowLoader(false)}
        />
      )}

      <div className="relative min-h-screen bg-midnight text-warm-white font-sans antialiased selection:bg-cyan-vivid/20 selection:text-cyan-vivid">
        <GlobalBackground />
        <Navbar />
        <main id="main-content" className="relative">
          <HeroSection />
          <OrigamiDivider />
          <EducationSection />
          <QuoteSection />
          <ApproachSection />
          <OrigamiDivider />
          <ExperienceSection />
          <OrigamiDivider />
          <ProjectsSection />
          <OrigamiDivider />
          <SkillsSection />
          <AchievementsSection />
          <OrigamiDivider />
          <CertificationsSection />
          <OrigamiDivider />
          <PatentsSection />
          <OrigamiDivider />
          <BeyondSection />
          <OrigamiDivider />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
