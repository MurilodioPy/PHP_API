import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import styles from './editeventos.module.css';

export default function EditEventos(){
    const { id } = useParams(); 
    console.log(`ID: ${id}`); // Pega o id do evento da URL
    const history = useNavigate();
    const [evento, setEvento] = useState({
        nome: '',
        data: '',
        local: '',
        descricao: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/eventos/${id}`);
                setEvento(response.data);
            } catch (error) {
                if (error.response) {
                    
                    console.error('Erro ao buscar o evento:', error.response.status, error.response.statusText);
                    setError('Erro ao carregar o evento. Por favor, tente novamente mais tarde.');
                } else if (error.request) {
                    
                    console.error('Erro ao buscar o evento:', error.request);
                    setError('Erro ao carregar o evento. Por favor, tente novamente mais tarde.');
                } else {
                    
                    console.error('Erro ao buscar o evento:', error.message);
                    setError('Erro ao carregar o evento. Por favor, tente novamente mais tarde.');
                }
            }
        };
    
        fetchEvento();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvento({ ...evento, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/eventos/${id}`, evento);
            console.log('Evento atualizado com sucesso:', response.data);
            history.push('/eventos');
        } catch (error) {
            console.error('Erro ao atualizar o evento:', error);
            setError('Erro ao atualizar o evento. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div className={styles.editContainer}>
            <h1>Editar Evento</h1>
            {error && <p>{error}</p>}
            <form className={styles.editForm} onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={evento.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Data</label>
                    <input
                        type="date"
                        name="data"
                        value={evento.data}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Local</label>
                    <input
                        type="text"
                        name="local"
                        value={evento.local}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea
                        name="descricao"
                        value={evento.descricao}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Atualizar Evento</button>
            </form>
        </div>
    );
};


