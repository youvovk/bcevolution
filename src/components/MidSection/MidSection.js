import React, { Component } from 'react'
import Specification from './Specification/Specification'

import arrowBit from './images/arrow-bid.png'
import arrowAsk from './images/arrow-ask.png'
import bitGo from './images/bitgo.png'
import norton from './images/norton.png'
import secureTrading from './images/secure-trading.png'
import mcAffee from './images/mcafee.png'

export default class MidSection extends Component {
    render() {
    let version = this.props.version;

        return (
            <div className="MidSection">
                <div className="section-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 bitcoin-block">
                                <div className="bitcoin bid">
                                    <p>{version.bcbid[0]} <span>${version.bcbid[1]}</span></p>
                                    <img src={arrowBit} alt="arrow" className="bid-arrow"/>
                                </div>
                                <div className="bitcoin ask">
                                    <p>{version.bcask[0]} <span>${version.bcask[1]}</span></p>
                                    <img src={arrowAsk} alt="arrow" className="bid-arrow"/>
                                </div>
                            </div>
                            <div className="col-md-7 security-logos">
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
                                <h2>{version.join_title[0]} <span>{version.join_title[1]}</span></h2>
                                <p>{version.join_description[0]}</p>
                                <p>{version.join_description[1]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Specification version={this.props.version}/>
                {/*<div className="innersection">
                    <div className="content">
                        <div className="title">{version.qna_title}</div>
                        <div className="subtitle">{version.qna_subtitle}</div>
                        <div className="rows">
                            <div className="top">
                                {
                                    version.qna.slice(0,3).map((item, index) => {
                                        return (
                                            <div className="item" key={index}>
                                                <div className="column">
                                                    <div className="qindex">Q{index+1}</div>
                                                    <div className="aindex">A{index+1}</div>
                                                </div>
                                                <div className="column">
                                                    <div className="q"><span>{item.q}</span></div>
                                                    <div className="a">{item.a}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="bottom">
                            {
                                    version.qna.slice(3,6).map((item, index) => {
                                        return (
                                            <div className="item" key={index+3}>
                                                <div className="column">
                                                    <div className="qindex">Q{index+4}</div>
                                                    <div className="aindex">A{index+4}</div>
                                                </div>
                                                <div className="column">
                                                    <div className="q"><span>{item.q}</span></div>
                                                    <div className="a">{item.a}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="innersection">
                    <div className="content">
                        <div className="title">{version.mem_title}</div>
                        <div className="subtitle next">{version.mem_subtitle}</div>
                        <div className="rows">
                            <div className="top">
                                {
                                    version.mems.slice(0,2).map(item => {
                                        return (
                                            <div className="rich" key={item.name}>
                                                <div className="column">
                                                    <img src={item.img} alt={item.name}/>
                                                </div>
                                                <div className="column">
                                                    <div className="name">{item.name}</div>
                                                    <div className="text">{item.text}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="bottom">
                            {
                                    version.mems.slice(2,4).map(item => {
                                        return (
                                            <div className="rich" key={item.name}>
                                                <div className="column">
                                                    <img src={item.img} alt={item.name}/>
                                                </div>
                                                <div className="column">
                                                    <div className="name">{item.name}</div>
                                                    <div className="text">{item.text}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>

        )
    }
}
