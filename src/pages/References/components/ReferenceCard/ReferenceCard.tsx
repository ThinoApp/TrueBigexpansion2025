import { Reference } from '../../types';
import referencesData from '../../../../data/references.json';
import './ReferenceCard.scss';

interface ReferenceCardProps {
  reference: Reference;
  isSelected: boolean;
  onClick: () => void;
}

const ReferenceCard = ({ reference, isSelected, onClick }: ReferenceCardProps) => {
  const getColorByType = (ref: Reference) => {
    if (referencesData.FAISABILITE.some((r) => r.id === ref.id)) {
      return "#00ffff";
    }
    if (referencesData.AMO.some((r) => r.id === ref.id)) {
      return "#ffff00";
    }
    return "#ff69b4";
  };

  const getTypeLabel = (ref: Reference) => {
    if (referencesData.FAISABILITE.some((r) => r.id === ref.id)) {
      return "Études de faisabilité";
    }
    if (referencesData.AMO.some((r) => r.id === ref.id)) {
      return "Assistance à maîtrise d'ouvrage";
    }
    return "Maîtrise d'œuvre";
  };

  const getBackgroundImage = (ref: Reference) => {
    // Check if it's in Meudon
    if (ref.lieu.includes("MEUDON")) {
      return "/images/MEUDON/IMG_4224.jpeg";
    }
    // Check if it's in Bourges
    if (ref.lieu.includes("BOURGES")) {
      return "/images/BOURGES RIMBAULT/DJI_0676.JPG";
    }
    // For references in Mayotte (based on coordinates)
    if (ref.lat < 0) {
      return "/images/SADA/Capture d'écran 2023-07-21 à 13.08.28.png";
    }
    // Default image for other locations
    return "/images/BOURGES RIMBAULT/DJI_0879.JPG";
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
      <h3>{reference.title}</h3>
      <div
        className="reference-type"
        style={{ backgroundColor: getColorByType(reference) }}
      >
        {getTypeLabel(reference)}
      </div>
      <p className="reference-location">{reference.lieu}</p>
      <div className="reference-details">
        <span>Année: {reference.annee}</span>
        {reference.prix && <span>Prix: {reference.prix}</span>}
        {reference.superficie && <span>Superficie: {reference.superficie}</span>}
      </div>
    </div>
  );
};

export default ReferenceCard;
