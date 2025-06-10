import { useState, useCallback, useEffect, TouchEvent } from "react";
import projectsData from "../../data/BIG Project JSON.json";
import { Reference, Filters } from "./types";
import ReferenceFilters from "./components/ReferenceFilters/ReferenceFilters";
// import GlobeVisualization from "./components/GlobeVisualization/GlobeVisualization";
import ReferencesList from "./components/ReferencesList/ReferencesList";
import "./references.scss";

interface ReferencesProps {
  onNavigateToCatalogue?: (pageNumber: number) => void;
}

const References = ({ onNavigateToCatalogue }: ReferencesProps) => {
  const [selectedReference, setSelectedReference] = useState<Reference | null>(
    null
  );
  const [references, setReferences] = useState<Reference[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>({
    type: [],
    year: null,
    location: "",
    minPrice: null,
    maxPrice: null,
    projectType: "",
    category: "",
  });

  // Détection de l'appareil mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);

      // Masquer automatiquement les filtres sur mobile
      if (window.innerWidth < 768) {
        setShowFilters(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Process the JSON data when the component mounts
  useEffect(() => {
    const allReferences: Reference[] = [];

    // Process each category of projects
    Object.entries(projectsData.projects).forEach(([category, projects]) => {
      projects.forEach((project: any) => {
        allReferences.push({
          ...project,
          category,
        });
      });
    });

    setReferences(allReferences);
  }, []);

  // Gestion des événements tactiles
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Vérifier si le mouvement est plus horizontal que vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Vérifier si le mouvement est suffisamment important (plus de 50px)
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Balayage vers la droite - montrer les filtres
          setShowFilters(true);
        } else {
          // Balayage vers la gauche - cacher les filtres
          setShowFilters(false);
        }
      }
    }
  };

  const getFilteredReferences = useCallback(() => {
    let filtered = references;

    // Filter by mission type
    if (filters.type.length > 0) {
      filtered = filtered.filter((ref) => {
        if (
          filters.type.includes("FAISABILITE") &&
          ref.mission.includes("Faisabilité")
        ) {
          return true;
        }
        if (
          filters.type.includes("AMO") &&
          (ref.mission.includes("Assistance") ||
            ref.mission.includes("Programmiste"))
        ) {
          return true;
        }
        if (filters.type.includes("MOE") && ref.mission.includes("ESQ")) {
          return true;
        }
        return false;
      });
    }

    // Filter by year
    if (filters.year) {
      filtered = filtered.filter((ref) => ref.year === filters.year);
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((ref) =>
        ref.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by min price
    if (filters.minPrice !== null) {
      filtered = filtered.filter(
        (ref) => ref.cost_eur_ht >= (filters.minPrice || 0)
      );
    }

    // Filter by max price
    if (filters.maxPrice !== null) {
      filtered = filtered.filter(
        (ref) => ref.cost_eur_ht <= (filters.maxPrice || Infinity)
      );
    }

    // Filter by project type
    if (filters.projectType) {
      filtered = filtered.filter((ref) => {
        const name = ref.name.toUpperCase();
        const description = ref.description.toUpperCase();
        const type = filters.projectType.toUpperCase();

        if (type === "AUTRES") {
          return ![
            "GYMNASE",
            "STADE DE FOOTBALL",
            "SALLE POLYVALENTE",
            "ÉQUIPEMENT AQUATIQUE",
            "PLATEAU SPORTIF",
          ].some(
            (t) =>
              name.includes(t.toUpperCase()) ||
              description.includes(t.toUpperCase())
          );
        }
        return name.includes(type) || description.includes(type);
      });
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((ref) => ref.category === filters.category);
    }

    return filtered;
  }, [filters, references]);

  const handleReferenceSelect = useCallback(
    (ref: Reference) => {
      setSelectedReference(ref);

      // Sur mobile, faire défiler vers le haut lorsqu'une référence est sélectionnée
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [isMobile]
  );

  const filteredReferences = getFilteredReferences();

  return (
    <div
      className={`references-page ${isMobile ? "mobile-view" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Bouton de toggle des filtres avec style amélioré */}
      <div className="filters-container">
        <button
          className={`filter-toggle-button ${
            showFilters ? "filters-visible" : ""
          }`}
          onClick={() => setShowFilters(!showFilters)}
          title={showFilters ? "Masquer les filtres" : "Afficher les filtres"}
        >
          {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          <span className="toggle-icon">{showFilters ? "▲" : "▼"}</span>
        </button>

        <div className={`filters-panel ${showFilters ? "visible" : ""}`}>
          <ReferenceFilters
            references={references}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>
      </div>

      <div className="references-content">
        {/* <GlobeVisualization
          references={filteredReferences}
          selectedReference={selectedReference}
          onReferenceSelect={handleReferenceSelect}
        /> */}
        <ReferencesList
          references={filteredReferences}
          selectedReference={selectedReference}
          onReferenceSelect={handleReferenceSelect}
          onNavigateToCatalogue={onNavigateToCatalogue}
        />
      </div>

      {/* Instructions de balayage pour mobile */}
      {isMobile && (
        <div className="swipe-instructions">
          <div className="swipe-icon">←</div>
          <span>
            Balayez pour {showFilters ? "masquer" : "afficher"} les filtres
          </span>
          <div className="swipe-icon">→</div>
        </div>
      )}
    </div>
  );
};

export default References;
