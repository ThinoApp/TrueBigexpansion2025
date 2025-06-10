import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import "./realisations.scss";

interface RealisationsProps {
  onNavigateToServices: () => void;
  onNavigateToReferences: () => void;
}

const projects = [
  {
    id: 1,
    title: "BOURGES - STADE ALFRED DEPÈGE",
    location: "BOURGES 18000",
    year: "2025",
    category: "Équipements Sportifs",
    description:
      "Agrandissement et rénovation complète d'une piste d'athlétisme 8 couloirs avex agrés sportifs et remise à niveau de l'éclairage",
    image: "/images/Realisations/STADE BOURGES 18000.jpg",
    stats: ["Piste 8 couloirs", "400m homologuée", "Éclairage LED"],
    tags: ["#Athlétisme", "#Rénovation", "#ÉquipementSportif"],
  },
  {
    id: 2,
    title: "BEAUGENCY - STADE BEL AIR",
    location: "BEAUGENCY",
    year: "2025",
    category: "Équipements Sportifs",
    description:
      "Stade de Bel Air - Construction d'un terrain de football et d'un bâtiment vestiaires niveau T3 FFF",
    image: "/images/Realisations/BEAUGENCY - STADE BEL AIR.jpg",
    stats: ["Terrain de football", "Bâtiment vestiaires", "Éclairage LED"],
    tags: ["#Football", "#Rénovation", "#ÉquipementSportif"],
  },
  // {
  //   id: 2,
  //   title: "Zone CrossTraining Pro",
  //   location: "Bordeaux, France",
  //   year: "2023",
  //   category: "Équipements Fonctionnels",
  //   description:
  //     "Espace fonctionnel équipé pour le CrossTraining avec racks, barres olympiques, et zones d'entraînement polyvalentes.",
  //   image: "/images/MEUDON/IMG_4224.jpeg",
  //   stats: ["200m² dédiés", "Équipement Rogue", "Zone libre"],
  //   tags: ["#CrossTraining", "#Fonctionnel", "#Performance"],
  // },
  // {
  //   id: 3,
  //   title: "Studio Cardio Connecté",
  //   location: "Nantes, France",
  //   year: "2023",
  //   category: "Équipements Cardio",
  //   description:
  //     "Espace cardio nouvelle génération avec vélos, tapis et rameurs connectés offrant une expérience immersive.",
  //   image: "/images/MEUDON/IMG_5886.jpeg",
  //   stats: ["30 machines", "Écrans HD", "App dédiée"],
  //   tags: ["#Cardio", "#Innovation", "#Connected"],
  // },
];

const Realisations = ({
  onNavigateToServices,
  onNavigateToReferences,
}: RealisationsProps) => {
  const [isEntering, setIsEntering] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  // const containerRef = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start start", "end start"],
  // });

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < -50 && window.scrollY === 0) {
      onNavigateToServices();
    }
  };

  useEffect(() => {
    setIsEntering(true);
  }, []);

  return (
    <PageTransition isEntering={isEntering}>
      <motion.div
        className="Realisations"
        onWheel={handleWheel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Image de fond */}
        <div className="background-image" />

        {/* Vagues animées */}
        <div className="waves-container">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="wave-path"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="wave-parallax">
              <use
                href="#wave-path"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.05)"
              />
              <use
                href="#wave-path"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.07)"
              />
              <use
                href="#wave-path"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.03)"
              />
              <use
                href="#wave-path"
                x="48"
                y="7"
                fill="rgba(255,255,255,0.01)"
              />
            </g>
          </svg>
        </div>

        {/* Grille de fond */}
        <div className="pattern-grid" />

        {/* En-tête flottant */}
        <header className="floating-header">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Réalisations
          </motion.h1>
        </header>

        {/* Navigation des projets */}
        <nav className="project-nav">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-nav-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() =>
                setSelectedProject(
                  selectedProject === project.id ? null : project.id
                )
              }
            >
              <span className="project-number">0{index + 1}</span>
              <span className="project-title">{project.title}</span>
            </motion.div>
          ))}
        </nav>

        {/* Visualisation du projet */}
        <div className="project-showcase">
          {/* Écran d'accueil par défaut */}
          <motion.div
            className={`welcome-screen ${
              selectedProject === null ? "active" : ""
            }`}
            initial={false}
            animate={{
              opacity: selectedProject === null ? 1 : 0,
              scale: selectedProject === null ? 1 : 0.95,
              filter: selectedProject === null ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="welcome-content">
              <h2>Nos Réalisations</h2>
              <p>
                Découvrez nos projets innovants en matière d'architecture et
                d'urbanisme durable.
              </p>
              <div className="project-preview-grid">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="project-preview"
                    onClick={() => setSelectedProject(project.id)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={project.image} alt={project.title} />
                    <div className="preview-overlay">
                      <h3>{project.title}</h3>
                      <p>{project.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projets détaillés */}
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`project-content ${
                selectedProject === project.id ? "active" : ""
              }`}
              initial={false}
              animate={{
                opacity: selectedProject === project.id ? 1 : 0,
                scale: selectedProject === project.id ? 1 : 0.95,
                filter:
                  selectedProject === project.id ? "blur(0px)" : "blur(10px)",
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="project-media">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="project-overlay">
                  <div className="project-info">
                    <h2>{project.title}</h2>
                    <div className="project-meta">
                      <span>{project.location}</span>
                      <span>{project.year}</span>
                      <span>{project.category}</span>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-stats">
                      {project.stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                          {stat}
                        </div>
                      ))}
                    </div>
                    <div className="project-tags">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={onNavigateToServices}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            ← Services
          </button>
          <button
            onClick={onNavigateToReferences}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            Références →
          </button>
        </div>

        {/* Bouton de navigation */}
        <motion.button
          className="nav-button"
          onClick={onNavigateToServices}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -2 }}
        >
          <span className="nav-icon">↑</span>
          <span className="nav-text">Services</span>
        </motion.button>
      </motion.div>
    </PageTransition>
  );
};

export default Realisations;
