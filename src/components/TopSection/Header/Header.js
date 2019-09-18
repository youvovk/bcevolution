import React, { Component } from 'react'

import logo from './logo.png'
import headerPhoto from './header-photos/1.jpg'

export default class Header extends Component {
    constructor(props) {
        super(props);

        let today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        this.state = {
            date: date
        };
    }

    render() {
        let version = this.props.version;

        return (
            <header className='Header'>
                <div className="intro">
                    <p><b>WARNING:</b> Due to extremely high media demand, we will close registration as of <b>{this.state.date} - HURRY!</b> 00:00</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-4 logo">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="col-md-6 col-sm-8 hidden-xs">
                            <div className="row">
                                <div className="col-sm-6 exclusive">
                                    <p>Exclusive for<br/><strong><span>Ukraine</span><br/>Residents</strong></p>
                                </div>
                                <div className="col-sm-6 notification-top">
                                    <img src={headerPhoto} alt="" className="circle-photo"/>
                                    <div className="notification-text">
                                        <p className="person-name"><span>Ben K.</span> just made</p>
                                        <p className="person-bet"><span>$</span><span>150</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
