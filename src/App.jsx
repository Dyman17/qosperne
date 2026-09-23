import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import JoinSection from './components/JoinSection';
import RepertoireSubmissionBlock from './components/RepertoireSubmissionBlock';
import ToolsPage from './pages/ToolsPage';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.pathname.startsWith('/repertoire') ? 'repertoire' : 'home';
  });
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const page = window.location.pathname.startsWith('/repertoire') ? 'repertoire' : 'home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    const targetUrl = page === 'repertoire' ? '/repertoire' : '/';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="app-root">
      {/* Sticky Header with active page state and page switcher */}
      <Header 
        currentPage={currentPage}
        onNavigateHome={() => navigateTo('home')}
        onNavigateToRepertoire={() => navigateTo('repertoire')}
        onOpenRegister={() => setIsRegisterOpen(true)} 
      />

      <main>
        {currentPage === 'home' ? (
          <>
            {/* Editorial NIS Hero with Photo Banner */}
            <Hero onOpenRegister={() => setIsRegisterOpen(true)} />

            {/* Join Club & WhatsApp QR — Right at the top for instant registration */}
            <JoinSection 
              onOpenRegister={() => setIsRegisterOpen(true)} 
              onShowToast={showToast}
            />

            {/* Interactive Student Kui Submission Block: Name + Known Kuys -> Adds to Repertoire DB */}
            <RepertoireSubmissionBlock 
              onNavigateToRepertoire={() => navigateTo('repertoire')}
              onShowToast={showToast}
            />

            {/* About Club — 2 Column Layout */}
            <About onOpenRegister={() => setIsRegisterOpen(true)} />

            {/* Stage Moments & Achievements */}
            <Achievements />

            {/* Gallery 16:10 Grid */}
            <Gallery />

            {/* FAQ Accordion */}
            <FAQ />
          </>
        ) : (
          /* Dedicated Separate Tools Page (Repertoire Registry & Interactive Dombra Tuner) */
          <ToolsPage 
            onNavigateHome={() => navigateTo('home')}
            onShowToast={showToast}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        )}
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

