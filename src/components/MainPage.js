import React, { Component } from 'react'
import TopSection from './TopSection/TopSection'
import MidSection from './MidSection/MidSection'
import BottomSection from './BottomSection/BottomSection'

export default class MainPage extends Component {

    render() {

        return (
            <div className='MainPage'>
                <TopSection
                    countryCode={this.props.countryCode}
                    handleStep={this.props.handleStep}
                    handleSubmit={this.props.handleSubmit}
                    pageHandler={this.props.pageHandler}
                    handleForward={this.props.handleForward}
                    languageManager={this.props.languageManager}
                    validateParams={this.props.validateParams}
                    location={this.props.location}/>

                <MidSection languageManager={this.props.languageManager}/>

                <BottomSection
                    languageManager={this.props.languageManager}
                    pageHandler={this.props.pageHandler}
                    handleForward={this.props.handleForward}/>
            </div>
        )
    }

}