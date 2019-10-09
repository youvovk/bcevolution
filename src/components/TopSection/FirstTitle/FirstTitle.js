import React, { Component } from 'react'

export default class FirstTitle extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="FirstTitle">
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
            </div>
        )
    }
}