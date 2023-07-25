import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Today from "./pages/Today";
import Work from "./pages/Work";
import School from "./pages/School";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route exact path='/' element={< Today />}></Route>
                    {/* <Route exact path='/today' element={< Today />}></Route> */}
                    <Route exact path='/work' element={< Work />}></Route>
                    <Route exact path='/school' element={< School />}></Route>
                    {/* <Route path="/today" exact component={Today} />
                    <Route path="/work" exact component={Work} />   
                    <Route path="/school" exact component={School} /> */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;