import React, { ChangeEvent } from "react";
import styles from "../styles/PersonaSelector.module.css";

interface PersonaSelectorProps {
  persona: string;
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
        <option value="Standard">Standard</option>
        <option value="Gotham Chess">Gotham Chess</option>
        <option value="Daniel Naroditsky">Daniel Naroditsky</option>
        <option value="Hikaru">Hikaru</option>
        <option value="Eric Rosen">Eric Rosen</option>
      </select>
    </div>
  );
};

export default PersonaSelector;
