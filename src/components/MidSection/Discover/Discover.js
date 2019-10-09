import React, {Component} from 'react'


export default class Discover extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="Discover">
                <div className="container">
                    <div className="row">
                        <div className="col-12 discover_title">
                            <h2>{languageManager.discover_title}</h2>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {
                            languageManager.discover_descriptions.slice(0, 4).map((item, index) => {
                                return (
                                    <div className="col-lg-3 news-main-box" key={index}>
                                        <div className={"news-box news"+(index + 1)}>
                                            <p className="news-box-text">{item.text}</p>
                                            <a href="#" className="news-box-link">{item.link}</a>
                                        </div>
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