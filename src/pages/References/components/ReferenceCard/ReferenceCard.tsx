import { Reference } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

  const getTypeConfig = (ref: Reference) => {
    if (ref.mission.includes("Faisabilité")) {
      return {
        color: "#3B82F6",
        bgColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.2)",
        label: "Faisabilité",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        )
      };
    }
    if (
      ref.mission.includes("Assistance") ||
      ref.mission.includes("Programmiste")
    ) {
      return {
        color: "#F59E0B",
        bgColor: "rgba(245, 158, 11, 0.1)",
        borderColor: "rgba(245, 158, 11, 0.2)",
        label: "AMO",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2V18h2zm14.5-13c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5z"/>
          </svg>
        )
      };
    }
    return {
      color: "#EF4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
      borderColor: "rgba(239, 68, 68, 0.2)",
      label: "Maîtrise d'œuvre",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
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
    <motion.article
      className={`reference-card-clean ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-label={`Référence ${reference.name} à ${reference.location}`}
    >
      {/* En-tête avec badge et titre */}
      <header className="card-header">
        <div 
          className="type-badge" 
          style={{ 
            color: typeConfig.color,
            backgroundColor: typeConfig.bgColor,
            borderColor: typeConfig.borderColor
          }}
        >
          {typeConfig.icon}
          <span>{typeConfig.label}</span>
        </div>

        <h3 className="card-title">{reference.name}</h3>
        
        <div className="location-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>{reference.location}</span>
        </div>
      </header>

      {/* Zone d'informations principales */}
      <main className="card-main">
        {/* Statistiques en ligne claire */}
        <div className="stats-row">
          <div className="stat-compact">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 3v5h5V6h-5z"/>
            </svg>
            <div>
              <span className="stat-value">{reference.year}</span>
              <span className="stat-label">Année</span>
            </div>
          </div>

          <div className="stat-compact">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
            </svg>
            <div>
              <span className="stat-value">{(reference.cost_eur_ht / 1000).toFixed(0)}k€</span>
              <span className="stat-label">Budget</span>
            </div>
          </div>

          <div className="stat-compact">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/>
            </svg>
            <div>
              <span className="stat-value">{reference.total_area_m2.toLocaleString()}m²</span>
              <span className="stat-label">Surface</span>
            </div>
          </div>
        </div>

        {/* Description courte */}
        {reference.description && (
          <p className="card-description">{reference.description}</p>
        )}
      </main>

      {/* Actions en bas */}
      <footer className="card-footer">
        <AnimatePresence>
          {isHovered && reference.page && (
            <motion.button
              className="view-catalogue-btn"
              onClick={navigateToCatalogue}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Voir la page ${reference.page} du catalogue`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <span>Page {reference.page}</span>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="card-actions">
          {isSelected && (
            <div className="selection-indicator" aria-label="Élément sélectionné">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          )}
        </div>
      </footer>
    </motion.article>
  );
};

export default ReferenceCard;
