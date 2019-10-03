import React, { Component } from 'react'
import Specification from './Specification/Specification'
import Review from './Review/Review'
import HowItWorks from './HowItWorks/HowItWorks'
import Faq from './Faq/Faq'

import arrowBit from './images/arrow-bid.png'
import arrowAsk from './images/arrow-ask.png'
import bitGo from './images/bitgo.png'
import norton from './images/norton.png'
import secureTrading from './images/secure-trading.png'
import mcAffee from './images/mcafee.png'

export default class MidSection extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="MidSection">
                <div className="section-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 bitcoin-block">
                                <div className="bitcoin bid">
                                    <p>{languageManager.bcbid[0]} <span>{languageManager.currency}{languageManager.bcbid[1]}</span></p>
                                    <img src={arrowBit} alt="arrow" className="bid-arrow"/>
                                </div>
                                <div className="bitcoin ask">
                                    <p>{languageManager.bcask[0]} <span>{languageManager.currency}{languageManager.bcask[1]}</span></p>
                                    <img src={arrowAsk} alt="arrow" className="bid-arrow"/>
                                </div>
                            </div>
                            <div className="col-lg-7 security-logos">
                                <img src={bitGo} alt="bitgo"/>
                                <img src={norton} alt="norton"/>
                                <img src={secureTrading} alt="secureTrading"/>
                                <img src={mcAffee} alt="secureTrading"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>{languageManager.join_title[0]} <span>{languageManager.join_title[1]}</span></h2>
                                <p>{languageManager.join_description[0]}</p>
                                <p>{languageManager.join_description[1]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Specification languageManager={this.props.languageManager}/>
                <Review languageManager={this.props.languageManager}/>
                <HowItWorks languageManager={this.props.languageManager}/>
                <Faq languageManager={this.props.languageManager}/>
            </div>

        )
    }
}
