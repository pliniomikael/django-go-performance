import { Button } from "antd";
import { Link } from "react-router-dom";
import style from "./page404.module.css";

import Snorlax from "../../assets/img/Snorlax.svg";

function Page404() {

	return <>
		<div style={{ textAlign: "center", alignContent: "center", justifyItems: "center" }}>
			<h1 className={style.h1}>
				4<img src={Snorlax} className={style.img} alt="404" />4
			</h1>
			<p className={style.p}>
				<span className={style.span}>Opps!</span> Snorlax bloqueou sua rota!
			</p>
			<Link to="/">
				<Button color={"#025554"} >
					Inicio
				</Button>
			</Link>
		</div>

	</>;
}

export default Page404;
