// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/home';
import Detail from './pages/detail';

const Routers = () => {
	return (
		<Router>
			<Routes>
				<Route path="pokemon/:name" element={<Detail />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<h1>Pagina não encontrada</h1>} />
			</Routes>
		</Router>
	)
}

export default Routers;
