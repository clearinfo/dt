import React, {
	Component
} from 'react';
import {
	PubCom
} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import '../assets/js/touch';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			beginTest: false,
			className: ''
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var conponent = null;
		switch (this.props.theme) {
			case "PAPER":
				conponent = <div>
						<section className='zmiti-main-title'>{this.state.title}</section>
						<div className={'zmiti-main-btn ' + (this.state.tap?'active':'')} onTouchTap={this.beginTest.bind(this)}>开始考试</div>
						<div className={'zmiti-main-form '+(this.state.showForm?'active':'')}>
							<div className='zmiti-form-title'>{window.formTitle||'请输入你的姓名和电话'}</div>
							<div className='zmiti-form-input'>
								<label>姓名 ：</label><input value={this.state.name} onChange={e=>{this.setState({name:e.target.value})}} type='text'/>
							</div>
							<div className='zmiti-form-input'>
								<label>电话 ：</label><input  onChange={e=>{this.setState({tel:e.target.value})}} type='text'/>
							</div>
							<div onTouchTap={this.submit.bind(this)} className={'zmiti-main-submit '+(this.state.submit?'active':'')}>提交</div>
						</div>
					</div>
				break;

		}

		if (this.props.indexPage) {

			var indexStyle = {
				background: 'url(' + this.props.indexPage + ') no-repeat  center / cover'
			}
			conponent = <div ref='zmiti-index-page'  className='lt-full' style={indexStyle}>
					<div className='zmiti-index-note'>
						<img className={'zmiti-index1 '+this.state.className} src='./assets/images/index1.png'/>
						<img className={'zmiti-circle '+this.state.className} src='./assets/images/circle2.png'/>
						<img className={'zmiti-title1 '+this.state.className} src='./assets/images/1.png'/>
						<img className={'zmiti-title2 '+this.state.className} src='./assets/images/2.png'/>
					</div>
					<div onTouchTap={this.beginTest.bind(this)} className={'zmiti-begin-test '+ this.state.className}>
						<img src='./assets/images/begin-test.png'/>
					</div>
				</div>
		}


		return (
			<div className={'zmiti-index-main-ui '+(this.state.hideIndex?'hide':'')}>
				{conponent}
			</div>
		);
	}


	animate() {
		this.setState({
			className: 'active'
		})
	}

	beginTest(time = 500) {

		let {
			obserable
		} = this.props;
		this.setState({
			btnClick: true
		});

		setTimeout(() => {
			this.setState({
				beginTest: true,
				btnClick: false,
			});
			setTimeout(() => {
				this.setState({
					hideIndex: true
				});
				obserable.trigger({
					type: 'toggleContent',
					data: true
				});

				if (!this.props.needInfo) { //不需要收集姓名和电话信息
					obserable.trigger({
						type: 'beginAnswer',
						data: 0
					});
				}
			}, time)
		}, 200)
	}


	componentDidMount() {
		if (this.refs['zmiti-index-page']) {
			$(this.refs['zmiti-index-page']).swipe('up', () => {
				this.beginTest(0);
			}).swipe('left', () => {
				this.beginTest(0);
			});
		}

		setTimeout(() => {
			this.animate();
		}, 100)


	}
}
export default PubCom(ZmitiIndexApp);