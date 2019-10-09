import React, { Component } from 'react'
import Discover from './Discover/Discover'
import Review from './Review/Review'
import EarnBlock from './EarnBlock/EarnBlock'
import MoreNews from './MoreNews/MoreNews'
import Advantage from './Advantage/Advantage'

export default class MidSection extends Component {
    render() {
        return (
            <div className="MidSection">
                <Advantage languageManager={this.props.languageManager}/>
                <Discover languageManager={this.props.languageManager}/>
                <EarnBlock languageManager={this.props.languageManager}/>
                <MoreNews languageManager={this.props.languageManager}/>
                <Review languageManager={this.props.languageManager}/>
            </div>

        )
    }
}
