import { useState, useCallback, useEffect } from "react";
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
  const [filters, setFilters] = useState<Filters>({
    type: [],
    year: null,
    location: "",
    minPrice: null,
    maxPrice: null,
    projectType: "",
    category: "",
  });

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

  const handleReferenceSelect = useCallback((ref: Reference) => {
    setSelectedReference(ref);
  }, []);

  const filteredReferences = getFilteredReferences();

  console.log("FILTERED REF: ", filteredReferences);
  // Afficher un message de débogage
  console.log("Show Filters State:", showFilters);

  return (
    <div className="references-page">
      {/* Bouton de toggle des filtres avec style amélioré */}
      <div className="filters-container">
        <button
          className={`filter-toggle-button ${
            showFilters ? "filters-visible" : ""
          }`}
          onClick={() => setShowFilters(!showFilters)}
          title={showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            padding: "1rem",
            backgroundColor: "#333",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          <span className="toggle-icon" style={{ marginLeft: "8px" }}>
            {showFilters ? "▲" : "▼"}
          </span>
        </button>

        <div className={`filters-panel ${showFilters ? "visible" : ""}`}>
          <ReferenceFilters
            references={references}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>
      </div>

      <div className="flex items-start">
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
    </div>
  );
};

export default References;
