import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./Components/NaviBar";
import About from "./Pages/About";
import Rent from "./Pages/Rent";
import DetailedTruck from "./Pages/DetailedTruck";

function App() {

    return (
            <Router>
                <React.StrictMode>
                    <NaviBar/>
                    <Routes>
                        <Route exact path="/about" element={<About/>}/>
                        <Route  path="/" element={<Rent/>}/>
                        <Route exact path="rent/:id" element={<DetailedTruck/>}/>
                    </Routes>
                </React.StrictMode>
            </Router>

);
}

export default App;