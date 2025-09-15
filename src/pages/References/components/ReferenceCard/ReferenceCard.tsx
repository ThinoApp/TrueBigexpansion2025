import { Reference } from "../../types";
import { motion } from "framer-motion";
import "./ReferenceCard.scss";

interface ReferenceCardProps {
  reference: Reference;
  isSelected: boolean;
  onClick: () => void;
  onNavigateToCatalogue?: (pageNumber: number) => void;
}

const ReferenceCard = ({
  reference,
  isSelected,
  onClick,
  onNavigateToCatalogue,
}: ReferenceCardProps) => {
  const getTypeConfig = (ref: Reference) => {
    if (ref.mission.includes("Faisabilité")) {
      return {
        color: "#00d4ff",
        gradient: "from-cyan-400 to-blue-500",
        label: "Études de faisabilité",
        icon: "🔍"
      };
    }
    if (
      ref.mission.includes("Assistance") ||
      ref.mission.includes("Programmiste")
    ) {
      return {
        color: "#ffd700",
        gradient: "from-yellow-400 to-orange-500", 
        label: "Assistance à maîtrise d'ouvrage",
        icon: "🤝"
      };
    }
    return {
      color: "#ff6b9d",
      gradient: "from-pink-400 to-rose-500",
      label: "Maîtrise d'œuvre",
      icon: "🏗️"
    };
  };

  // const getBackgroundImage = (ref: Reference) => {
  //   // Check if it's in Meudon
  //   if (ref.location.includes("Meudon")) {
  //     return "/images/MEUDON/IMG_4224.jpeg";
  //   }
  //   // Check if it's in Bourges
  //   if (ref.location.includes("Bourges")) {
  //     return "/images/BOURGES RIMBAULT/DJI_0676.JPG";
  //   }
  //   // For references in Mayotte
  //   if (ref.location.includes("97")) {
  //     return "/images/SADA/Capture d'écran 2023-07-21 à 13.08.28.png";
  //   }
  //   // Default image for other locations
  //   return "/images/BOURGES RIMBAULT/DJI_0879.JPG";
  // };

  const typeConfig = getTypeConfig(reference);

  // Fonction pour naviguer vers le catalogue à la page correspondante
  const navigateToCatalogue = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!onNavigateToCatalogue) return;
    onNavigateToCatalogue(reference.page || 1);
  };

  return (
    <motion.div
      className={`reference-card-modern ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94],
        layout: { duration: 0.3 }
      }}
      layout
    >
      {/* Image de fond avec overlay dynamique */}
      <div className="card-background">
        <div 
          className="card-image"
          style={{
            backgroundImage: `url('/images/catalogue/${reference.page || 0}.jpg')`,
          }}
        />
        <div className="card-overlay" />
        <div className="card-gradient" />
      </div>

      {/* Badge de type flottant */}
      <motion.div 
        className={`type-badge bg-gradient-to-r ${typeConfig.gradient}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="type-icon">{typeConfig.icon}</span>
        <span className="type-label">{typeConfig.label}</span>
      </motion.div>

      {/* Contenu principal */}
      <div className="card-content">
        {/* Header avec titre et localisation */}
        <div className="card-header">
          <motion.h3 
            className="card-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {reference.name}
          </motion.h3>
          <motion.div 
            className="location-badge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
            <span>{reference.location}</span>
          </motion.div>
        </div>

        {/* Statistiques avec icônes */}
        <motion.div 
          className="card-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-item">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <span className="stat-label">Année</span>
              <span className="stat-value">{reference.year}</span>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <span className="stat-label">Budget</span>
              <span className="stat-value">{reference.cost_eur_ht.toLocaleString()}€</span>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">📐</div>
            <div className="stat-content">
              <span className="stat-label">Surface</span>
              <span className="stat-value">{reference.total_area_m2}m²</span>
            </div>
          </div>
        </motion.div>

        {/* Description avec effet de fade */}
        <motion.p 
          className="card-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {reference.description}
        </motion.p>
      </div>

      {/* Bouton catalogue flottant */}
      {reference.page && (
        <motion.button
          className="catalogue-btn"
          onClick={navigateToCatalogue}
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <span>P.{reference.page}</span>
        </motion.button>
      )}

      {/* Effet de brillance au hover */}
      <div className="card-shine" />
      
      {/* Indicateur de sélection */}
      {isSelected && (
        <motion.div 
          className="selection-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReferenceCard;
