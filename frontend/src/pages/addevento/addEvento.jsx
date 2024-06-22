import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from  './addevento.module.css';


export default function AddEvento(){
    const [nome, setNomeEvento] = useState('');
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Função para formatar a data no formato YYYY-MM-DD
        const formattedDate = new Date(data).toISOString().split('T')[0];

        console.log(formattedDate)
        console.log(data)

        const newEvento = { nome:nome, data:data, local:local, descricao:descricao };

        console.log(newEvento);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/eventos', newEvento);
            if (response.status === 201) {
              history.push('/');
            }
        } catch (error) {
            console.error('Erro ao adicionar evento:', error);
        }
    };

    return (
        <div className={styles.addeventContainer}>
            <h1>Cadastrar Evento</h1>
            <form className={styles.addeventForm} onSubmit={handleSubmit}>
                <div className={styles.labelItens}>
                    <label>Nome do Evento</label>
                    <input type="text" value={nome} onChange={(e) => setNomeEvento(e.target.value)} required />
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


