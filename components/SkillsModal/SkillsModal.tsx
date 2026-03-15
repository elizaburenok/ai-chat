import React, { useState, useEffect, useRef } from 'react';
import { Chip } from '../Chip';
import { SearchInput } from '../SearchInput';
import { Cell } from '../Cell';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import './SkillsModal.css';

export interface Skill {
  id: string;
  label: string;
  competencyId: string;
}

export interface Competency {
  id: string;
  label: string;
}

export interface SkillsModalProps {
  /** Whether modal is open */
  open: boolean;
  /** Skills list */
  skills: Skill[];
  /** Competencies list */
  competencies: Competency[];
  /** Selected skill IDs */
  selectedSkillIds: Set<string>;
  /** Selected competency ID for filtering */
  selectedCompetencyId?: string;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when filter is applied */
  onApplyFilter: (selectedSkillIds: Set<string>) => void;
  /** Callback when competency filter changes */
  onCompetencyChange?: (competencyId: string | undefined) => void;
}

// Checkbox component for skills list
const Checkbox: React.FC<{ checked?: boolean; disabled?: boolean }> = ({ checked = false, disabled = false }) => (
  <div
    className={`skills-modal__checkbox ${checked ? 'skills-modal__checkbox--checked' : ''} ${disabled ? 'skills-modal__checkbox--disabled' : ''}`}
    aria-checked={checked}
    aria-disabled={disabled}
    role="checkbox"
  >
    {checked && (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="skills-modal__checkbox-icon"
      >
        <path
          d="M2 6L5 9L10 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
);

// Radio component for skills list
const Radio: React.FC<{ checked?: boolean; disabled?: boolean }> = ({ checked = false, disabled = false }) => (
  <div
    className={`skills-modal__radio ${checked ? 'skills-modal__radio--checked' : ''} ${disabled ? 'skills-modal__radio--disabled' : ''}`}
    aria-checked={checked}
    aria-disabled={disabled}
    role="radio"
  />
);

export const SkillsModal: React.FC<SkillsModalProps> = (props) => {
  const {
    open,
    skills,
    competencies,
    selectedSkillIds,
    selectedCompetencyId,
    onClose,
    onApplyFilter,
    onCompetencyChange,
  } = props;

  const [localSelectedSkills, setLocalSelectedSkills] = useState<Set<string>>(selectedSkillIds);
  const [searchQuery, setSearchQuery] = useState('');
  const [competencyDropdownOpen, setCompetencyDropdownOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync local state with prop when modal opens
  useEffect(() => {
    if (open) {
      setLocalSelectedSkills(new Set(selectedSkillIds));
      setSearchQuery('');
    }
  }, [open, selectedSkillIds]);

  // Handle click outside to close
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  // Filter skills by competency and search query
  const filteredSkills = skills
    .filter((skill) => {
      const matchesCompetency = !selectedCompetencyId || skill.competencyId === selectedCompetencyId;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch = !normalizedQuery || skill.label.toLowerCase().includes(normalizedQuery);
      return matchesCompetency && matchesSearch;
    })
    .sort((a, b) => a.label.localeCompare(b.label, 'ru'));

  // Toggle skill selection
  const handleSkillToggle = (skillId: string) => {
    const newSelected = new Set(localSelectedSkills);
    if (newSelected.has(skillId)) {
      newSelected.delete(skillId);
    } else {
      newSelected.add(skillId);
    }
    setLocalSelectedSkills(newSelected);
  };

  // Handle apply filter
  const handleApplyFilter = () => {
    onApplyFilter(localSelectedSkills);
    onClose();
  };

  // Handle competency selection
  const handleCompetencySelect = (competency: { id: string; label: string }) => {
    onCompetencyChange?.(competency.id);
    setCompetencyDropdownOpen(false);
  };

  // Get competency label
  const competencyLabel = selectedCompetencyId
    ? competencies.find((c) => c.id === selectedCompetencyId)?.label || 'Компетенция'
    : 'Компетенция';

  // Prepare competency dropdown items
  const competencyItems = competencies.map((comp) => ({
    id: comp.id,
    label: comp.label,
  }));

  if (!open) return null;

  return (
    <div className="skills-modal__overlay">
      <div className="skills-modal" ref={modalRef} data-node-id="58760:18038">
        <div className="skills-modal__header">
          <div className="skills-modal__navigation-bar">
            <div className="skills-modal__navigation-right">
              <button
                type="button"
                className="skills-modal__close"
                onClick={onClose}
                aria-label="Закрыть"
              >
                <span aria-hidden="true" className="skills-modal__close-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="skills-modal__title-section">
            <h2 className="skills-modal__title">Выбрать навык</h2>
          </div>
        </div>

        <div className="skills-modal__content">
          <div className="skills-modal__filters">
            <div className="skills-modal__filter-wrapper">
              <Chip
                variant="dropdown"
                label={competencyLabel}
                dropdownOpen={competencyDropdownOpen}
                selected={!!selectedCompetencyId}
                showResetIcon={!!selectedCompetencyId}
                onClick={() => setCompetencyDropdownOpen(!competencyDropdownOpen)}
                onReset={() => {
                  onCompetencyChange?.(undefined);
                  setCompetencyDropdownOpen(false);
                }}
              />
              {competencyDropdownOpen && (
                <Dropdown
                  type="list"
                  mode="desktop"
                  items={competencyItems}
                  open={true}
                  onSelect={handleCompetencySelect}
                  onClose={() => setCompetencyDropdownOpen(false)}
                />
              )}
            </div>

            <div className="skills-modal__search">
              <SearchInput
                size="s"
                variant="filled"
                placeholder="Поиск"
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            </div>
          </div>

          <div className="skills-modal__skills-list">
            {filteredSkills.length === 0 ? (
              <div className="skills-modal__empty">Навыки не найдены</div>
            ) : (
              filteredSkills.map((skill) => (
                <Cell
                  key={skill.id}
                  size="L"
                  onClick={() => handleSkillToggle(skill.id)}
                  iconRight={
                    <Checkbox checked={localSelectedSkills.has(skill.id)} />
                  }
                >
                  {skill.label}
                </Cell>
              ))
            )}
          </div>
        </div>

        <div className="skills-modal__footer">
          <Button
            type="Primary"
            onClick={handleApplyFilter}
            className="skills-modal__apply-button"
          >
            Применить фильтр
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;

