import React, {Component} from 'react'
import bitimg from './img/bitimg.jpg'
import bitimg2 from './img/bitimg2.jpg'

export default class MoreNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                bitimg,
                bitimg2
            }
        }
    }

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="MoreNews">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>{languageManager.more_news_title}</h2>
                        </div>
                        {
                            languageManager.more_news_description.slice(0, 2).map((item, index) => {
                                return (
                                    <div className="col-lg-6 more-news_description" key={index}>
                                        <img src={this.state.images[item.img]} alt=""/>
                                        <h3 className="more-news_text">{item.title}</h3>
                                        <p className="more-news_text">{item.description}</p>
                                        <a href="#" className="link">{item.link}</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}