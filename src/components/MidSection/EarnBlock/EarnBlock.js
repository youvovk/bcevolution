import React, {Component} from 'react'

export default class EarnBlock extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="EarnBlock">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 offset-lg-5 earn-text">
                            <h2>{languageManager.earn_title}</h2>
                            <p>{languageManager.earn_description[0]} <span>{languageManager.earn_description[1]}</span>{languageManager.earn_description[2]} <span>{languageManager.earn_description[3]}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}