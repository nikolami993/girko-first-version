import { useEffect, useRef, useState } from "react";

const QyeSelect=({ reset,onChange })=> {

  const selectRef = useRef();
  
  useEffect(() => {
    selectRef.current.value = 0;
  }, [reset]);

  
  
  return (
    <select
      ref={selectRef}
      style={{ display: "block", width: "150px", marginBottom: "10px" }}
      defaultValue={0}
      onChange={(e)=>onChange(e.target.value)}
    >
      <option value={0} disabled>Vrsta odgovora:</option>
      <option value={1}>Da/Ne</option>
      <option value={2}>Text</option>
      <option value={3}>Kombinacija</option>
    </select>
  );
}
export default QyeSelect;