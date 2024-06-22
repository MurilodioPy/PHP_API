import React from 'react';

// Dentro de deleteEvento.jsx

const DeleteEvento = ({ id, onDelete }) => {
  const handleClick = () => {
    onDelete(id); 
  };

  return (
    <button onClick={handleClick}>Excluir</button>
  );
};

export default DeleteEvento;



