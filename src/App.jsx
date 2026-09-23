import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import RepertoireSearch from './components/RepertoireSearch';
import DombraTuner from './components/DombraTuner';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import JoinSection from './components/JoinSection';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="app-root">
      {/* Clean White Sticky Header */}
      <Header onOpenRegister={() => setIsRegisterOpen(true)} />

      <main>
        {/* Editorial NIS Hero with Photo Banner */}
        <Hero onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* About Club — 2 Column Layout */}
        <About onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* Stage Moments & Achievements */}
        <Achievements />

        {/* Repertoire Registry & Student Search */}
        <RepertoireSearch onShowToast={showToast} />

        {/* Interactive Dombra Tuner */}
        <DombraTuner />

        {/* Gallery 16:10 Grid */}
        <Gallery />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Join Club & WhatsApp QR */}
        <JoinSection 
          onOpenRegister={() => setIsRegisterOpen(true)} 
          onShowToast={showToast}
        />
      </main>

      {/* Corporate Light Footer */}
      <Footer />

      {/* Registration Modal Dialog */}
      <RegistrationModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice" role="alert">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
