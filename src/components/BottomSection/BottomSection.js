import React, { Component } from 'react'

export default class BottomSection extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className='BottomSection'>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="links">
                                    <a href="#">Home</a>
                                    <a onClick={() => this.props.pageHandler('agreement')}>Website Agreement</a>
                                    <a onClick={() => this.props.pageHandler('risc')}>Risk Disclaimer</a>
                                    <a onClick={() => this.props.pageHandler('privacy')}>Privacy Policy</a>
                                </div>
                                <div className="footer-description">
                                    <p>{languageManager.risk[0]}</p>
                                    <p>{languageManager.risk[1]}</p>
                                    <p>{languageManager.risk[2]}</p>
                                    <p>{languageManager.risk[3]}</p>
                                    <p>{languageManager.risk[4]}</p>
                                </div>
                                <div className="content">
                                    <div className="copyright"><p>© 2018 All Rights Reserved - Bitcoin LoopHole</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
