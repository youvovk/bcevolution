import React, { Component } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import logo from '../../BottomSection/logo.png'
import hint from './6b.png'
import {UserContext} from '../../../helpers/dataContext';


export default class SecondRegform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: "",
            email: '',
            check: false,
            password: "",
            phone_country_prefix: "",
            tel: "",
            agree_1: true,
            agree_2: true,
            errorIndexes: [0,1,2,3]
        };

    }

    handleSelectFlag = (num, country) => {
        this.setState({
            phone_country_prefix: '+' + `${country.dialCode}`
        })

    };

    phoneNumberBlur = (status, value, countryData) => {
        this.setState({
            phone_country_prefix: '+' + `${countryData.dialCode}`
        })
    }

    phoneValidate = (value) => {
        return !/[^0-9\-\/]/.test(value);
    };

    nameValidate = (value) => {
        return !/^([^0-9]*)$/.test(value);
    };

    handleForward = (e) => {
        console.log(this.props);
        let form = e.target.parentElement;
        let paramsToValidate = {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
            agree_2: this.state.agree_2
        };

        let tel = form.querySelector('.tel');
        let phone_number = tel.value;


        if (!this.phoneValidate(phone_number)) {
            this.setState({
                errors: ['Enter only number']
            });
            return this.state.errors
        }
        else if (phone_number.length > 3) {
            paramsToValidate = {
                phone_number: phone_number,
                phone_country_prefix: this.state.phone_country_prefix
            };

            let submitResponse = this.props.validateParams(paramsToValidate);
            if (submitResponse.success) {
                this.props.handleSubmit(paramsToValidate);
            }
            else{
                this.setState({
                    errors: submitResponse.errors
                })
            }
        }else {
            this.setState({
                errors: ['Enter phone number']
            });
            return this.state.errors
        }
        let submitResponse = this.props.validateParams(paramsToValidate);

        if (submitResponse.success) {
            this.props.handleSubmit(paramsToValidate);
        }
        else{
            this.setState({
                errors: submitResponse.errors
            })
        }

        /*// Step 1
        if(this.props.step === 1){
            paramsToValidate = {
                email: this.context.email,
                first_name: this.context.firstName,
                last_name: this.state.last_name,
                password: this.state.password,
                agree_2: this.state.agree_2
            };
            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleForward(paramsToValidate);
            }
            else{
                this.setState({
                    errors: submitResponse.errors
                })
            }
        }
        else if (this.props.step === 2){

            if (this.state.confirm_password === this.state.password) {
                paramsToValidate = {
                    password: this.state.password
                }
            } else {
                this.setState({
                    errors: ['Passwords do not match']
                })
                return this.state.errors
            }

            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleForward(paramsToValidate);
                this.props.handleStep(this.props.step + 1);
            }
            else{

            }
        }

        // Step 3
        else if (this.props.step === 3){

            let tel = form.querySelector('.tel');
            let phone_number = tel.value;


            if (!this.phoneValidate(phone_number)) {
                this.setState({
                    errors: ['Enter only number']
                });
                return this.state.errors
            }
            else if (phone_number.length > 3) {
                paramsToValidate = {
                    phone_number: phone_number,
                    phone_country_prefix: this.state.phone_country_prefix
                };

                let submitResponse = this.props.validateParams(paramsToValidate);
                if (submitResponse.success) {
                    this.props.handleSubmit(paramsToValidate);
                    this.props.handleStep(this.props.step + 1);
                }
                else{
                    this.setState({
                        errors: submitResponse.errors
                    })
                }
            }else {
                this.setState({
                    errors: ['Enter phone number']
                });
                return this.state.errors
            }
        }*/
    };

    componentDidUpdate() {

    }

    handleStepChange = (name, value) => {
        if (name === 'first_name') {
            let firstNameValue = value;
            if (this.nameValidate(firstNameValue)) {
                this.setState({
                    errors: ['Please enter name without digits']
                });
                return this.state.errors
            } else {
                this.setState({first_name: firstNameValue});
            }
        } else if (name === 'last_name') {
            let SecondNameValue = value;
            if (this.nameValidate(SecondNameValue)) {
                this.setState({
                    errors: ['Please enter name without digits']
                });
                return this.state.errors
            } else {
                this.setState({last_name: SecondNameValue});
            }
        } else if (name === 'password') {
            let passwordValue = value;
            this.setState({password: passwordValue});
        }
        /*let errors = null;
        if (name === 'password') {
            const submitResponse = this.props.validateParams({
                password: value
            });

            let submitErrs = [];
            let staticErrors = [
                "The password must be 8 characters long",
                "Must contain at least 1 small letter",
                "Must contain at least 1 number",
                "Must contain at least 1 capital letter",
            ];

            submitErrs.push(submitResponse.errors);

            const errorIndexes = submitErrs[0].reduce((errorsIndexesArray, error) => {
                const errorIndex = staticErrors.indexOf(error);
                errorsIndexesArray.push(errorIndex);
                return errorsIndexesArray;
            }, []);

            this.setState({ errorIndexes });
        }*/
    };


    render() {
        console.log(this.props.onSubmit);

        let languageManager = this.props.languageManager();

        return (
            <UserContext.Consumer>
                {context => (
                    <div className="SecondRegform">
                        <img src={logo} alt="logo" className="logo small"/>
                        <div className='inner'>
                            <div className='form-wrapper one'>
                                {/*{this.state.errors && <div className="errors">
                                {this.state.errors[0]}
                            </div>}*/}
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input className="inputfield fname small-input" type="text" name="first_name" defaultValue={context.firstName} placeholder={languageManager.fname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                                    </div>
                                    <div className="col-lg-6">
                                        <input className="inputfield lname small-input" type="text" name="last_name" placeholder={languageManager.lname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                                    </div>
                                </div>
                                <input className="inputfield email small-input" type="text" name="email" placeholder={languageManager.email} defaultValue={context.email} autoComplete='off' onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                                <input className="inputfield pass small-input" type="password" maxLength="8" onChange={(e) => this.handleStepChange(e.target.name, e.target.value)} name="password" placeholder={languageManager.pass}/>
                                <img src={hint} alt="hint" className="hint"/>
                                <IntlTelInput
                                    preferredCountries={[this.props.countryCode]}
                                    containerClassName="intl-tel-input"
                                    inputClassName="inputfield tel small-input"
                                    autoPlaceholder={true}
                                    separateDialCode={true}
                                    onSelectFlag={this.handleSelectFlag}
                                    onPhoneNumberBlur={this.phoneNumberBlur}
                                />
                                <button onClick={this.handleForward} className='start' >{languageManager.button_last}</button>
                            </div>
                        </div>
                    </div>
                )}
            </UserContext.Consumer>
        )
    }
}
