import React, {Component} from 'react';
import './App.css';
import TicketList from "./components/TicketList";
import Title from "./components/Title";
import MyTicket from "./components/MyTicket";
import {fetchTickets} from "./components/Fetch";
import Authentication from "./components/Authetication/Authetication";
import Login from "./components/Authetication/Login";
import Logout from "./components/Authetication/Logout";
import {app, base} from "./components/Authetication/base";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


class App extends Component {

    state = {
        data: [],
        authenticated: false,
        loading: true // estää välkkymisen kun sivu latautuu
    };

    componentDidMount() {
        this.fetchTicketsAndUpdate()
    }

    componentWillMount() {
        // LOGIN LISTENER
        // for undo
        this.removeAuthListner = app.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState(
                        {
                            authenticated: true,
                            loading: false
                        }
                    )
                } else {
                    this.setState({
                        authenticated: false,
                        loading: false
                    })
                }
            {console.log("authenticated: " + this.state.authenticated)}
            }
        )
    }

    componentWillUnmounth() {
        this.removeAuthListner(); // logout
    }

    fetchTicketsAndUpdate = () => {
        fetchTickets(function (tickets) {
            console.log("Tiketit haettu. " + tickets.length)
            this.setState({data: tickets});
        }.bind(this));
    }

    reFetchList = () => {
        this.fetchTicketsAndUpdate();
    }

    render() {
        console.log("App render");

        // jos lataa, niin ei vielä näytä mtn.
        if (this.state.loading === true) {
            return (
                // Näyttää tämän kunnes sivu on latautunut - näin ei tule välähdyksiä väärästä sisällöstä
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        return (
            <div className="App">
                <Authentication authenticated={this.state.authenticated}/>
                <Login authenticated={this.state.authenticated}/>

                <Router>
                    <Route exact path="/login" render={(props) => {
                        return <Login setCurrentUser={this.setCurrentUser} {...props} />
                    }}/>
                </Router>
                <Router>
                    <Route exact path="/logout" component={Logout}/>
                </Router>

                <Title/>
                <TicketList data={this.state.data}/>
                <MyTicket reFetchList={this.reFetchList}/>
            </div>
        );
    }
}

export default App;
