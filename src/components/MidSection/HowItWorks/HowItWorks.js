import React, {Component} from 'react'
import step1 from './images/step1.png'
import step2 from './images/step2.png'
import step3 from './images/step3.png'

export default class HowItWorks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                step1,
                step2,
                step3
            }
        }
    }
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="HowItWorks">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>{languageManager.how_it_works_title}</h2>
                        </div>
                        {
                            languageManager.how_it_works_information.slice(0,3).map((item, index) => {
                                return (
                                    <div className="col-lg-4" key={index}>
                                        <div className="how-it-works">
                                            <img src={this.state.images[item.img]} alt="steps"/>
                                            <p className="steps">{languageManager.step}{index+1}</p>
                                            <div className="how-it-works_title">
                                                <p>{item.title[0]}<br/>{item.title[1]}</p>
                                            </div>
                                            <div className="how-it-works-text">
                                                <p>{item.description}</p>
                                            </div>
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