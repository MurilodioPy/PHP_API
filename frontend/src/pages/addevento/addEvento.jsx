import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from  './addevento.module.css';
import { format } from 'date-fns';

export default function AddEvento(){
    const [nomeEvento, setNomeEvento] = useState('');
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    // Função para formatar a data no formato YYYY-MM-DD
    const formatDate = (date) => format(date, 'yyyy-MM-dd');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newEvento = { nome: nomeEvento, formatDate, local, descricao };

        try {
            await axios.post('http://127.0.0.1:8000/api/eventos', newEvento);
            console.log('Evento adicionado com sucesso!');
            setNomeEvento('');
            setData('');
            setLocal('');
            setDescricao('');
            history.push('/');
        } catch (error) {
            setError('Erro ao adicionar evento. Por favor, tente novamente mais tarde.');
            console.error('Erro ao adicionar evento:', error);
        }
    };

    return (
        <div className={styles.addeventContainer}>
            <h1>Cadastrar Evento</h1>
            <form className={styles.addeventForm} onSubmit={handleSubmit}>
                <div className={styles.labelItens}>
                    <label>Nome do Evento</label>
                    <input type="text" value={nomeEvento} onChange={(e) => setNomeEvento(e.target.value)} required />
                </div>
                <div className={styles.labelItens}>
                    <label>Data</label>
                    <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                </div>
                <div className={styles.labelItens}>
                    <label>Local</label>
                    <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} required />
                </div>
                <div className={styles.labelItens}>
                    <label>Descrição</label>
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required></textarea>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};


