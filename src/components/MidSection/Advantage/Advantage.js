import React, {Component} from 'react'
import bitIcon from './img/bitt.png'
import memberIcon from './img/members.png'

export default class Advantage extends Component {
	render() {
		let languageManager = this.props.languageManager();

		return (
			<div className="Advantage">
				<div className="section-2">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<p className="subtitle">{languageManager.first_information_block[0]}</p>
								<p className="subtitle">{languageManager.first_information_block[1]}</p>
							</div>
							<div className="col-lg-6">
								<div className="border-block">
									<div className="border-block_description">
										<img src={bitIcon} alt="bitcoin"/>
										<div className="border-block_title">{languageManager.border_block_title}</div>
										<div className="border-block_description">{languageManager.border_block_description}</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="border-block">
									<div className="border-block_description">
										<img src={memberIcon} alt="bitcoin"/>
										<div className="border-block_title">{languageManager.border_block_title2}</div>
										<div className="border-block_description">{languageManager.border_block_description2}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}