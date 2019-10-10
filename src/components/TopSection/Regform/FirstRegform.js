import React, { Component } from 'react'
import logo from '../../BottomSection/logo.png'
import {Link} from 'react-router-dom'


export default class FirstRegform extends Component {
    constructor(props) {
        super(props);

    }
    render() {

        let languageManager = this.props.languageManager();

        return (
            <div className="FirstRegform">
                <img src={logo} alt="logo" className="logo"/>
                <div className='inner'>
                    <div className='form-wrapper'>
                        {/*{this.state.errors && <div className="errors">
                                {this.state.errors[0]}
                            </div>}*/}
                        <input className="inputfield fname" type="text" name="first_name" placeholder={languageManager.fname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                        <input className="inputfield email" type="text" name="email" placeholder={languageManager.email} autoComplete='off' onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                        {/*<button onClick={this.handleForward} className='start'>{languageManager.button}</button>*/}
                        <Link to="/members" onClick={this.handleForward} className='start'>{languageManager.button}</Link>
                    </div>
                </div>
            </div>
        )
    }
}
