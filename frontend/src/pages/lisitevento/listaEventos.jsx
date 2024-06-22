import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './listevento.module.css';
import DeleteEvento from '../../components/deleteevento/deleteEvento'; // Importe o componente DeleteEvento aqui

export default function ListEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/eventos');
        setEventos(response.data);
      } catch (error) {
        setError('Erro ao carregar eventos. Por favor, tente novamente mais tarde.');
        console.error('Erro ao carregar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const deleteEvento = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/eventos/${id}`);
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      setError('Erro ao deletar evento. Por favor, tente novamente mais tarde.');
      console.error('Erro ao deletar evento:', error);
    }
  };

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.containerList}>
      <h1>Eventos</h1>
      <ul className={styles.listView}>
        {eventos.map(evento => (
          <li className={styles.listItem} key={evento.id}>
            Nome:           {evento.nome} <br /> 
            Data:           {evento.data} <br />
            Local:          {evento.local} <br />
            Descrição:      <br /> <br /> {evento.descricao}
            <div className={styles.btnFuncoes}>
              <Link to={`/edit/${evento.id}`}>Editar</Link>
              <DeleteEvento id={evento.id} onDelete={deleteEvento} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


