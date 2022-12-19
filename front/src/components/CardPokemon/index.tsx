import { Card, Button } from 'antd';
import { Pokemon } from '../../models/pokemon';

function CardPokemon(props: Pokemon) {
	return <>
		<Card title={props.name.toUpperCase()} bordered={true} cover={
			<img
				alt={props.name}
				src={props.image}
			/>
		} style={{ width: 300, marginTop: 16, textAlign: "center" }}>
			<Button type="primary">
				Detalhe
			</Button>
		</Card>
	</>
}

export default CardPokemon;
