import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import "./services.scss";

const services = [
  {
    id: 1,
    title: "Conception Réalisation",
    description:
      "Nous concevons et réalisons vos projets d'équipements sportifs et culturels avec une approche innovante et durable. Notre expertise technique garantit une exécution précise de la conception à la réalisation.",
    image: "/images/hero_services/DJI_0879.JPG", // Vue aérienne du projet
  },
  {
    id: 2,
    title: "Assistance à Maîtrise d'Ouvrage",
    description:
      "Nous accompagnons les collectivités dans leurs prises de décisions techniques et budgétaires. Notre expertise permet d'optimiser les ressources tout en respectant les objectifs du projet.",
    image: "/images/hero_services/image_processing20250424-21341-tz6yfk.jpeg", // Vue du site
  },
  {
    id: 3,
    title: "Maîtrise d'Oeuvre",
    description:
      "De la conception à l'exécution, nous assurons la coordination complète de votre projet. Notre approche intégrée garantit une cohérence parfaite entre la vision architecturale et sa réalisation technique.",
    image: "/images/hero_services/MAX_0006 2.JPG", // Vue du chantier
  },
  {
    id: 4,
    title: "Programmation",
    description:
      "Nous établissons une programmation détaillée de vos projets, intégrant les aspects techniques, fonctionnels et environnementaux. Notre méthodologie assure une planification optimale des ressources.",
    image: "/images/hero_services/Stade-Charlety_Paris_MONDO-track.jpeg", // Vue du site
  },
  {
    id: 5,
    title: "Pilotage d'Opérations",
    description:
      "Nous pilotons vos opérations de A à Z, assurant une gestion rigoureuse des délais, des coûts et de la qualité. Notre expertise en gestion de projet garantit une exécution fluide et maîtrisée.",
    image: "/images/hero_services/20250523_101909.jpg", // Vue du site en construction
  },
];

interface ServicesProps {
  onNavigateToHero: () => void;
  onNavigateToRealisations: () => void;
}

const Services = ({
  onNavigateToHero,
  onNavigateToRealisations,
}: ServicesProps) => {
  const [isEntering, setIsEntering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = React.createRef(null);
  const scrollTimeout = React.createRef<NodeJS.Timeout | null>(null);
  const isScrolling = React.createRef(false);
  const lastScrollTime = React.createRef(Date.now());
  const scrollThreshold = 50; // Seuil de défilement en pixels
  const scrollCooldown = 500; // Temps minimum entre les changements de slide en ms

  useEffect(() => {
    setIsEntering(true);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    const currentTime = Date.now();
    if (
      isScrolling.current ||
      currentTime - lastScrollTime.current < scrollCooldown
    ) {
      return;
    }

    // Défilement vers le haut -> Hero
    if (e.deltaY < -scrollThreshold && activeIndex === 0) {
      onNavigateToHero();
      return;
    }

    // Défilement vers le bas -> Réalisations
    if (e.deltaY > scrollThreshold && activeIndex === services.length - 1) {
      onNavigateToRealisations();
      return;
    }

    // Gestion du défilement horizontal pour le carousel
    if (Math.abs(e.deltaY) > scrollThreshold) {
      isScrolling.current = true;
      lastScrollTime.current = currentTime;

      if (e.deltaY > 0) {
        // Défilement vers le bas -> slide suivante
        setActiveIndex((prev) =>
          prev < services.length - 1 ? prev + 1 : prev
        );
      } else {
        // Défilement vers le haut -> slide précédente
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, scrollCooldown);
    }
  };

  return (
    <PageTransition isEntering={isEntering}>
      <motion.section
        ref={ref}
        className="Services min-h-screen relative bg-black overflow-hidden"
        onWheel={handleWheel}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const startY = touch.clientY;

          const handleTouchEnd = (e: TouchEvent) => {
            const endY = e.changedTouches[0].clientY;
            if (startY - endY < -50) {
              // Direction inversée pour le retour
              onNavigateToHero();
            }
            document.removeEventListener("touchend", handleTouchEnd);
          };

          document.addEventListener("touchend", handleTouchEnd);
        }}
      >
        {/* Background images avec transition horizontale */}
        <div className="absolute inset-0 z-0">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                scale: activeIndex === index ? 1 : 1.1,
                filter:
                  activeIndex === index
                    ? "brightness(0.7) blur(0px)"
                    : "brightness(0.5) blur(8px)",
              }}
              transition={{
                duration: 0.8,
                ease: [0.645, 0.045, 0.355, 1.0],
              }}
              className="absolute inset-0 will-change-transform"
              style={{
                backgroundImage: `url("${service.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 z-10 bg-pattern opacity-30" />

        {/* Contenu */}
        <div className="relative z-20 container mx-auto px-4 h-screen flex items-center">
          <div className="w-full flex justify-between items-center">
            {/* Navigation gauche */}
            <motion.button
              whileHover={{ x: -5, scale: 1.2 }}
              onClick={() =>
                setActiveIndex((prev) =>
                  prev > 0 ? prev - 1 : services.length - 1
                )
              }
              className="text-white/70 hover:text-white transform-gpu text-4xl px-8 nav-button"
            >
              ←
            </motion.button>

            {/* Contenu central */}
            <div className="flex-1 max-w-4xl mx-auto relative min-h-[400px]">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 100, rotateY: -30 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x:
                      activeIndex === index
                        ? 0
                        : activeIndex > index
                        ? -100
                        : 100,
                    rotateY:
                      activeIndex === index
                        ? 0
                        : activeIndex > index
                        ? 30
                        : -30,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.645, 0.045, 0.355, 1.0],
                    opacity: { duration: 0.4 },
                  }}
                  className={`absolute w-full perspective ${
                    activeIndex === index
                      ? "pointer-events-auto"
                      : "pointer-events-none"
                  }`}
                  style={{
                    display: activeIndex === index ? "block" : "none",
                  }}
                >
                  <motion.h2
                    className="text-6xl md:text-7xl font-light text-white mb-12 glitch-text"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {service.title}
                    <span className="text-white/50 dot">.</span>
                  </motion.h2>
                  <motion.p
                    className="text-xl text-white/80 font-light leading-relaxed mx-auto px-4 service-description"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {service.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            {/* Navigation droite */}
            <motion.button
              whileHover={{ x: 5, scale: 1.2 }}
              onClick={() =>
                setActiveIndex((prev) =>
                  prev < services.length - 1 ? prev + 1 : 0
                )
              }
              className="text-white/70 hover:text-white transform-gpu text-4xl px-8 nav-button"
            >
              →
            </motion.button>
          </div>
        </div>

        {/* Indicateurs de progression et retour */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-6">
              {services.map((_, index) => (
                <motion.button
                  key={index}
                  className="progress-indicator-container"
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="progress-indicator-outer">
                    <motion.div
                      className="progress-indicator-inner"
                      initial={false}
                      animate={{
                        scale: activeIndex === index ? 1 : 0,
                        opacity: activeIndex === index ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <motion.div
                    className="progress-indicator-line"
                    initial={false}
                    animate={{
                      width: activeIndex === index ? "100%" : "0%",
                      opacity: activeIndex === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={onNavigateToHero}
              className="text-white/50 text-sm uppercase tracking-widest hover:text-white transition-colors duration-300 back-button"
              whileHover={{ y: 2, scale: 1.05 }}
            >
              Retour
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </PageTransition>
  );
};

export default Services;
