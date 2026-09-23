import React, { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryData';

export default function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
    document.body.style.overflow = '';
  }, []);

  const showNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  }, [activePhotoIndex]);

  const showPrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  }, [activePhotoIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, closeLightbox, showNext, showPrev]);

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        
        <div className="sec-header">
          <span className="eyebrow">Фотогалерея • Моменты сцены</span>
          <h2 className="sec-title">
            Өнер мен <em>шабыт сәттері</em>
          </h2>
          <p className="sec-sub">
            Баку гастролі, мектеп сахнасы, Winter Ball қойылымдары мен 
            дайындық сәттерінің шынайы фотошежіресі.
          </p>
        </div>

        {/* Gallery Grid 16:10 */}
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="gallery-card"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(index); }}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy" 
                className="gallery-img"
              />
              <div className="gallery-meta-bar">
                <span className="gallery-cat-chip">{item.category}</span>
                <span className="gallery-title-text">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Clean Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Жабу">
              <X size={22} />
            </button>

            <button className="lightbox-arrow-btn prev" onClick={showPrev} aria-label="Алдыңғы">
              <ChevronLeft size={24} />
            </button>

            <div className="lightbox-frame">
              <img
                src={GALLERY_ITEMS[activePhotoIndex].image}
                alt={GALLERY_ITEMS[activePhotoIndex].title}
                className="lightbox-img"
              />
              <div className="lightbox-caption-row">
                <strong className="lightbox-caption-title">{GALLERY_ITEMS[activePhotoIndex].title}</strong>
                <span className="lightbox-caption-counter">
                  {activePhotoIndex + 1} / {GALLERY_ITEMS.length} • {GALLERY_ITEMS[activePhotoIndex].location}
                </span>
              </div>
            </div>

            <button className="lightbox-arrow-btn next" onClick={showNext} aria-label="Келесі">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
