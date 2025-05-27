import { useState, useCallback } from "react";
import referencesData from "../../data/references.json";
import { Reference, Filters } from "./types";
import ReferenceFilters from "./components/ReferenceFilters/ReferenceFilters";
import GlobeVisualization from "./components/GlobeVisualization/GlobeVisualization";
import ReferencesList from "./components/ReferencesList/ReferencesList";
import "./references.scss";

const References = () => {
  const [selectedReference, setSelectedReference] = useState<Reference | null>(
    null
  );
  const [references] = useState(() => [
    ...referencesData.FAISABILITE,
    ...referencesData.AMO,
    ...referencesData.MOE,
  ]);
  const [filters, setFilters] = useState<Filters>({
    type: [],
    year: null,
    location: "",
    minPrice: null,
    maxPrice: null,
    projectType: "",
    countryGroup: "",
    country: "",
    lieu: "",
  });

  const parsePrix = (prix: string): number => {
    if (!prix) return 0;
    const numStr = prix.replace(/[^0-9,.]/g, "").replace(",", ".");
    return parseFloat(numStr);
  };

  const getFilteredReferences = useCallback(() => {
    let filtered = references;

    if (filters.type.length > 0) {
      filtered = filtered.filter((ref) => {
        if (
          filters.type.includes("FAISABILITE") &&
          referencesData.FAISABILITE.some((r) => r.id === ref.id)
        )
          return true;
        if (
          filters.type.includes("AMO") &&
          referencesData.AMO.some((r) => r.id === ref.id)
        )
          return true;
        if (
          filters.type.includes("MOE") &&
          referencesData.MOE.some((r) => r.id === ref.id)
        )
          return true;
        return false;
      });
    }

    if (filters.year) {
      filtered = filtered.filter((ref) => Number(ref.annee) === filters.year);
    }

    if (filters.location) {
      filtered = filtered.filter((ref) =>
        ref.lieu.startsWith(filters.location)
      );
    }

    if (filters.minPrice !== null) {
      filtered = filtered.filter(
        (ref) => parsePrix(ref.prix) >= (filters.minPrice || 0)
      );
    }

    if (filters.maxPrice !== null) {
      filtered = filtered.filter(
        (ref) => parsePrix(ref.prix) <= (filters.maxPrice || Infinity)
      );
    }

    if (filters.projectType) {
      filtered = filtered.filter((ref) => {
        const title = ref.title.toUpperCase();
        const type = filters.projectType.toUpperCase();
        if (type === "AUTRES") {
          return ![
            "GYMNASE",
            "STADE DE FOOTBALL",
            "SALLE POLYVALENTE",
            "ÉQUIPEMENT AQUATIQUE",
            "PLATEAU SPORTIF",
          ].some((t) => title.includes(t.toUpperCase()));
        }
        return title.includes(type);
      });
    }

    if (filters.country) {
      filtered = filtered.filter((ref) => ref.country === filters.country);
    }

    if (filters.lieu) {
      filtered = filtered.filter((ref) => ref.lieu === filters.lieu);
    }

    return filtered;
  }, [filters, references]);

  const handleReferenceSelect = useCallback((ref: Reference) => {
    setSelectedReference(ref);
  }, []);

  const filteredReferences = getFilteredReferences();

  console.log("FILTERED REF: ", filteredReferences);
  return (
    <div className="references-page">
      <ReferenceFilters
        references={references}
        filters={filters}
        onFiltersChange={setFilters}
      />
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
        />
      </div>
    </div>
  );
};

export default References;
