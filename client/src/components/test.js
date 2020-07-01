import React, {Component} from 'react';
import './test.css';

class Test extends Component {
    constructor() {
        super();
        this.state={
            users : []
        }
    }

    componentDidMount() {
        fetch("/api/users")
            .then(res => res.json())
            .then(users => this.setState({users},
              () => console.log("Users fetched",users)));
    }

    render() {
        return (
            <div >
                <h2>TEST</h2>
                <h2>{this.state.message}</h2>
            </div>
        );
    }


}

export default Test;
