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
        let version = this.props.version;

        return (
            <div className='TopSection'>
                <Header version={this.props.version} handleScroll={this.handleScroll.bind(this)}/>
                <div className="headline">
                    <div className="title">
                        <h1>{version.title}</h1>
                    </div>
                    <div className="subtitle">
                        <h2>{version.subtitle}</h2>
                        <h4>{version.subtitle2[0]} <span>{version.subtitle2[1]}</span>{version.subtitle2[2]} <span>{version.subtitle2[3]}</span> {version.subtitle2[4]}</h4>
                    </div>
                </div>
                <div className="top-reg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-7">
                                <VideoPlayer link={video} />
                            </div>
                            <div className="col-md-4 col-sm-5">
                                <div className="regform" ref={this.regPanel}>
                                    <div className="reg-title"><span>{version.topreg1}</span><br/>{version.topreg2}</div>
                                    <Regform handlePassSync={this.props.handlePassSync} form={this.props.form} pageHandler={this.props.pageHandler} countryCode={this.props.countryCode} version={this.props.version} handleStep={this.props.handleStep} handleForward={this.props.handleForward} handleSubmit={this.props.handleSubmit} step={this.props.step}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
