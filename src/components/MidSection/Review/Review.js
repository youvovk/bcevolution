import React, {Component} from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import estella from './images/test1231.jpg'
import snapbag from './images/snapbag.jpeg'
import yacht from './images/me-p-500.jpeg'
import gary from './images/test231.jpg'
import jacob from './images/test1.jpg'
import rolex from './images/rolex.jpeg'
import leo from './images/testtt.jpg'
import jump from './images/shutterstock_1224656441-p-800.jpeg'
import richard from './images/testi122.jpg'
import money from './images/money.jpg'
import robert from './images/tttes.jpg'
import car from './images/Mercedes-Key.jpg'
import robertM from './images/testimonial-4.jpg'
import dennis from './images/1222.jpg'
import william from './images/123.jpg'


export default class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                estella,
                snapbag,
                yacht,
                gary,
                jacob,
                rolex,
                leo,
                jump,
                richard,
                money,
                robert,
                car,
                robertM,
                dennis,
                william
            }
        }
    }
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="Review">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="title">{languageManager.review_title}</h2>
                            <p className="subtitle">{languageManager.review_subtitle}</p>
                        </div>
                    </div>
                    <div className="row">
                        <Tab.Container id="tabs" defaultActiveKey="first">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <Nav>
                                            <Nav.Item variant="pills">
                                                <Nav.Link eventKey="first">Page 1</Nav.Link>
                                                <Nav.Link eventKey="second">Page 2</Nav.Link>
                                                <Nav.Link eventKey="third">Page 3</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                    <div className="col-lg-12">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                {
                                                    languageManager.review_body.first.slice(0,4).map((item, index) => {
                                                        return (
                                                            <div className="border-block" key={index}>
                                                                <div className="row">
                                                                    <div className="col-lg-7 col-md-7 information">
                                                                        <div className="author">
                                                                            <img src={this.state.images[item.avatar]} alt={item.avatar}/>
                                                                            <div className="author-info">
                                                                                <p className="name">{item.name}</p>
                                                                                <p className="status">{item.status}</p>
                                                                            </div>
                                                                        </div>
                                                                        <p className="description">{item.text}</p>
                                                                    </div>
                                                                    <div className="col-lg-5 col-md-5 img-block">
                                                                        <img src={this.state.images[item.picture]} alt=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                {
                                                    languageManager.review_body.second.slice(0,4).map((item, index) => {
                                                        return (
                                                            <div className="border-block" key={index}>
                                                                <div className="row">
                                                                    <div className="col-lg-7 col-md-7 information">
                                                                        <div className="author">
                                                                            <img src={this.state.images[item.avatar]} alt={item.avatar}/>
                                                                            <div className="author-info">
                                                                                <p className="name">{item.name}</p>
                                                                                <p className="status">{item.status}</p>
                                                                            </div>
                                                                        </div>
                                                                        <p className="description">{item.text}</p>
                                                                    </div>
                                                                    <div className="col-lg-5 col-md-5 img-block">
                                                                        <img src={this.state.images[item.picture]} alt=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                {
                                                    languageManager.review_body.third.slice(0,4).map((item, index) => {
                                                        return (
                                                            <div className="border-block" key={index}>
                                                                <div className="row">
                                                                    <div className="col-lg-12 information">
                                                                        <div className="author">
                                                                            <img src={this.state.images[item.avatar]} alt={item.avatar}/>
                                                                            <div className="author-info">
                                                                                <p className="name">{item.name}</p>
                                                                                <p className="status">{item.status}</p>
                                                                            </div>
                                                                        </div>
                                                                        <p className="description">{item.text}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </div>
                            </div>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        )
    }
}