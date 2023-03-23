import { useEffect, useRef } from "react";
import styles from "./SelectOption.module.css";

function SelectOption({ type = 0, reset, name }) {
  const selectRef = useRef();

  useEffect(() => {
    selectRef.current.value = 0;
  }, [reset]);

  useEffect(() => {
    if (type) selectRef.current.value = type;
  }, [type, reset]);

  return (
    <div>
      <select
        name={`select-${name}`}
        ref={selectRef}
        className={styles.combobox}
        // style={{ display: "block", width: "100px", marginBottom: "10px" }}
        defaultValue={type}
      >
        <option value={0} disabled>
          Vrsta odgovora:
        </option>
        <option value={1}>Fiksan tekst</option>
        <option value={2}>Slobodan tekst</option>
      </select>
    </div>
  );
}

export default SelectOption;
