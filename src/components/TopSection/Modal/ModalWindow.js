import React, { Component } from 'react'
import logo from '../../BottomSection/logo.png'
import {withRouter} from 'react-router-dom'
import {UserContext} from '../../../helpers/dataContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class ModalWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            showModal: false
        }
    }
    static contextType = UserContext;

    emailValidate = (value) => {
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    nameValidate = (value) => {
        return !/^([^0-9]*)$/.test(value);
    };

    saveData = (e) => {
        e.preventDefault();

        let form = e.target.parentElement;
        let firstName = form.querySelector('.fname').value.trim();
        let email = form.querySelector('.email').value.trim();


        if(firstName.length === 0) {
            this.setState({
                errors: ['Enter Name']
            });
            return this.state.errors
        }
        else if(email.length === 0) {
            this.setState({
                errors: ['Enter Email']
            });
            return this.state.errors
        } else if(this.nameValidate(firstName)) {
            this.setState({
                errors: ['Please enter name without digits']
            });
            return this.state.errors
        } else if(this.emailValidate(email)) {
            this.setState({
                errors: ['Invalid email format']
            });
            return this.state.errors
        } else {
            this.props.history.push('/members');
        }
    };

    handleClose = () => this.setState({ showModal: false });
    handleShow = () => this.setState({ showModal: true });

    render() {

        let languageManager = this.props.languageManager();

        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
export default withRouter(ModalWindow);
