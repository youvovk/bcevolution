import React, {Component} from 'react'
import qImage from './q.png'

export default class Faq extends Component {

    render() {
        let version = this.props.version;

        return (
            <div className="Faq">
                <div className="spacer"></div>
                <div className="faq-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>{version.qna_title}</h2>
                            </div>
                            <div className="col-sm-12 question-block">
                                {
                                    version.qna_question.slice(0,6).map((item, index) => {
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
                        <a href="#" className="active">{version.last_btn}</a>
                    </div>
                </div>
            </div>
        )
    }
}