import { useCallback } from 'react';
import { Filters, Reference } from '../../types';
import './ReferenceFilters.scss';

interface ReferenceFiltersProps {
  references: Reference[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const ReferenceFilters = ({ references, filters, onFiltersChange }: ReferenceFiltersProps) => {
  // Extract unique values for filters
  const years = [...new Set(references.map(ref => Number(ref.annee)).filter(year => !isNaN(year)))].sort((a, b) => b - a);
  const projectTypes = [
    "Gymnase",
    "Stade de football",
    "Salle polyvalente",
    "Équipement aquatique",
    "Plateau sportif",
    "Autres"
  ];

  // Extract unique countries from the `country` field
  const countries = [...new Set(references.map(ref => ref.country))].sort();

  // Extract unique locations based on the selected country
  const filteredReferences = filters.country ? references.filter(ref => ref.country === filters.country) : references;
  const locations = [...new Set(filteredReferences.map(ref => ref.lieu))].sort();

  const handleTypeChange = useCallback((type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.type, type]
      : filters.type.filter(t => t !== type);
    onFiltersChange({ ...filters, type: newTypes });
  }, [filters, onFiltersChange]);

  return (
    <div className="filters-section">
      <div className="filters-grid">
        <div className="filter-group">
          <label>Type de mission</label>
          <div className="checkbox-group">
            {["FAISABILITE", "AMO", "MOE"].map(type => (
              <label key={type} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={e => handleTypeChange(type, e.target.checked)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Année</label>
          <select
            value={filters.year || ""}
            onChange={e => onFiltersChange({
              ...filters,
              year: e.target.value ? Number(e.target.value) : null
            })}
          >
            <option value="">Toutes les années</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Localisation</label>
          <select
            value={filters.lieu || ""}
            onChange={e => onFiltersChange({
              ...filters,
              lieu: e.target.value
            })}
          >
            <option value="">Toutes les localisations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Budget (M€)</label>
          <div className="price-range">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={e => onFiltersChange({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : null
              })}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={e => onFiltersChange({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : null
              })}
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Pays</label>
          <select
            value={filters.country || ""}
            onChange={e => onFiltersChange({
              ...filters,
              country: e.target.value
            })}
          >
            <option value="">Tous les pays</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Type de projet</label>
          <select
            value={filters.projectType}
            onChange={e => onFiltersChange({
              ...filters,
              projectType: e.target.value
            })}
          >
            <option value="">Tous les types</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReferenceFilters;
