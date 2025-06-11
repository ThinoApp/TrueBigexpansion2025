import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import { agencies } from "../../data/agencies";
import "./agencies.scss";
import "./agencies-mobile.scss"; // Import des styles mobiles

const Agencies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Détection de l'appareil mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    setIsEntering(true);
  }, []);

  const handleScroll = async (direction: "prev" | "next") => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (direction === "next" && currentIndex < agencies.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Gestion des événements tactiles pour le balayage
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    // Si le mouvement est suffisamment important (plus de 50px)
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Balayage vers la droite - agence précédente
        handleScroll("prev");
      } else {
        // Balayage vers la gauche - agence suivante
        handleScroll("next");
      }
    }
  };

  // On utilise directement l'image optimisée
  const backgroundStyle = {
    "--current-background": `url(${agencies[currentIndex].imageMin})`,
  } as React.CSSProperties;

  return (
    <PageTransition isEntering={isEntering}>
      <div
        className={`agencies-container ${isMobile ? "mobile-view" : ""}`}
        ref={containerRef}
        style={backgroundStyle}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="agencies-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 200,
            }}
          >
            Nos Agences
          </motion.h1>
        </motion.div>

        <div className="agencies-carousel">
          <div className="navigation">
            <motion.button
              className={`nav-button ${currentIndex === 0 ? "disabled" : ""}`}
              onClick={() => handleScroll("prev")}
              whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>←</span>
            </motion.button>
            <div className="progress-bar">
              <motion.div
                className="progress"
                style={{ scaleX: smoothProgress }}
              />
            </div>
            <motion.button
              className={`nav-button ${
                currentIndex === agencies.length - 1 ? "disabled" : ""
              }`}
              onClick={() => handleScroll("next")}
              whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>→</span>
            </motion.button>
          </div>

          <div className="carousel-container">
            <AnimatePresence mode="wait" initial={false}>
              {agencies.map(
                (agency, index) =>
                  index === currentIndex && (
                    <motion.div
                      key={agency.id}
                      className="carousel-item"
                      initial={{
                        opacity: 0,
                        x: index > currentIndex ? "100%" : "-100%",
                      }}
                      animate={{
                        opacity: 1,
                        x: "0%",
                      }}
                      exit={{
                        opacity: 0,
                        x: index < currentIndex ? "-100%" : "100%",
                        position: "absolute",
                      }}
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="agency-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="agency-image my-4 !h-full"
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          style={{ backgroundImage: `url(${agency.image})` }}
                        >
                          <div className="image-overlay" />
                          <div className="glitch-effect" />
                        </motion.div>

                        <div className="agency-info">
                          <motion.div
                            className="info-content"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <motion.h2
                              className="agency-title"
                              initial={{ clipPath: "inset(0 100% 0 0)" }}
                              animate={{ clipPath: "inset(0 0% 0 0)" }}
                              transition={{ duration: 1, delay: 0.5 }}
                            >
                              {agency.name}
                            </motion.h2>

                            <motion.p
                              className="location"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                            >
                              {agency.location}
                            </motion.p>

                            <motion.div
                              className="contact-info"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 }}
                            >
                              <p className="address">{agency.address}</p>
                              <p className="phone">{agency.phone}</p>
                              <p className="email">{agency.email}</p>
                            </motion.div>

                            <motion.button
                              className="discover-button"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.9 }}
                              whileHover={{
                                scale: 1.05,
                                textShadow: "0 0 8px rgb(255, 255, 255)",
                                boxShadow: "0 0 8px rgb(255, 255, 255)",
                              }}
                            >
                              Découvrir
                            </motion.button>
                            <motion.div
                              className="team-section"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.5 }}
                            >
                              <h3>Notre équipe</h3>
                              <div className="team-grid">
                                {agency.team.map((member, idx) => (
                                  <motion.div
                                    key={member.name}
                                    className="team-member"
                                    initial={{ scale: 0, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    transition={{
                                      delay: 1 + idx * 0.1,
                                      type: "spring",
                                      stiffness: 200,
                                    }}
                                  >
                                    <div
                                      className="member-photo"
                                      style={{
                                        backgroundImage: `url(${member.photo})`,
                                      }}
                                    >
                                      <div className="member-overlay" />
                                    </div>
                                    <div className="member-info">
                                      <h4>{member.name}</h4>
                                      <p>{member.role}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Indicateurs de navigation pour mobile */}
          {isMobile && (
            <div className="mobile-indicators">
              {agencies.map((_, idx) => (
                <div
                  key={idx}
                  className={`indicator ${
                    currentIndex === idx ? "active" : ""
                  }`}
                  onClick={() => {
                    setCurrentIndex(idx);
                  }}
                />
              ))}
            </div>
          )}

          {/* Instructions de balayage pour mobile */}
          {isMobile && (
            <div className="swipe-instructions">
              <div className="swipe-icon">←</div>
              <span>Balayez pour naviguer</span>
              <div className="swipe-icon">→</div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Agencies;
