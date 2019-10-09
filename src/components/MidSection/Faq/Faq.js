import React, { Component } from 'react'

export default class Faq extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="Faq">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="faq-title">{languageManager.faq_title}</p>
                            <div className="row questions-main-block">
                                {
                                    languageManager.faq_description.slice(0, 6).map((item, index) => {
                                        return (
                                            <div className="col-12 question-block" key={index}>
                                                <p className="question">{item.question}</p>
                                                <p className="answer">{item.answer}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}