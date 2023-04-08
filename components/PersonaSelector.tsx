import React, { ChangeEvent } from "react";
import styles from "../styles/PersonaSelector.module.css";
import { Persona } from "../utils/persona";

interface PersonaSelectorProps {
  persona: Persona;
  onPersonaChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  persona,
  onPersonaChange,
}) => {
  return (
    <div className={styles.personaSelector}>
      <label htmlFor="persona-selector">Persona:</label>
      <select
        id="persona-selector"
        value={persona}
        onChange={onPersonaChange}
        className={styles.personaDropdown}
      >
        {Object.values(Persona).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PersonaSelector;
