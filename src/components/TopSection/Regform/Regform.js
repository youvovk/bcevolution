import React, { Component } from 'react'

import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

import { ReactComponent as Mark } from './excl.svg'


export default class Regform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            check: false,
            password: "",
            confirm_password: "",
            phone_country_prefix: "",
            tel: "",
            agree_1: true,
            agree_2: true,
            firstPassType: 'password',
            secondPassType: 'password'
        };

        this.setTextInputRef = element => {
            this.currentForm = element;
        };

        this.currentForm = null;
        this.infoBox = React.createRef();
        this.handleBackwards = this.handleBackwards.bind(this);
        this.handleSync = this.handleSync.bind(this);
    }

    handleClick = (e) => {
        if (e.target.getAttribute('data-type') === 'firstPassType') {
            this.setState(({firstPassType}) => ({
                firstPassType: firstPassType === 'text' ? 'password' : 'text'
            }));
        } else {
            this.setState(({secondPassType}) => ({
                secondPassType: secondPassType === 'text' ? 'password' : 'text'
            }));
        }
    };

    handleSelectFlag = (num, country) => {

        this.state.phone_country_prefix = '+' + country.dialCode;

    }

    handleForward = (e) => {
        let form = e.target.parentElement;

        let paramsToValidate = {};


        // Step 1
        if(this.props.step === 1){
            paramsToValidate = {
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                agree_2: this.state.agree_2
            };
            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleForward(paramsToValidate);
                this.props.handleStep(this.props.step + 1);
            }
            else{
                this.setState({
                    errors: submitResponse.errors
                })
            }
        }
        else if (this.props.step === 2){

            /*let tel = form.querySelector('.tel');
            let dialCode = document.getElementsByClassName(".selected-dial-code");

            let phone_number = dialCode.innerHTML + tel.value;
            phone_number = tel.value;
            console.log(phone_number);

            paramsToValidate = {
                phone_number: phone_number
            };*/

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
                this.setState({
                    errors: submitResponse.errors
                })
            }




            /*console.log(this.state.confirm_password);
            paramsToValidate = {
                password: this.state.password
            };*/
        }
        // Step 1 or 2
        /*if(this.props.step === 1 || this.props.step === 2){

            // Step 2


            console.log(this.props.step);


            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleForward(paramsToValidate);
                this.props.handleStep(this.props.step + 1);
            }
            else{
                this.setState({
                    errors: submitResponse.errors
                })
            }
        }*/
        // Step 3
        else if (this.props.step === 3){

            let tel = form.querySelector('.tel');
            let phone_number = tel.value;

            paramsToValidate = {
                phone_number: phone_number,
                phone_country_prefix: this.state.phone_country_prefix
            };
            console.log(paramsToValidate);

            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleSubmit(paramsToValidate);

            }
            else{
                this.setState({
                    errors: submitResponse.errors
                })
            }
        }

    }


    handleBackwards(e) {
        let back = parseInt(e.target.getAttribute('index'));
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                for (let i=1;i<=back;i++) {
                    step.classList.remove('step');
                }
            })
        });

        this.props.handleStep(parseInt(e.target.getAttribute('index')));
    }

    handleSync(e) {
        let input = e.target.value;
        let inputClass = e.target.className;
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            form.getElementsByClassName(inputClass)[0].value = input;
        })
    }

    componentDidUpdate() {
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                if (index+1 === this.props.step-1) {
                    step.classList.add('step');
                }
            })
        })
    }

    componentDidMount() {
        /*let inputs = [...document.querySelectorAll('.inputfield')];

        inputs.map(input => {
            input.addEventListener('change', this.handleSync);
        })*/
        /*this.phone_country_prefix = document.getElementsByClassName('selected-dial-code')*/
    }

    handleStepChange = (name, value) => {

        console.log(name, value);
        this.setState({[name]: value, errors: null}, () => {

            console.log(this.state);

            if(name === "password"){
                let submitResponse = this.props.validateParams({
                    password: value
                });

                if (!submitResponse.success) {
                    this.setState({
                        errors: submitResponse.errors
                    })
                }
                else{
                    this.setState({
                        errors: null
                    })
                }
            }
        });
    };

    render() {

        let languageManager = this.props.languageManager();

        return (
            <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                <div className="steps">
                    {[1,2,3].map(index => {
                        if(index <= this.props.step-1) {
                            return (
                                <div className="num check" key={index} index={index} onClick={this.handleBackwards}>✓</div>
                            )
                        } else {
                            return (
                                <div className="num" key={index}>{index}</div>
                            )
                        }
                    })}
                </div>
                <div className='inner'>
                    <div className='form-wrapper one'>
                        {this.state.errors && <div className="errors">
                            {this.state.errors[0]}
                        </div>}
                        <input className="inputfield fname" type="text" name="first_name" placeholder={languageManager.fname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                        <input className="inputfield lname" type="text" name="last_name" placeholder={languageManager.lname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                        <input className="inputfield email" type="text" name="email" placeholder={languageManager.email} autoComplete='off' onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                        <button onClick={this.handleForward} className='start'>{languageManager.button}</button>
                    </div>
                    <div className='form-wrapper two'>
                        {this.state.errors && <div className="errors">
                            {this.state.errors[0]}
                        </div>}
                        <div className="forw-wrapper_input">
                            <input className="inputfield pass" type={this.state.firstPassType} maxLength="10" onChange={(e) => this.handleStepChange(e.target.name, e.target.value)} name="password" placeholder={languageManager.pass}/>
                            <span onClick={this.handleClick} data-type="firstPassType" className={this.state.firstPassType === 'password' ? 'show-pass' : 'hide-pass'}></span>
                        </div>
                        <div className="help-block">
                            <div className="help-icon">
                                <div className="help-info">
                                    <p>{languageManager.morebox}</p>
                                </div>
                            </div>
                        </div>
                        <div className="forw-wrapper_input pass2">
                            <input className="inputfield pass" type={this.state.secondPassType} maxLength="10" onChange={(e) => this.handleStepChange(e.target.name, e.target.value)} name="confirm_password" placeholder={languageManager.pass2}/>
                            <span onClick={this.handleClick} data-type="secondPassType" className={this.state.secondPassType === 'password' ? 'show-pass' : 'hide-pass'}></span>
                        </div>
                        <ul className='req'>
                            {languageManager.passtest.map(li => {
                                return (<li key={li}>{li}</li>)
                            })}
                        </ul>
                        <button onClick={this.handleForward} className='start'>{languageManager.button}</button>
                    </div>
                    <div className='form-wrapper three'>
                        {this.state.errors && <div className="errors">
                            {this.state.errors[0]}
                        </div>}
                        <IntlTelInput
                            preferredCountries={[this.props.countryCode]}
                            containerClassName="intl-tel-input"
                            inputClassName="inputfield tel"
                            autoPlaceholder={true}
                            separateDialCode={true}
                            onSelectFlag={this.handleSelectFlag}
                        />
                        <button onClick={this.handleForward} className='start' >{languageManager.button_last}</button>
                    </div>
                </div>
                <div className="error"><Mark className='excl'/><span></span></div>
            </div>
        )
    }
}
