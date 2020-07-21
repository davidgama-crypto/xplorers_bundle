import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Socket from './utils/Socket';
import WelcomePage from './pages/WelcomePage';
import GameRoomPage from './pages/GameRoomPage';
import store from './store';

class App extends Component {
  componentDidMount() {
    Socket.connect();
  }

  render() {
    return (
      <Provider store={store}>

        <Router>
          <div className="App">
            <hr />
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route path="/rooms/:roomId" component={GameRoomPage} />
            </Switch>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;