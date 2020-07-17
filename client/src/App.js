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
import { Provider } from 'react-redux';
import store from './store/store'


class App extends Component {

    componentDidMount() {
        Socket.connect()
    }

    componentWillUnmount() {
        Socket.close()
    }

    render() {
        return (
            <Provider store={store}>

            <Router>
            <div className="App">
                <hr />
                <Switch>
                    <Route exact path="/"  component={WelcomePage} />
                    <Route path="/rooms/:id" component={GameRoomPage}  />
                </Switch>
            </div>
        </Router>
        </Provider>

        )
    }
}

export default App;
