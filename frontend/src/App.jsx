import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Today from "./pages/Today";
import Work from "./pages/Work";
import School from "./pages/School";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Today} />
                    <Route path="/today" exact component={Today} />
                    <Route path="/work" exact component={Work} />
                    <Route path="/school" exact component={School} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
};

export default App;