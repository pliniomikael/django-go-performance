import { useState, useEffect } from "react";
import { Col, Row, Pagination, Layout } from 'antd';
import type { PaginationProps } from 'antd';

const { Header, Footer, Content } = Layout;

import { ResponsePokemons } from '../../models/pokemon'

import CardPokemon from '../../components/CardPokemon';
const API = 'http://localhost:8000';

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
	if (type === 'prev') {
		return <a>Previous</a>;
	}
	if (type === 'next') {
		return <a>Next</a>;
	}
	return originalElement;
};
function Home() {
	const [data, setData] = useState<ResponsePokemons | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const fetchData = async () => {
		setLoading(true);
		await fetch(`${API}/sql/pokemons/?page=${currentPage}`)
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
		setCurrentPage(page);
		setLoading(true);

		fetchData();
	}

	useEffect(() => {
		fetchData()
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
			</Content>
			<Footer style={{ textAlign: "center" }}>
				<Pagination
					onChange={getPage}
					defaultCurrent={1}
					total={data?.total_itens}
					itemRender={itemRender}
					showSizeChanger={false}
				/>
			</Footer>
		</Layout>
	</>;
}

export default Home;
