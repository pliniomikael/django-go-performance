import { useState, useEffect } from "react";
import { Pokemons } from '../../models/pokemon'
const API = 'http://localhost:8000';

function Home() {
    const [data, setData] = useState<Pokemons[] | null >(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        await fetch(`${API}/sql/pokemons/`)
        .then((response) => {
            if (!response.ok) {
            throw new Error(
                `A Requisição deu erro: O status é ${response.status}`
            );
            }
            return response.json();
        })
        .then((actualData) => {
            setData(actualData);
            setError(null);
          })
          .catch((err) => {
            setError(err.message);
            setData(null);
          })
          .finally(() => {
            setLoading(false);
          });
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="App">
            <h1>API Pokemon Local</h1>
            {loading && <div>LOADING!!!...</div>}
            {error && (
                <div>{`Aconteu um problema para buscar os dados - ${error}`}</div>
            )}
            <ul>
                {data &&
                data.map(({ id, name, image }) => (
                    <li key={id}>
                    <h3>{id} - {name} - {image}</h3>
                    </li>
                ))}
            </ul>
        </div>
        );
}

export default Home;
