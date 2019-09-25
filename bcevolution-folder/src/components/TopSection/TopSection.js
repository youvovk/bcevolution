import React, { Component } from 'react'

import Header from './Header/Header'
import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import Regform  from './Regform/Regform'

import video from './en-1.mp4'
import badges from './badges.png'


export default class TopSection extends Component {
    constructor(props) {
        super(props)

        this.regPanel = React.createRef();
    }
    

    handleScroll() {

        let panel = this.regPanel.current;
        console.log(panel.offsetTop)

        window.scrollTo({
            top: panel.offsetTop,
            left: 0,
            behavior: 'smooth'
        })

    }


    /*componentDidMount() {


        setTimeout(() => {
            if (document.querySelector('.modalscreen') && window.innerWidth > 768) {
                document.querySelector('.modalscreen').style.display = 'flex';
            }
        }, 
        2000);
    }*/

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className='TopSection'>
                <Header languageManager={this.props.languageManager} handleScroll={this.handleScroll.bind(this)}/>
                <div className="headline">
                    <div className="title">
                        <h1>{languageManager.title}</h1>
                    </div>
                    <div className="subtitle">
                        <h2>{languageManager.subtitle}</h2>
                        <h4>{languageManager.subtitle2[0]} <span>{languageManager.subtitle2[1]}</span>{languageManager.subtitle2[2]} <span>{languageManager.subtitle2[3]}</span> {languageManager.subtitle2[4]}</h4>
                    </div>
                </div>
                <div className="top-reg" id="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-sm-12">
                                <VideoPlayer link={video} />
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="regform" ref={this.regPanel}>
                                    <div className="reg-title"><span>{languageManager.topreg1}</span><br/>{languageManager.topreg2}</div>
                                    <Regform validateParams={this.props.validateParams} form={this.props.form} pageHandler={this.props.pageHandler} countryCode={this.props.countryCode} languageManager={this.props.languageManager} handleStep={this.props.handleStep} handleForward={this.props.handleForward} handleSubmit={this.props.handleSubmit} step={this.props.step}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
