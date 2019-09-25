import React, {Component} from 'react'
import qImage from './q.png'

export default class Faq extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="Faq">
                <div className="spacer"></div>
                <div className="faq-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>{languageManager.qna_title}</h2>
                            </div>
                            <div className="col-sm-12 question-block">
                                {
                                    languageManager.qna_question.slice(0,6).map((item, index) => {
                                        return (
                                            <div className="question" key={index}>
                                                <img src={qImage} alt="question"/>
                                                <div className="question-text">
                                                    <p className="question-title">{item.q}</p>
                                                    <p className="question-answer">{item.a}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="last-btn">
                        <a href="#" className="active">{languageManager.last_btn}</a>
                    </div>
                </div>
            </div>
        )
    }
}