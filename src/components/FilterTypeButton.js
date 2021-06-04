import React, { useState } from "react";

const FilterTypeButton = ({ value, handleType, type, setType, name, src }) => {
  const [selected, isSelected] = useState(false);

  const addTypes = (elem) => {
    // On copie le state type
    let typeCopy = [...type];
    // Si le tableau type est vide, alors on push d'office la valeur du bouton
    if (typeCopy.length === 0) {
      isSelected(true);
      typeCopy.push(elem);
      setType(typeCopy);
    } else if (typeCopy.length >= 1) {
      // Si le tableau type a au moins 1 élement, on vérifie qu'il n'y est pas déjà
      if (typeCopy.indexOf(elem) === -1) {
        isSelected(true);
        typeCopy.push(elem);
        setType(typeCopy);
      } else {
        // Si l'élément y est déjà, on récupère son index, et on l'enlève du tableau
        isSelected(false);
        for (let i = 0; i < typeCopy.length; i++) {
          if (typeCopy.indexOf(elem) !== -1) {
            const index = typeCopy.indexOf(elem);
            typeCopy.splice(index, 1);
            setType(typeCopy);
          }
        }
      }
    }
    console.log(typeCopy);
  };
  return (
    <div className="type_choices">
      <button
        className={selected ? "selected" : "normal"}
        onClick={handleType}
        onClick={() => {
          addTypes(name);
        }}
      >
        {value}
      </button>
      <img className="type_icon" src={src} alt="img"></img>
    </div>
  );
};

export default FilterTypeButton;
