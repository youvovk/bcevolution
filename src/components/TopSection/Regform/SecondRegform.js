import React, { Component } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import logo from '../../BottomSection/logo.png'
import hint from './6b.png'


export default class SecondRegform extends Component {
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
            secondPassType: 'password',
            errorIndexes: [0,1,2,3]
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

        const input = e.target.getAttribute('data-type');
        this.setState((state) => ({
            [input] : state[input] === 'password' ? 'text' : 'password'
        }));

    };

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
            console.log(this.props)

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
        }
    };

    handleBackwards(e) {
        e.preventDefault();
        let back = parseInt(e.target.getAttribute('index'));
        let forms = [...document.querySelectorAll('.SecondRegform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                for (let i=0;i<=back;i++) {
                    step.classList.remove('step');
                }
            })
        });

        this.props.handleStep(parseInt(e.target.getAttribute('index')));
    }

    handleSync(e) {
        let input = e.target.value;
        let inputClass = e.target.className;
        let forms = [...document.querySelectorAll('.SecondRegform')];

        forms.map(form => {
            form.getElementsByClassName(inputClass)[0].value = input;
        })
    }

    componentDidUpdate() {
        let forms = [...document.querySelectorAll('.SecondRegform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                if (index+1 === this.props.step-1) {
                    step.classList.add('step');
                }
            })
        })
    }

    handleStepChange = (name, value) => {
        let errors = null;
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
        }
        this.setState({[name]: value, errors});

    };


    render() {

        let languageManager = this.props.languageManager();

        return (
            <div className="SecondRegform">
                <img src={logo} alt="logo" className="logo small"/>
                <div className='inner'>
                    <div className='form-wrapper one'>
                        {/*{this.state.errors && <div className="errors">
                                {this.state.errors[0]}
                            </div>}*/}
                        <div className="row">
                            <div className="col-lg-6">
                                <input className="inputfield fname small-input" type="text" name="first_name" placeholder={languageManager.fname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            </div>
                            <div className="col-lg-6">
                                <input className="inputfield lname small-input" type="text" name="last_name" placeholder={languageManager.lname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            </div>
                        </div>
                        <input className="inputfield email small-input" type="text" name="email" placeholder={languageManager.email} autoComplete='off' onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
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
        )
    }
}
