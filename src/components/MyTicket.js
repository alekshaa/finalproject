import React, {Component} from 'react';
import TicketForm from "./TicketForm";
import './MyTicket.css';
import {Modal} from "react-bootstrap";

class MyTicket extends Component {

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render(){
        return (
            <div className="container">
                <button className="btn btn-info button button1" onClick={this.toggleModal}>
                    <i className="plus">+</i>
                    <span className="button-text">TICKET!</span>
                </button>
                <Modal show={this.state.isOpen}>
                    <TicketForm reFetchList={this.props.reFetchList} onClose={this.toggleModal} firebaseUserId={this.props.firebaseUserId} username={this.props.username} />
                </Modal>
            </div>
        );
    }
}
export default MyTicket;