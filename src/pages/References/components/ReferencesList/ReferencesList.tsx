import { Reference } from '../../types';
import ReferenceCard from '../ReferenceCard/ReferenceCard';
import './ReferencesList.scss';

interface ReferencesListProps {
  references: Reference[];
  selectedReference: Reference | null;
  onReferenceSelect: (reference: Reference) => void;
  onNavigateToCatalogue?: (pageNumber: number) => void;
}

const ReferencesList = ({
  references,
  selectedReference,
  onReferenceSelect,
  onNavigateToCatalogue,
}: ReferencesListProps) => {
  return (
    <div className="references-list">
      <h2>Nos Références ({references.length})</h2>
      <div className="references-grid">
        {references.map((ref) => (
          <ReferenceCard
            key={ref.id}
            reference={ref}
            isSelected={selectedReference?.id === ref.id}
            onClick={() => onReferenceSelect(ref)}
            onNavigateToCatalogue={onNavigateToCatalogue}
          />
        ))}
      </div>
    </div>
  );
};

export default ReferencesList;
