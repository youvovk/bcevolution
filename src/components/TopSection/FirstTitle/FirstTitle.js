import React, { Component } from 'react'
import {AnimatedOnScroll} from "react-animated-css-onscroll";

export default class FirstTitle extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="FirstTitle">
                <div className="headline">
                    <div className="container">
                        <div className="col-12">
                            <div className="title">
                                <AnimatedOnScroll animationIn="fadeInDown">
                                    <h1>{languageManager.title}</h1>
                                </AnimatedOnScroll>
                            </div>
                            <div className="subtitle">
                                <AnimatedOnScroll animationIn="fadeInUp">
                                    <h2>{languageManager.subtitle}</h2>
                                </AnimatedOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}