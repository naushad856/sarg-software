import React, { useState, useEffect, useRef } from 'react';
import './About.css';

// Import your local images
import storyImg1 from '../assets/B12.webp';
import storyImg2 from '../assets/B14.avif';
import storyImg3 from '../assets/Hb06.png';

const AboutPage = () => {
  // State for dynamic counters
  const [happyCustomers, setHappyCustomers] = useState(0);
  const [toursCount, setToursCount] = useState(0);
  const [currentStoryImage, setCurrentStoryImage] = useState(0);
  const [hoveredGalleryItem, setHoveredGalleryItem] = useState(null);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const aboutGridRef = useRef(null);
  const statsRef = useRef(null);
  const agendaRef = useRef(null);
  const galleryRef = useRef(null);
  const ctaRef = useRef(null);
  
  // State for scroll animations
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isAgendaVisible, setIsAgendaVisible] = useState(false);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  
  // Story images slider
  const storyImages = [
    storyImg1,
    storyImg2,
    storyImg3
  ];

  // Gallery images with descriptions
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Mountain Adventure",
      description: "Exploring the majestic peaks"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Desert Safari",
      description: "Golden dunes under the sun"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Forest Trek",
      description: "Nature's green paradise"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Snow Mountains",
      description: "Winter wonderland"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Northern Lights",
      description: "Nature's light show"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Sunset Views",
      description: "Evening magic"
    },
    {
      id: 7,
      src: storyImg1,
      title: "Beach Paradise",
      description: "Tropical getaway"
    },
    {
      id: 8,
      src: storyImg2,
      title: "Cultural Heritage",
      description: "Ancient wonders"
    }
  ];

  // Agenda and Motivation data
  const agendaItems = [
    {
      id: 1,
      title: "Our Mission",
      description: "To provide unforgettable travel experiences that connect people with nature, culture, and adventure while promoting sustainable tourism.",
      icon: "🎯",
      color: "#2babe2"
    },
    {
      id: 2,
      title: "Our Vision",
      description: "To become the most trusted travel company in India, known for exceptional service, authentic experiences, and responsible tourism.",
      icon: "🚀",
      color: "#41e1c9"
    },
    {
      id: 3,
      title: "Our Values",
      description: "Integrity, sustainability, customer satisfaction, and respect for local communities and environments guide everything we do.",
      icon: "❤️",
      color: "#ff9900"
    }
  ];

  // Animate counters on component mount
  useEffect(() => {
    const animateCounter = (setter, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateCounter(setHappyCustomers, 12500);
    animateCounter(setToursCount, 850);
    
    // Simulate live counter updates
    const interval = setInterval(() => {
      setToursCount(prev => prev + 1);
    }, 30000);

    // Story image slider
    const imageSliderInterval = setInterval(() => {
      setCurrentStoryImage((prev) => (prev + 1) % storyImages.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(imageSliderInterval);
    };
  }, [storyImages.length]); // Fixed: Added storyImages.length as dependency

  // Setup intersection observers for scroll animations
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers - show all sections immediately
      setIsHeroVisible(true);
      setIsAboutVisible(true);
      setIsStatsVisible(true);
      setIsAgendaVisible(true);
      setIsGalleryVisible(true);
      setIsCtaVisible(true);
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observers = [];

    // Function to create observer for each section
    const createObserver = (ref, setVisible) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      if (ref.current) {
        observer.observe(ref.current);
        observers.push({ observer, ref });
      }
    };

    // Create observers for all sections
    createObserver(heroRef, setIsHeroVisible);
    createObserver(aboutGridRef, setIsAboutVisible);
    createObserver(statsRef, setIsStatsVisible);
    createObserver(agendaRef, setIsAgendaVisible);
    createObserver(galleryRef, setIsGalleryVisible);
    createObserver(ctaRef, setIsCtaVisible);

    return () => {
      observers.forEach(({ observer, ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Handle gallery item hover
  const handleGalleryHover = (id) => {
    setHoveredGalleryItem(id);
  };

  const handleGalleryLeave = () => {
    setHoveredGalleryItem(null);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`hero-section ${isHeroVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Shamudri Tourism</h1>
            <p className="hero-subtitle">Creating unforgettable travel experiences since 2012</p>
          </div>
        </div>
      </section>

      {/* Main Content - Image left, Information right */}
      <section className="about-content">
        <div className="container">
          <div 
            ref={aboutGridRef}
            className={`about-grid ${isAboutVisible ? 'visible' : ''}`}
          >
            <div className="about-img-container">
              {/* Clean Image Slider - No Controls */}
              <div className="story-image-slider">
                {storyImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`story-slide ${index === currentStoryImage ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}
              </div>
              <div className="img-overlay"></div>
            </div>
            <div className="about-info">
              <h2 className="section-title">Our Story</h2>

              
              <p className="about-description">
                Founded in 2012, Shamudri Tourism began as a small group of passionate travelers with a simple mission: to share the beauty of the world's diverse landscapes and rich cultural heritage with travelers from around the globe.
              </p>
              <p className="about-description">
                Over the years, we've curated unique journeys that go beyond typical tourist attractions, focusing on authentic experiences that connect travelers with local communities, nature, and themselves.
              </p>
              <p className="about-description">
                We believe that travel has the power to transform perspectives, build bridges between cultures, and create lifelong memories. Join us on a journey of discovery!
              </p>
            </div>
          </div>
        </div>
      </section>

    {/* Stats Section */}
<section 
  ref={statsRef}
  className={`stats-section ${isStatsVisible ? 'visible' : ''}`}
>
  <div className="container">
    <div className="section-header">
      <h2 className="section-title">Our Impact in Numbers</h2>
      <p className="section-subtitle">The journey so far, measured in smiles and experiences</p>
    </div>
    
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-circle">
          <div className="stat-icon">😊</div>
          <div className="wave-animation"></div>
        </div>
        <div className="stat-content">
          <div className="counter-container">
            <span className="plus-sign">+</span>
            <h3 className="stat-number">{happyCustomers.toLocaleString()}</h3>
          </div>
          <p className="stat-label">Happy Travelers</p>
          <div className="stat-graph">
            <div className="graph-bar" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-circle">
          <div className="stat-icon">🚌</div>
          <div className="pulse-animation"></div>
        </div>
        <div className="stat-content">
          <div className="counter-container">
            <h3 className="stat-number">{toursCount}</h3>
            <span className="plus-sign">+</span>
          </div>
          <p className="stat-label">Tours Completed</p>
          <div className="live-container">
            <div className="live-dot"></div>
            <span className="live-text">Live Counter</span>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-circle">
          <div className="stat-icon">📍</div>
          <div className="globe-animation"></div>
        </div>
        <div className="stat-content">
          <div className="counter-container">
            <h3 className="stat-number">45</h3>
            <span className="plus-sign">+</span>
          </div>
          <p className="stat-label">Destinations Worldwide</p>
          <div className="location-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-circle">
          <div className="stat-icon">🌟</div>
          <div className="sparkle-animation"></div>
        </div>
        <div className="stat-content">
          <div className="counter-container">
            <h3 className="stat-number">4.9</h3>
            <span className="plus-sign">/5</span>
          </div>
          <p className="stat-label">Customer Rating</p>
          <div className="stars-container">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">⭐</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="stats-footer">
      <p className="stats-note">*Growing every day with your trust and support</p>
    </div>
  </div>
</section>

      {/* Agenda & Motivation Section */}
      <section 
        ref={agendaRef}
        className={`agenda-section ${isAgendaVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title text-center">Our Agenda & Motivation</h2>
          <p className="section-subtitle text-center">What drives us to deliver exceptional travel experiences</p>
          
          <div className="agenda-grid">
            {agendaItems.map((item, index) => (
              <div 
                className={`agenda-card card-${index + 1}`} 
                key={item.id} 
                style={{ '--card-color': item.color }}
              >
                <div className="agenda-icon" style={{ color: item.color }}>{item.icon}</div>
                <h3 className="agenda-title">{item.title}</h3>
                <p className="agenda-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section with Enhanced Animations */}
      <section 
        ref={galleryRef}
        className={`gallery-section ${isGalleryVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <div className="header-decoration"> 
              <h2 className="section-title">Our Travel Gallery</h2>
            </div>
            <p className="section-subtitle">Beautiful moments captured from our global journeys</p>
          </div>
          
          <div className="gallery-grid">
            {galleryImages.map((item, index) => (
              <div 
                className="gallery-item" 
                key={item.id}
                data-index={index}
                onMouseEnter={() => handleGalleryHover(item.id)}
                onMouseLeave={handleGalleryLeave}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: hoveredGalleryItem === item.id ? 'translateY(-15px)' : 'translateY(0)'
                }}
              >
                <div className="gallery-item-inner">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="gallery-img" 
                    style={{
                      transform: hoveredGalleryItem === item.id ? 'scale(1.15) translateY(-10px)' : 'scale(1)'
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <h4 className="gallery-title">{item.title}</h4>
                      <p className="gallery-desc">{item.description}</p>
                      <span className="gallery-explore">Explore →</span>
                    </div>
                  </div>
                  <div className="gallery-number">{item.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className={`cta-section ${isCtaVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="cta-title">Ready for Your Next Adventure?</h2>
          <p className="cta-text">Join thousands of happy travelers who have explored the world us</p>
          <button className="cta-button">Explore Our Tours</button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;