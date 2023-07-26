import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDo from "./pages/ToDo";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path='/' element={< ToDo />}></Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;