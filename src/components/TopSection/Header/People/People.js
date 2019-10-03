import React, { Component } from 'react'
import amelie from './images/amelie.jpg'
import chris from './images/chris.jpg'
import isabel from './images/isabel.jpg'
import kiyle from './images/kiyle.jpg'


export default class People extends Component {
    constructor(props) {
        super(props);
        var random = this.rand();
        this.state = {
            random: random,
            images: {
                chris,
                isabel,
                amelie,
                kiyle
            }
        };

    }

    rand() {
        const random = Math.floor(Math.random() * 3);
        return random;
    }
    componentDidMount() {
        const _this = this;
        this.timer = setInterval(function(){
            var random = _this.rand();
            _this.setState({
                random: random,
            })
        },5000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="People">
                <img src={this.state.images[languageManager.customer[this.state.random].img]} alt="" className="circle-photo"/>
                <div className="notification-text">
                    <p className="person-name"><span>{languageManager.customer[this.state.random].name}</span> {languageManager.invest}</p>
                    <p className="person-bet"><span>{languageManager.currency}</span><span>{languageManager.customer[this.state.random].earn}</span></p>
                </div>
            </div>
        )

    }
}
