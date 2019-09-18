import React, {Component} from 'react'


export default class Review extends Component {
    render() {
        let version = this.props.version;

        return (
            <div className="Review">
                <div className="review-title">
                    <div className="opacity-block">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-10 offset-sm-2">
                                    <p>{version.review_title}</p>
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
                                version.review_body.slice(0,4).map(item => {
                                    return (
                                        <div className="col-md-3 border-line">
                                            <div className="person-block">
                                                <div className="person-card">
                                                    <img src={item.img} alt={item.name}/>
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