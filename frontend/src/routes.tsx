// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/home';
import Detail from './pages/detail';
import Page404 from "./pages/page404";

const Routers = () => {
	return (
		<Router>
			<Routes>
				<Route path="pokemon/:name" element={<Detail />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<Page404 />} />
			</Routes>
		</Router>
	)
}

export default Routers;
