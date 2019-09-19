import React, { Component } from 'react'


export default class People extends Component {
    constructor(props) {
        super(props);
        var random = this.rand();
        this.state = {
            random: random
        };

        let version = this.props.version;
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
        let version = this.props.version;

        return (
            <div className="People">
                <img src={version.customer[this.state.random].img} alt="" className="circle-photo"/>
                <div className="notification-text">
                    <p className="person-name"><span>{version.customer[this.state.random].name}</span> just made</p>
                    <p className="person-bet"><span>$</span><span>{version.customer[this.state.random].earn}</span></p>
                </div>
            </div>
        )

    }
}
