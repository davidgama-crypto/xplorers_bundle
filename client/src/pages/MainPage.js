import React, { Component } from "react";
import APIRequestHandler from '../utils/ApiRequestHandler'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    RouteProps,
    Redirect,
} from "react-router-dom";
import GameRoom from "../components/GameRoom";
import Welcome from "../components/Welcome";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            //TODO VALIDATE ROOM ID????
                true ?
                // @ts-ignore
                <Component {...props} /> :
                <Redirect to="/" />

        }
    />
)


const getRoomInfo = (props) => {
    APIRequestHandler.getGameStatus( props.match.params.id)
             .then((roomInformation) => {
                 console.log(roomInformation);
                 localStorage.setItem('document',JSON.stringify(roomInformation));
                 return true;
        })
}


class MainPage extends Component {


    render() {
        return (
            <Router>
                <div>
                    <hr />

                    {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                    <Switch>
                        <Route exact path="/"  component={Welcome} />
                        <PrivateRoute path="/rooms/:id" component={GameRoom}  />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default MainPage;

