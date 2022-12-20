import { useState, useEffect } from "react";
import { ResponseDetailPokemon } from '../../models/pokemon';
import { useLocation, useParams } from 'react-router-dom';

const API = 'http://localhost:8000';

function Detail() {
	const [data, setData] = useState<ResponseDetailPokemon | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let { name } = useParams();
	console.log(name)
	const fetchData = async (pokemon: string) => {
		setLoading(true);
		await fetch(`${API}/sql/pokemon/${pokemon}`)
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
		// setSearchParams({ page: `${activePage}` });
		fetchData(name);

	}, []);
	console.log(data);
	return (
		<>
			{data?.id}
		</>
	);
}

export default Detail;
