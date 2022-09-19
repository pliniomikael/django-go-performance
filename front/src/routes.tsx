// import React from "react";
import {BrowserRouter as Router, Routes, Route  } from "react-router-dom";

import Home  from './pages/home';
import Detail  from './pages/detail';

const Routers = () => {
   return (
       <Router>
            <Routes>
                <Route path="/detail/:name" element = { <Detail/> } />
                <Route path="/" element = { <Home/> } />
            </Routes>
       </Router>
   )
}

export default Routers;
