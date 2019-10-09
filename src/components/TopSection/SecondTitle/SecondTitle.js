import React, { Component } from 'react'

export default class SecondTitle extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="FirstTitle">
                <div className="headline">
                    <div className="container">
                        <div className="col-12">
                            <div className="title">
                                <h1>{languageManager.title2}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}