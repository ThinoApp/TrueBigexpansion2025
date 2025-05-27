import { Reference } from '../../types';
import referencesData from '../../../../data/references.json';
import { getCataloguePageForReference } from '../../../../data/catalogueMapping';
import './ReferenceCard.scss';

interface ReferenceCardProps {
  reference: Reference;
  isSelected: boolean;
  onClick: () => void;
  onNavigateToCatalogue?: (pageNumber: number) => void;
}

const ReferenceCard = ({ reference, isSelected, onClick, onNavigateToCatalogue }: ReferenceCardProps) => {
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
  
  // Fonction pour naviguer vers le catalogue à la page correspondante
  const navigateToCatalogue = (event: React.MouseEvent) => {
    event.stopPropagation(); // Empêcher le déclenchement du onClick du parent
    
    if (!onNavigateToCatalogue) return;
    
    const cataloguePage = getCataloguePageForReference(reference.id);
    
    if (cataloguePage !== undefined) {
      onNavigateToCatalogue(cataloguePage);
    } else {
      // Si aucune page correspondante n'est trouvée, naviguer vers la première page du catalogue
      onNavigateToCatalogue(0);
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
      
      {/* Bouton pour voir dans le catalogue */}
      {getCataloguePageForReference(reference.id) !== undefined && (
        <button 
          className="view-in-catalogue-btn" 
          onClick={navigateToCatalogue}
          title="Voir dans le catalogue"
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
          <span>Voir dans le catalogue</span>
        </button>
      )}
    </div>
  );
};

export default ReferenceCard;
