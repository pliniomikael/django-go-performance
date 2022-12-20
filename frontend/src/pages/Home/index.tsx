import { useState, useEffect } from "react";
import { Col, Row, Pagination, Layout, Skeleton } from 'antd';
import { useSearchParams } from "react-router-dom";

const { Header, Footer, Content } = Layout;

import { ResponsePokemons } from '../../models/pokemon'

import CardPokemon from '../../components/CardPokemon';
const API = 'http://localhost:8000';

function Home() {
	const [data, setData] = useState<ResponsePokemons | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const activePage = searchParams.get('page') || 1;

	const fetchData = async (page: Number) => {
		setLoading(true);
		await fetch(`${API}/sql/pokemons/?page=${page}`)
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

	const getPage = async (page: number) => {
		setLoading(true);
		setSearchParams({ page: `${page}` });
		fetchData(page);
	}

	useEffect(() => {
		setSearchParams({ page: `${activePage}` });
		fetchData(Number(activePage));
	}, []);

	return <>
		<Layout>
			<Header className="header" style={
				{
					textAlign: "center",
					color: "#ffff",
					backgroundColor: "#43a047"
				}
			}>API Pokemon Local</Header>
			<Content >
				<Skeleton loading={loading} active >
					{error && (
						<div>{`Aconteu um problema para buscar os dados - ${error}`}</div>
					)}
					<div style={{ alignContent: "space-between" }}>
						<Row justify="space-around" align="middle" gutter={8}>
							{data &&
								data.pokemons.map(({ id, name, image }) => (
									<Col key={id} span={8}>
										<CardPokemon id={id} name={name} image={image} />
									</Col>
								))}
						</Row>
					</div>
				</Skeleton>
			</Content>
			<Footer style={{ textAlign: "center" }}>
				<Pagination
					onChange={getPage}
					total={data?.total_itens}
					showSizeChanger={false}
					current={Number(activePage)}
				/>
			</Footer>
		</Layout>
	</>;
}

export default Home;
