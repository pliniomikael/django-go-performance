import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Detail from './pages/Detail';
import Page404 from "./pages/Page404";

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
