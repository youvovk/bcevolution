import React, { Component } from 'react'

import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import FirstRegform  from './Regform/FirstRegform'
import FirstTitle  from './FirstTitle/FirstTitle'

import video from './lp-en.mp4'


export default class TopSection extends Component {

    render() {

        return (
            <div className='TopSection'>
                <FirstTitle languageManager={this.props.languageManager} />
                <div className="top-reg" id="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-sm-12">
                                <VideoPlayer link={video} />
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="regform">
                                    <FirstRegform validateParams={this.props.validateParams} form={this.props.form} pageHandler={this.props.pageHandler} countryCode={this.props.countryCode} languageManager={this.props.languageManager} handleStep={this.props.handleStep} handleForward={this.props.handleForward} handleSubmit={this.props.handleSubmit} step={this.props.step}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
