import { Reference } from "../../types";
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
  const getColorByType = (ref: Reference) => {
    if (ref.mission.includes("Faisabilité")) {
      return "#00ffff";
    }
    if (
      ref.mission.includes("Assistance") ||
      ref.mission.includes("Programmiste")
    ) {
      return "#ffff00";
    }
    return "#ff69b4";
  };

  const getTypeLabel = (ref: Reference) => {
    if (ref.mission.includes("Faisabilité")) {
      return "Études de faisabilité";
    }
    if (
      ref.mission.includes("Assistance") ||
      ref.mission.includes("Programmiste")
    ) {
      return "Assistance à maîtrise d'ouvrage";
    }
    return "Maîtrise d'œuvre";
  };

  const getBackgroundImage = (ref: Reference) => {
    // Check if it's in Meudon
    if (ref.location.includes("Meudon")) {
      return "/images/MEUDON/IMG_4224.jpeg";
    }
    // Check if it's in Bourges
    if (ref.location.includes("Bourges")) {
      return "/images/BOURGES RIMBAULT/DJI_0676.JPG";
    }
    // For references in Mayotte
    if (ref.location.includes("97")) {
      return "/images/SADA/Capture d'écran 2023-07-21 à 13.08.28.png";
    }
    // Default image for other locations
    return "/images/BOURGES RIMBAULT/DJI_0879.JPG";
  };

  // Fonction pour naviguer vers le catalogue à la page correspondante
  const navigateToCatalogue = (event: React.MouseEvent) => {
    event.stopPropagation(); // Empêcher le déclenchement du onClick du parent

    if (!onNavigateToCatalogue) return;

    if (reference.page) {
      onNavigateToCatalogue(reference.page);
    } else {
      // Si aucune page n'est définie, naviguer vers la première page du catalogue
      onNavigateToCatalogue(1);
    }
  };

  return (
    <div
      className={`reference-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('${getBackgroundImage(
          reference
        )}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3>{reference.name}</h3>
      <div
        className="reference-type"
        style={{ backgroundColor: getColorByType(reference) }}
      >
        {getTypeLabel(reference)}
      </div>
      <p className="reference-location">{reference.location}</p>
      <div className="reference-details">
        <span>Année: {reference.year}</span>
        <span>Budget: {reference.cost_eur_ht.toLocaleString()} € HT</span>
        <span>Surface totale: {reference.total_area_m2} m²</span>
        {reference.built_area_m2 > 0 && (
          <span>Surface bâtie: {reference.built_area_m2} m²</span>
        )}
      </div>
      <p className="reference-description">{reference.description}</p>

      {/* Bouton pour voir dans le catalogue */}
      {reference.page && (
        <button
          className="view-in-catalogue-btn"
          onClick={navigateToCatalogue}
          title={`Voir page ${reference.page} du catalogue`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Page {reference.page + 1}</span>
        </button>
      )}
    </div>
  );
};

export default ReferenceCard;
