import React, {Component} from 'react'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import first from './img/first.png'
import second from './img/second.png'
import third from './img/third.jpg'
import fours from './img/fours.jpg'


export default class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            images: [
                first,
                second,
                third,
                fours
            ]
        };
    }

    openLigthbox = (e) => {
        this.setState({
            isOpen: true,
            photoIndex: e.target.getAttribute('data-index')
        })
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
                                    <div className="col-lg-3 col-md-3 news-main-box" key={index}>
                                        <div className={"news-box news"+(index + 1)}>
                                            <p className="news-box-text">{item.text}</p>
                                            <button data-index={index} onClick={this.openLigthbox} className="news-box-link">{item.link}</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.images[this.state.photoIndex]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />)}
            </div>
        )
    }
}