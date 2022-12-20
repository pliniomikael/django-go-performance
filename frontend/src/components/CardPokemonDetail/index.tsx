import { Button, Card, List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ResponseDetailPokemon } from '../../models/pokemon';

function CardPokemon(props: ResponseDetailPokemon) {
	return <>
		<Card title={props.name.toUpperCase()} bordered={true} cover={
			<img
				alt={props.name}
				src={props.image}
			/>
		} style={{ width: 300, marginTop: 16, textAlign: "center" }}>
			<List
				header={<div>Abilities</div>}
				dataSource={props.abilities}
				renderItem={(item) => (
					<List.Item>
						<Typography.Text mark>{item.name}</Typography.Text>
					</List.Item>
				)}
			/>
			<List
				header={<div>Typies</div>}
				dataSource={props.typies}
				renderItem={(item) => (
					<List.Item
						key={props.id}
					>
						<Typography.Text mark>{item.name}</Typography.Text>
					</List.Item>
				)}
			/>
			<Link to="/">
				<Button type="primary">
					Inicio
				</Button>
			</Link>
		</Card>
	</>
}

export default CardPokemon;
