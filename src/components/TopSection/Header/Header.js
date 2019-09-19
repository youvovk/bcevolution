import React, { Component } from 'react'

import logo from './logo.png'
import headerPhoto from './header-photos/1.jpg'

export default class Header extends Component {
    constructor(props) {
        super(props);

        let today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        this.state = {
            date: date,
            time: {},
            seconds: 330
        };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(sec){

        let divisor_for_minutes = sec % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        minutes = ("0" + minutes).slice(-2);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.round(divisor_for_seconds);
        seconds = ("0" + seconds).slice(-2);

        let obj = {
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        let version = this.props.version;

        return (
            <header className='Header'>
                <div className="intro">
                    <p><b>{version.risk[0]}</b> {version.risk[1]} <b>{this.state.date} {version.risk[2]}</b> {this.state.time.m}:{this.state.time.s}</p>
                </div>
                {/*<button onClick={this.startTimer}>Start</button>*/}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-4 col-sm-12 logo">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="col-lg-6 col-md-8 col-sm-12 hidden-md">
                            <div className="row">
                                <div className="col-sm-6 exclusive">
                                    <p>{version.exclusive[0]}<br/><strong><span>Ukraine</span><br/>{version.exclusive[1]}</strong></p>
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
