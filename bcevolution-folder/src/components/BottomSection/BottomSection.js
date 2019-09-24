import React, { Component } from 'react'
import logo from './footer-logo.png'

export default class BottomSection extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className='BottomSection'>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="links">
                                    <a href="#">Home</a>
                                    <a onClick={() => this.props.pageHandler('privacy')}>Privacy Policy</a>
                                    <a onClick={() => this.props.pageHandler('terms')}>Terms</a>
                                    <a onClick={() => this.props.pageHandler('disc')}>Earnings Disclaimer</a>
                                    <a onClick={() => this.props.pageHandler('spam')}>Spam Policy</a>
                                </div>
                                <div className="content">
                                    <img src={logo} alt="logo" className="footerlogo"/>
                                    <div className="copyright">Copyright © Bitcoin Evolution. All Right Reserved.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
