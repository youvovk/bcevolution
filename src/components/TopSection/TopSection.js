import React, { Component } from 'react'

import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import Regform  from './Regform/Regform'

import video from './lp-en.mp4'


export default class TopSection extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className='TopSection'>
                <div className="headline">
                    <div className="container">
                        <div className="col-12">
                            <div className="title">
                                <h1>{languageManager.title}</h1>
                            </div>
                            <div className="subtitle">
                                <h2>{languageManager.subtitle}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-reg" id="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-sm-12">
                                <VideoPlayer link={video} />
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="regform">
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
