import React, { Component } from 'react'

import Regform from '../TopSection/Regform/Regform'

import logo from './bcprofitmin.svg'

export default class BottomSection extends Component {
    render() {
        let version = this.props.version;

        return (
            <div className='BottomSection'>
                <div className="bottomreg">
                    <div className="content">
                        <div className="title">{version.topreg1}</div>
                        <div className="subtitle">{version.topreg2}</div>
                        <div className="regform">
                            <Regform handlePassSync={this.props.handlePassSync}form={this.props.form} pageHandler={this.props.pageHandler} countryCode={this.props.countryCode} version={this.props.version} handleForward={this.props.handleForward} handleStep={this.props.handleStep} handleSubmit={this.props.handleSubmit} step={this.props.step}/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="content">
                        <img src={logo} alt="logo" className="footerlogo"/>
                        <div className="copyright">Copyright 2019 The Bitcoin Profit</div>
                        <div className="links">
                            <a onClick={() => this.props.pageHandler('gov')}>Government Disclaimer</a>  
                            <a onClick={() => this.props.pageHandler('privacy')}>Privacy Policy</a>
                            <a onClick={() => this.props.pageHandler('terms')}>Terms</a>
                            <a onClick={() => this.props.pageHandler('disc')}>Earnings Disclaimer</a>
                            <a onClick={() => this.props.pageHandler('spam')}>Spam Policy</a>
                        </div>
                        <div className="risk">
                            <p>
                                <b>{version.risk[0]}</b>: {version.risk[1]}
                            </p>
                            <p>
                                {version.risk[2]}
                            </p>

                            <p>
                                {version.risk[3]}
                            </p>

                            <p>
                                {version.risk[4]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
