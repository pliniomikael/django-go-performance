import { useState, useEffect } from "react";
import { ResponseDetailPokemon } from '../../models/pokemon';
import { useParams } from 'react-router-dom';
import CardPokemonDetail from '../../components/CardPokemonDetail';
import { Col, List, Row, Typography } from 'antd';

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
		if (name) {
			fetchData(name);
		}

	}, []);
	return <>
		{error && (
			<div>{`Aconteu um problema para buscar os dados - ${error}`}</div>
		)}
		{data &&
			<Row justify="space-around" align="middle" gutter={8}>
				<Col key={data.id} span={12}>
					<Row justify="space-around" align="middle" gutter={8}>
						<Col key={data.id} span={8}>
							<CardPokemonDetail
								id={data.id}
								name={data.name}
								image={data.image}
								abilities={data.abilities}
								typies={data.typies}
							/>

						</Col>
					</Row>
				</Col>
			</Row>
		}
	</>
}

export default Detail;
