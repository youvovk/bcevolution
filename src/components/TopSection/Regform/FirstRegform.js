import React, { Component } from 'react'
import logo from '../../BottomSection/logo.png'
import {Link, withRouter} from 'react-router-dom'
import {UserContext} from '../../../helpers/dataContext';


class FirstRegform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
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

    render() {

        let languageManager = this.props.languageManager();

        return (
            <div className="FirstRegform">
                <img src={logo} alt="logo" className="logo"/>
                <div className='inner'>
                    <div className='form-wrapper'>
                        {this.state.errors && <div className="errors">
                            {this.state.errors[0]}
                        </div>}
                        <input className="inputfield fname" type="text" name="firstName" onChange={(e) => {this.context.getValueFromInputs(e)}} placeholder={languageManager.fname} />
                        <input className="inputfield email" type="text" name="email" onChange={(e) => {this.context.getValueFromInputs(e)}} placeholder={languageManager.email} />
                        <Link to="/members" onClick={this.saveData} className='start'>{languageManager.button}</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(FirstRegform);
