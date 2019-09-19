import React, {Component} from 'react'

export default class HowItWorks extends Component {
    render() {
        let version = this.props.version;

        return (
            <div className="HowItWorks">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>{version.how_it_works_title}</h2>
                        </div>
                        {
                            version.how_it_works_information.slice(0,3).map((item, index) => {
                                return (
                                    <div className="col-lg-4" key={index}>
                                        <div className="how-it-works">
                                            <img src={item.img}/>
                                            <p className="steps">step{index+1}</p>
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