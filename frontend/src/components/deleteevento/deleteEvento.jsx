import React from 'react';

// Dentro de deleteEvento.jsx

const DeleteEvento = ({ id, onDelete }) => {
  const handleClick = () => {
    onDelete(id); // Aqui você chama a função onDelete passada como prop, passando o id
  };

  return (
    <button onClick={handleClick}>Excluir</button>
  );
};

export default DeleteEvento;



