import React, {Component} from 'react'


export default class Specification extends Component {
    render() {
        let version = this.props.version;

        return (
            <div className="Specification">
                <div className="container">
                    <div className="row">
                        {
                            version.descriptions.slice(0,3).map((item, index) => {
                                return (
                                    <div className="col-lg-4" key={index}>
                                        <div className="white-block">
                                            <img src={item.img} alt={item.name}/>
                                            <div className="white-block_description">
                                                <p>{item.name}</p>
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
        )
    }
}