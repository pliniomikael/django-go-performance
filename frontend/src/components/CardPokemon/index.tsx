import { Card, Button } from 'antd';
import { Pokemon } from '../../models/pokemon';
import { Link } from "react-router-dom";

function CardPokemon(props: Pokemon) {
	return <>
		<Card title={props.name.toUpperCase()} bordered={true} cover={
			<img
				alt={props.name}
				src={props.image}
			/>
		} style={{ width: 300, marginTop: 16, textAlign: "center" }}>
			<Link to={"pokemon/" + props.name}>
				<Button type="primary">
					Detalhe
				</Button>
			</Link>
		</Card>
	</>
}

export default CardPokemon;
