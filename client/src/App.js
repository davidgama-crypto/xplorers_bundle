import React, {Component} from 'react';
import './App.css';
import Socket from "./utils/Socket";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import GameRoomPage from './pages/GameRoomPage';


class App extends Component {

    componentDidMount() {
        Socket.connect()
    }

    componentWillUnmount() {
        Socket.close()
    }

    render() {
        return (
            <Router>
            <div className="App">
                <hr />
                <Switch>
                    <Route exact path="/"  component={WelcomePage} />
                    <Route path="/rooms/:id" component={GameRoomPage}  />
                </Switch>
            </div>
        </Router>
        )
    }
}

export default App;
