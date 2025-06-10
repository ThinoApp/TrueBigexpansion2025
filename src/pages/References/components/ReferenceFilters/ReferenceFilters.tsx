import { useCallback, useState, useEffect } from "react";
import { Filters, Reference } from "../../types";
import "./ReferenceFilters.scss";

interface ReferenceFiltersProps {
  references: Reference[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const ReferenceFilters = ({
  references,
  filters,
  onFiltersChange,
}: ReferenceFiltersProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  // Extract unique values for filters
  const years = [...new Set(references.map((ref) => ref.year))].sort(
    (a, b) => b - a
  );

  // Define project types based on common terms in the data
  const projectTypes = [
    "Stade",
    "Terrain",
    "Piste",
    "Gymnase",
    "Tennis",
    "Plateau sportif",
    "Complexe sportif",
    "Vestiaires",
    "Autres",
  ];

  // Extract unique categories from the references
  const categories = [...new Set(references.map((ref) => ref.category))].sort();

  // Extract unique locations
  const locations = [...new Set(references.map((ref) => ref.location))].sort();

  const handleTypeChange = useCallback(
    (type: string, checked: boolean) => {
      const newTypes = checked
        ? [...filters.type, type]
        : filters.type.filter((t) => t !== type);
      onFiltersChange({ ...filters, type: newTypes });
    },
    [filters, onFiltersChange]
  );

  // Fonction pour réinitialiser tous les filtres
  const resetAllFilters = () => {
    onFiltersChange({
      type: [],
      year: null,
      location: "",
      minPrice: null,
      maxPrice: null,
      projectType: "",
      category: "",
    });
  };

  return (
    <div className="filters-section">
      {isMobile && (
        <div className="mobile-filter-header">
          <h3>Filtres</h3>
          <button className="reset-filters-btn" onClick={resetAllFilters}>
            Réinitialiser
          </button>
        </div>
      )}

      <div className="filters-grid">
        <div className="filter-group">
          <label>Type de mission</label>
          <div className="checkbox-group">
            {["FAISABILITE", "AMO", "MOE"].map((type) => (
              <label key={type} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={(e) => handleTypeChange(type, e.target.checked)}
                />
                {type === "FAISABILITE"
                  ? isMobile
                    ? "Faisabilité"
                    : "Études de faisabilité"
                  : type === "AMO"
                  ? isMobile
                    ? "AMO"
                    : "Assistance à maîtrise d'ouvrage"
                  : isMobile
                  ? "MOE"
                  : "Maîtrise d'œuvre"}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Année</label>
          <select
            value={filters.year || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                year: e.target.value ? Number(e.target.value) : null,
              })
            }
          >
            <option value="">Toutes les années</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Localisation</label>
          <select
            value={filters.location || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                location: e.target.value,
              })
            }
          >
            <option value="">Toutes les localisations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Budget (€)</label>
          <div className="price-range">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  minPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  maxPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Catégorie</label>
          <select
            value={filters.category || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                category: e.target.value,
              })
            }
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "terrains_synthetiques"
                  ? "Terrains synthétiques"
                  : category === "terrains_naturels"
                  ? "Terrains naturels"
                  : category === "pistes_athletisme"
                  ? "Pistes d'athlétisme"
                  : category === "complexes_sportifs_multisport"
                  ? "Complexes sportifs multisport"
                  : category === "tennis_padel"
                  ? "Tennis et padel"
                  : category === "vestiaires_structures_tribunes"
                  ? "Vestiaires, structures et tribunes"
                  : category === "batiments"
                  ? "Bâtiments"
                  : category === "amo_faisabilites_programmes"
                  ? "AMO, faisabilités et programmes"
                  : category === "etudes_en_cours"
                  ? "Études en cours"
                  : category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Type de projet</label>
          <select
            value={filters.projectType}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                projectType: e.target.value,
              })
            }
          >
            <option value="">Tous les types</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!isMobile && (
        <div className="filters-footer">
          <button className="reset-filters-btn" onClick={resetAllFilters}>
            Réinitialiser tous les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default ReferenceFilters;
