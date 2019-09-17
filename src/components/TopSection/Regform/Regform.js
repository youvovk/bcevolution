import React, { Component } from 'react'

import * as validateInput from '../../../helpers/validateInput'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

import * as errorMessage from '../../../helpers/errorMessage'

import { ReactComponent as Check } from './check.svg'
import { ReactComponent as Mark } from './excl.svg'
import lock from './lock.svg'
import logo from '../../BottomSection/bcprofitmin.svg'


export default class Regform extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fname: this.props.form.first_name,
            lname: this.props.form.last_name,
            email: this.props.form.email,
            check: false,
            pass: this.props.form.password,
            tel: this.props.form.phone_number,
        }

        this.setTextInputRef = element => {
            this.currentForm = element;
        };

        this.currentForm = null;
        this.infoBox = React.createRef();
        this.handleBackwards = this.handleBackwards.bind(this);
        this.handleSync = this.handleSync.bind(this);
    }

    handleForward(e) {
        let form = e.target.parentElement;
        let values = [];
        
        // Step 1
        if (form.classList.contains('one')) {

            if(!form.querySelector('.accept').checked && !this.state.check) {
                errorMessage.errorMessage(form.querySelector('.required'), 'Please accept this if you want to proceed');
            } else {
                values[3] = true;
            }

            let inputs = [...form.querySelectorAll('.inputfield')];

            inputs.map((input, index) => {
                if(input.value.length === 0) {
                    errorMessage.errorMessage(input, 'Please fill this field');
                } else if ((index === 0 || index === 1) && !validateInput.checkOnlyLetters(input.value)) {
                    errorMessage.errorMessage(input, 'Use letters only');
                } else if ((index === 2) && !validateInput.validateEmail(input.value)) {
                    errorMessage.errorMessage(input, 'Invalid email format');
                } else {
                    switch (index) {
                        case 0:
                            values[0] = input.value;
                            break;
                        case 1:
                            values[1] = input.value;
                            break;
                        case 2:
                            values[2] = input.value;
                            break;
                    }
                }

                if (values[0] && values[1] && values[2] && values[3]) {
                    this.setState({
                        fname: values[0],
                        lname: values[1],
                        email: values[2],
                        check: values[3]
                    }, () => {
                        if(window.sbidTracking){
                            window.sbidTracking.settings.params.email = this.state.email;
                            window.sbidTracking.settings.params.fname = this.state.fname;
                            window.sbidTracking.settings.params.lname = this.state.lname;
                        }
                    });
                    this.props.handleForward(values[0], values[1], values[2]);
                    this.props.handleStep(this.props.step + 1);
                }
            })
        }

        // Step 2
        if (form.classList.contains('two')) {
            this.setState({
                fname: this.props.form.first_name,
                lname: this.props.form.last_name,
                email: this.props.form.email,
            }, () => {
                let reqs = [...form.querySelectorAll('li')];

                if(reqs.every(req => req.classList.contains('ok'))){
    
                    this.setState({
                        pass: form.querySelector('.pass').value, 
                    }, () => {
                        if(window.sbidTracking){
                            window.sbidTracking.settings.params.password = true;
                        }
                        this.props.handlePassSync(this.state.pass);
                    });

                    this.props.handleStep(this.props.step + 1);
                }
            })
        }

        // Step 3
        if (form.classList.contains('three')) {
            this.setState({
                fname: this.props.form.first_name,
                lname: this.props.form.last_name,
                email: this.props.form.email,
                pass: this.props.form.password,
            }, () => {
                let tel = form.querySelector('.tel');
                let intel = form.querySelector('.intl-tel-input');
    
                if(tel.value.length === 0) {
                    errorMessage.errorMessage(intel, 'Please fill this field');
                } else if(!validateInput.checkOnlyNumbers(tel.value)) {
                    errorMessage.errorMessage(intel, 'Use numbers only');
                } else {
                    this.setState({
                        tel: tel.value
                    }, () => {
                        this.props.handleStep(this.props.step + 1);
                        this.props.handleSubmit(this.state.fname, this.state.lname, this.state.email, this.state.tel, this.state.pass); 
                    })
                }
            })


        }
    }

    handleBackwards(e) {
        let back = parseInt(e.target.getAttribute('index'));
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                for (let i=0;i<=back;i++) {
                    step.classList.remove('step');
                }
            })
        })

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
        let inputs = [...document.querySelectorAll('.inputfield')];

        inputs.map(input => {
            input.addEventListener('change', this.handleSync);
        })
    }

    handleFirstStepChange = () => {
        if (window.sbidTracking) {
            window.sbidTracking.settings.params.start_edit = "1";
        }
    };

    render() {

        let version = this.props.version;

        if (this.props.step <= 3) {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <div className="steps">
                        {[1,2,3].map(index => {
                            if(index <= this.props.step-1) {
                                return (
                                    <div className="num check" key={index} index={index} onClick={this.handleBackwards}><Check className="checksvg"/></div>
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
                            <input className="inputfield fname" type="text" name="fname" placeholder={version.fname} onChange={this.handleFirstStepChange}/>
                            <input className="inputfield lname" type="text" name="lname" placeholder={version.lname} onChange={this.handleFirstStepChange}/>
                            <input className="inputfield email" type="text" name="email" placeholder={version.email} autoComplete='off' onChange={this.handleFirstStepChange}/>
                            <div className='agreement'>
                                <input type="checkbox" name="agree_one" />
                                <span>{version.req1[0]} <a onClick={() => this.props.pageHandler('privacy')}>{version.req1[1]}</a></span>
                            </div>
                            <div className='agreement required'>
                                <input type="checkbox" className='accept' name="agree_two" />
                                <span>{version.req2[0]} <a onClick={() => this.props.pageHandler('terms')}>{version.req2[1]}</a>{version.req2[2]}<a onClick={() => this.props.pageHandler('privacy')}>{version.req2[3]}</a>{version.req2[4]}</span>
                            </div>
                            <button onClick={this.handleForward.bind(this)} className='start'>{version.button}</button>
                            <div className="bottominfo"><img src={lock} alt="lock"/>{version.bottominfo}<div className="more" onMouseOver={() => this.infoBox.current.style.opacity = "1"} onMouseOut={() => this.infoBox.current.style.opacity = "0"} >{version.more}</div><div className="morebox" ref={this.infoBox}>{version.morebox}</div></div>
                        </div>
                        <div className='form-wrapper two'>
                            <input className="inputfield pass" type="password" maxLength="10" onChange={validateInput.checkInput} name="password" placeholder={version.pass}/>
                            <ul className='req'>
                                {version.passtest.map(li => {
                                    return (<li key={li}>{li}</li>)
                                })}
                            </ul>
                            <button onClick={this.handleForward.bind(this)} className='start'>{version.button}</button>
                        </div>
                        <div className='form-wrapper three'>
                            <IntlTelInput
                                preferredCountries={[this.props.countryCode]}
                                containerClassName="intl-tel-input"
                                inputClassName="inputfield tel"
                                autoPlaceholder={true}
                                separateDialCode={true}
                                />
                            <button onClick={this.handleForward.bind(this)} className='start' >{version.button_last}</button>
                        </div>
                    </div>
                    <div className="error"><Mark className='excl'/><span></span></div>
                </div>
            )
        } else {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <img src={logo} alt="lodaing" className="loading"/>
                </div>
            )
        }
    }
}
