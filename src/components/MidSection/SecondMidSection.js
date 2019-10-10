import React, { Component } from 'react'
import Faq from './Faq/Faq'
import Review from './Review/Review'
import Discover from './Discover/Discover'

export default class SecondMidSection extends Component {
    render() {
        return (
            <div className="MidSection">
                <Review languageManager={this.props.languageManager}/>
                <Faq languageManager={this.props.languageManager}/>
                <Discover languageManager={this.props.languageManager}/>
            </div>

        )
    }
}
