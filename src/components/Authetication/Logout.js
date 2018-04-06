import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {app} from "./base";


class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentWillMount() {

        app.auth().signOut().then((user) => {
            this.setState({redirect: true});
            this.props.history.push("/");
            console.log("kirjauduppa ulos!");
            console.log("redirect" + this.state.redirect);

        })
    }

    render() {

        if (this.state.redirect === true) {

            <Router>
                <Switch>
                    <Route exact path="/"/>
                </Switch>
                return <Redirect to=''/>

            </Router>

        }

        return (
            <div>
                Loging out..
            </div>
        )
    }
}

export default Logout;