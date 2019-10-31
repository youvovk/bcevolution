import React, { Component } from 'react'

import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import SecondRegform  from './Regform/SecondRegform'
import SecondTitle  from './SecondTitle/SecondTitle'
import Carousel from 'react-bootstrap/Carousel'

import video2 from './members-en.mp4'


export default class SecondTopSection extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className='TopSection'>
                <SecondTitle languageManager={this.props.languageManager} />
                <div className="top-reg" id="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-sm-12">
                                <VideoPlayer link={video2} />
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="regform">
                                    <SecondRegform success={this.props.success} validateParams={this.props.validateParams} form={this.props.form} pageHandler={this.props.pageHandler} countryCode={this.props.countryCode} languageManager={this.props.languageManager} handleStep={this.props.handleStep} handleForward={this.props.handleForward} handleSubmit={this.props.handleSubmit} step={this.props.step}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed-block">
                    <div className="numbers">
                        <Carousel pauseOnHover={false} wrap={false} indicators={false} controls={false}>
                            <Carousel.Item>
                                <p>5</p>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p>4</p>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p>2</p>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="text-description">
                        <p>{languageManager.fixed_block}</p>
                    </div>
                </div>
            </div>
        )
    }
}
