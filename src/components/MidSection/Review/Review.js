import React, {Component} from 'react'
import testimoniala from './images/testimoniala.png'
import testimonialb from './images/testimonialb.png'
import testimonialc from './images/testimonialc.png'
import testimoniald from './images/testimoniald.png'


export default class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                testimoniala,
                testimonialb,
                testimonialc,
                testimoniald
            }
        }
    }
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="Review">
                <div className="review-title">
                    <div className="opacity-block">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-10 offset-sm-2">
                                    <p>{languageManager.review_title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="review-block">
                    <div className="container">
                        <div className="row border-block">
                            {
                                languageManager.review_body.slice(0,4).map((item, index) => {
                                    return (
                                        <div className="col-lg-3 border-line" key={index}>
                                            <div className="person-block">
                                                <div className="person-card">
                                                    <img src={this.state.images[item.img]} alt={item.name}/>
                                                    <div className="person-name">
                                                        <p>{item.name}</p>
                                                        <p>{item.place}</p>
                                                    </div>
                                                </div>
                                                <div className="review-text">
                                                    <p>{item.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}