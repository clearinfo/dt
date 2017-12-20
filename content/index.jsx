import React, {
	Component
} from 'react';
import {
	PubCom
} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';


import ZmitiClockApp from '../components/clock/index.jsx';
import ZmitiToastApp from '../components/toast/index.jsx';
import ZmitiKeyboardApp from '../components/keyboard/index.jsx';

class ZmitiContentApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toast: '',
			username: '',
			tel: '',
			currentQid: 0,
			score: 0,
			rightAnswerCount: 0,
			currentAnswer: [],
			clock: 0,
			result: '',
			iNow: -1
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;

		window.s = this;

		this.zmitiMap = [

			{
				"name": "北京市",
				"log": "116.46",
				"lat": "39.92"
			}, {
				"name": "上海市",
				"log": "121.48",
				"lat": "31.22"
			}, {
				"name": "天津市",
				"log": "117.2",
				"lat": "39.13"
			}, {
				"name": "重庆市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "石家庄",
				"log": "114.48",
				"lat": "38.03"
			}, {
				"name": "太原市",
				"log": "112.53",
				"lat": "37.87"
			}, {
				"name": "沈阳市",
				"log": "123.38",
				"lat": "41.8"
			}, {
				"name": "长春市",
				"log": "125.35",
				"lat": "43.88"
			}, {
				"name": "哈尔滨市",
				"log": "126.63",
				"lat": "45.75"
			}, {
				"name": "杭州市",
				"log": "120.19",
				"lat": "30.26"
			}, {
				"name": "福州市",
				"log": "119.3",
				"lat": "26.08"
			}, {
				"name": "济南市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "郑州市",
				"log": "113.65",
				"lat": "34.76"
			}, {
				"name": "武汉市",
				"log": "114.31",
				"lat": "30.52"
			}, {
				"name": "长沙市",
				"log": "113",
				"lat": "28.21"
			}, {
				"name": "广州市",
				"log": "113.23",
				"lat": "23.16"
			}, {
				"name": "海口市",
				"log": "110.35",
				"lat": "20.02"
			}, {
				"name": "成都市",
				"log": "104.06",
				"lat": "30.67"
			}, {
				"name": "贵阳市",
				"log": "106.71",
				"lat": "26.57"
			}, {
				"name": "昆明市",
				"log": "102.73",
				"lat": "25.04"
			}, {
				"name": "南昌市",
				"log": "115.89",
				"lat": "28.68"
			}, {
				"name": "西安市",
				"log": "108.95",
				"lat": "34.27"
			}, {
				"name": "西宁市",
				"log": "101.74",
				"lat": "36.56"
			}, {
				"name": "兰州市",
				"log": "103.73",
				"lat": "36.03"
			}, {
				"name": "南宁市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "乌鲁木齐市",
				"log": "87.68",
				"lat": "43.77"
			}, {
				"name": "呼和浩特市",
				"log": "111.65",
				"lat": "40.82"
			}, {
				"name": "拉萨市",
				"log": "91.11",
				"lat": "29.97"
			}, {
				"name": "银川市",
				"log": "106.27",
				"lat": "38.47"
			}, {
				"name": "台北市",
				"log": "121.5",
				"lat": "25.14"
			}, {
				"name": "香港",
				"log": "114.17",
				"lat": "22.27"
			}, {
				"name": "澳门",
				"log": "113.33",
				"lat": "22.13"
			}, {
				"name": "合肥市",
				"log": "117.27",
				"lat": "31.86"
			}, {
				"name": "南京市",
				"log": "118.78",
				"lat": "32.04"
			}
		]
	}

	render() {

		var component = null;
		switch (this.props.theme) {
			case "PAPER":
				break;
			case "DANGJIAN":
				var mainStyle = {
					background: "#fff url(./assets/images/bg1.jpg) no-repeat center center",
					backgroundSize: 'cover '
				}
				component = <div className='zmiti-dangjian-content-C lt-full' style={mainStyle} onTouchStart={this.contentTap.bind(this)}>
			{this.props.needInfo && <section className={'zmiti-dangjian-content-user lt-full '+(this.state.hideUser?'hide':'')} >
			<div className='zmiti-dangjian-content-cover'>
			<section className='zmiti-dangjian-content-form'>
			<div className='zmiti-dangjian-content-input'><label>姓名：</label><input ref='input' value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder='请输入姓名' type='text'/></div>
			<div className='zmiti-dangjian-content-input'><label>手机号：</label><div className='zmiti-dangjian-tel-input' value={this.state.tel} style={{paddingLeft: 110}}  onTouchStart={()=>{this.refs['input'].blur();this.setState({showKeyboard:true})}}>{this.state.tel||'请输入手机号'}</div></div>
			<div className='zmiti-dangjian-clock'><ZmitiClockApp></ZmitiClockApp></div>
			<div className='zmiti-dangjian-all-duration'>请在{(this.props.duration/60|0)+'分钟'+(this.props.duration%60>0 ? (this.props.duration%60|0)+'秒':'')}内完成测试</div>

			</section>
			</div>
			<div onTouchTap={this.beginAnswer.bind(this)} className={'zmiti-btn zmiti-begin-answer-btn '+(this.state.username.length>0 && this.state.tel.length>0?'active':'') +  (this.state.beginTap?' tap':'')  }>
			开始答题
			</div>
			</section>}

			<section className={'zmiti-dangjian-question-C  lt-full' +(this.state.showQList?' active':'')+(this.state.hideList?' hide':'')} style={mainStyle}>
			<header style={{background:'url(./assets/images/header-bg.jpg) no-repeat',backgroundSize:'cover'}}>
			<img src='./assets/images/clock.png' />
			<span>{this.state.clock/60<10?'0'+(this.state.clock/60|0):this.state.clock/60|0}:{this.state.clock % 60<10?'0'+this.state.clock % 60:this.state.clock % 60} s</span>
			</header>
			<svg  width="100%" height="23px" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
			<path strokeDasharray="10,6" d="M0 2 L640 2" stroke='#ccc' strokeWidth={3} >
			</path>
			</svg>
			{this.props.question.map((question,q)=>{
				var className = '';
				if(this.state.currentQid > q ){
					className = 'left';
				}else if(this.state.currentQid === q){
					className = 'active';
				}else{
					className = 'right';
				}
				var scrollStyle ={
					height:this.viewH - 78,
					background:this.props.indexBg? '#fff url('+this.props.indexBg+') no-repeat center / cover' : "#fff url(./assets/images/bg1.jpg) no-repeat center center / cover "
				}

				return	<section className={'zmiti-dangjian-q-scroll '+ className} ref={'zmiti-dangjian-q-scroll'+q} key={q} style={scrollStyle}>
				<audio src='./assets/music/error.mp3' ref='error'></audio>
				<audio src='./assets/music/right1.mp3' ref='right'></audio>
				<section style={{paddingBottom:60}}>
				<div className='zmiti-dangjian-q-title'>
				{question.isMultiselect && <span hidden> * 此题为多选题 </span>}
				<article>
				{question.img && <img src={question.img}/>}	
				<div>{question.title}</div>
				</article>
				<div className='zmiti-dangjian-pager'>
				<img src='./assets/images/q-title.png' className='zmiti-q-title'/>
				<span>{this.state.currentQid+1}</span>
				<span>{this.props.question.length}</span>
				</div>
				<img src='./assets/images/q-title1.png' className='zmiti-q-title1'/>
				</div>
				<div className='zmiti-dangjian-q-answer-list'>
				{question.answer.map((item,i)=>{
					return <div 
					onTouchTap={this.chooseMyAnswer.bind(this,i)} key={i} 
					className={'zmiti-dangjian-q-item ' + (this.state.iNow ===i ? this.state.result :'')} ref={'answer-'+i}>
					{this.props.arr[i]+"、"+item.content}
					{this.state.iNow ===i && <img src={'./assets/images/'+(this.state.result === 'active'?'right':'error')+'.png'}/>}
					</div>
				})}

				{this.props.myAnswer.length>=this.props.question.length-1 && <div onTouchTap={this.submitPaper.bind(this)} className={'zmiti-dangjian-submit-btn ' + (this.state.submit?'active':'')}>提交答卷</div>}
				{this.props.myAnswer.length<this.props.question.length-1 && this.props.questionType!=='single' && <div onTouchTap={this.doNext.bind(this)} className={'zmiti-dangjian-submit-btn ' + (this.state.submit?'active':'')}>下一题</div>}
				</div>
				</section>	
				</section>
			})}
			</section>

			<section  ref='result' className={'zmiti-dangjian-result-page lt-full ' + (this.state.showScore?'active':'') }style={mainStyle}>
			<div>
			<div className='zmiti-dangjian-score-C'>
			<div className='zmiti-dangjian-score'>
			{this.state.score}
			<svg width="100%" height="200px" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
			<circle cx={110} cy='110' r='90' fill='none' strokeDasharray="14,6" stroke='#000'></circle>
			</svg>
			</div>
			<div>您答对了{this.state.rightAnswerCount}道题</div>
			{this.state.rightAnswerCount>0 && <div style={{fontWeight:'bold'}}>达到“{this.state.level}”水平</div>}
			{this.state.rightAnswerCount<=0 && <div style={{fontWeight:'bold'}}>尚需努力！</div>}

			</div>


			<div onTouchTap={this.watchAnswer.bind(this)} className='zmiti-dangjian-result-btn zmiti-dangjian-result-btn1'>
			<span><img src='./assets/images/watch.png'/></span>
			<span>查看答案</span>
			</div>
			<div className='zmiti-share-btns'>
			<div onTouchTap={this.doAgin.bind(this)} className='zmiti-dangjian-result-btn'>
			<span><img src='./assets/images/refresh.png'/></span>
			<span>再做一次</span>
			</div>

			<div style={{width:20}}></div>

			<div onTouchTap={this.showMask.bind(this)} className='zmiti-dangjian-result-btn'>
			<span><img src='./assets/images/share-ico.png'/></span>
			<span>分享好友</span>
			</div>	
			</div>

			<div className='zmiti-team'>总策划：刘思扬</div>
			<div className='zmiti-team1'></div>
			<div className='zmiti-team'>出品：陈凯星、冯瑛冰</div>
			<div className='zmiti-team'>监制：齐慧杰 孙爱东</div>
			<div className='zmiti-team'>统筹：黄庆华 曹晓轩</div>
			<div className='zmiti-team'>试题编辑：王谦 班和平 苏蕾 常琳 郑雪婧 孟洁 李瑜 程昊</div>
			<div className='zmiti-team1'></div>
			<div className='zmiti-team'>文案：李昂 邬金夫 刘雅萱</div>
			<div className='zmiti-team1'></div>
			<div className='zmiti-team'>视觉：潘红宇</div>
			<div className='zmiti-team'>制作：马发展 麟腾传媒</div>

			<div className='zmiti-copyright'>新华社客户端<span style={{opacity:0}}>新</span>半月谈杂志社联合出品</div>
			</div>
			</section>
			</div>;
				break;
		}

		var maskStyle = {
			background: 'url(./assets/images/arron1.png) no-repeat center center / cover'
		}

		return (
			<div className={'zmiti-content-main-ui  '+(this.state.showContent ? 'show':'') +(this.state.hideContent?' hide':'')}>
			{component}
			{this.state.showMask&& <div onTouchStart={()=>{this.setState({showMask:false})}} className='zmiti-mask lt-full' style={maskStyle}></div>}
			<ZmitiKeyboardApp show={this.state.showKeyboard} obserable={this.props.obserable}></ZmitiKeyboardApp>
			<div className='zmiti-dangjian-toast'>
			{this.state.toast && <ZmitiToastApp toast={this.state.toast}></ZmitiToastApp>}
			</div>
			</div>
		);
	}

	contentTap(e) {
		if (!e.target.classList.contains('zmiti-dangjian-tel-input')) {
			this.setState({
				showKeyboard: false
			})
		}
	}


	showMask() {
		this.setState({
			showMask: true
		})
	}

	watchAnswer() {

		let {
			obserable
		} = this.props;
		obserable.trigger({
			type: 'toggleResult',
			data: true
		});

		this.setState({
			hideContent: true
		});

	}

	doAgin() {
		this.setState({
			hideList: false,
			currentQid: 0,
			showScore: false,
			clock: 0,
			iNow: -1,
			result: '',
			currentAnswer: []
		}, () => {
			//this.scroll.refresh();
		});
		let {
			obserable
		} = this.props;
		obserable.trigger({
			type: 'clearMyAnswer'
		});

		this.timer = setInterval(() => {
			this.setState({
				clock: this.state.clock + 1
			})
		}, 1000)
	}


	submitPaper() { //提交答卷
		this.setState({
			submit: true
		});
		var s = this;
		var score = 0;

		clearInterval(this.timer)
		let {
			obserable
		} = this.props;
		obserable.trigger({
			type: 'fillAnswer',
			data: this.state.currentAnswer.concat([])
		});

		this.props.myAnswer.map((item, i) => {
			this.props.question[i].rightAnswer = [];

			this.props.question[i].answer.map((a, k) => {
				if (a.isRight) {
					this.props.question[i].rightAnswer.push(k);
				} else {
					this.props.question[i].rightAnswer.push(undefined);
				}
			})

		});
		var rightAnswerCount = 0;
		this.props.question.map((item, i) => {
			if (this.props.questionType !== 'single') {
				var isRight = 0;
				this.props.question[i].rightAnswer.map((right, k) => {
					if (this.props.myAnswer[i][k] === right) {
						isRight++
					}
				})
				if (isRight >= this.props.question[i].rightAnswer.length) {
					score += this.props.question[i].score;
				}



			} else {


				this.props.question[i].rightAnswer.map((right, k) => {
					if (right === this.props.myAnswer[i][0] && this.props.myAnswer[i][0] !== undefined) {
						score += this.props.question[i].score;
						rightAnswerCount++;
					}

				})


			}
		});
		this.setState({
			rightAnswerCount
		})
		score >= 100 && (score = 100);

		var level = '';
		this.props.level.map((item, i) => {
			if (score <= item.score) {
				level = item.name;
			}
		});

		this.setState({
			level
		})

		if (!this.props.showLevel) {
			level = score + '分';
		}

		obserable.trigger({
			type: "modifyShareInfo",
			data: {
				title: s.props.shareTitle.replace(/{username}/, s.state.username || s.props.nickname).replace(/{score}/ig, score).replace(/{level}/ig, level),
				desc: s.props.shareDesc.replace(/{username}/, s.state.username || s.props.nickname).replace(/{score}/ig, score).replace(/{level}/ig, level)
			}
		});

		//'您答对了'+this.state.rightAnswerCount+'道题，击败了'+(Math.random()*90|0 + 10)+'%的网友，获得"'+ this.state.level +'"称号',
		setTimeout(() => {
			var scale = (Math.random() * 90 | 0) + 10;
			var s = this;
			if (s.state.rightAnswerCount === 20) {
				scale = 99;
			} else if (s.state.rightAnswerCount > 15) {
				scale = (Math.random() * 20 | 0) + 70;
			} else if (s.state.rightAnswer > 11) {
				scale = (Math.random() * 20 | 0) + 50;
			} else if (s.state.rightAnswerCount > 5) {
				scale = (Math.random() * 20 | 0) + 30;
			} else {
				scale = (Math.random() * 20 | 0) + 4;

			}

			var title = window.share.title.replace(/{rightAnswerCount}/, s.state.rightAnswerCount).replace(/{scale}/, scale).replace(/{level}/, s.state.level);
			if (s.state.rightAnswerCount === 0) {
				title = '学习十九大报告，尚需努力！';
			}

			var protocol = window.config.protocol || 'http';
			$.ajax({
				type: 'post',
				url: protocol + '://api.zmiti.com/v2/h5/save_userusetime/',
				data: {
					workid: this.props.worksid,
					usetime: this.state.clock,
					score: this.state.rightAnswerCount
				},
				error() {
					s.props.wxConfig(
						title,
						window.share.desc,
						s.props.shareImg,
						s.props.appId,
						s.props.worksid
					)
				},
				success(data) {
					if (data.getret === 0) {
						scale = data.percent;
						var title = window.share.title.replace(/{rightAnswerCount}/, s.state.rightAnswerCount).replace(/{scale}/, scale).replace(/{level}/, s.state.level);
						if (s.state.rightAnswerCount === 0) {
							title = '学习十九大报告，尚需努力！';
						}
						s.props.wxConfig(
							title,
							window.share.desc,
							s.props.shareImg,
							s.props.appId,
							s.props.worksid
						)
					}
				}
			});
		}, 10)

		obserable.trigger({
			type: 'clearCountdown'
		})



		setTimeout(() => {
			this.setState({
				submit: false,
				hideList: true,
				score,
				showScore: true
			});
		}, 200);

		var s = this;

		var idx = Math.random() * this.zmitiMap.length | 0;


		return;


	}


	doNext() { //下一题目；

		if (!this.state.currentAnswer || this.state.currentAnswer.length <= 0) {
			this.state.currentAnswer = [
				[undefined]
			];
		}
		let {
			obserable
		} = this.props;


		obserable.trigger({
			type: 'fillAnswer',
			data: this.state.currentAnswer.concat([])
		});
		this.setState({
			currentQid: this.state.currentQid + 1,
			iNow: -1,
			result: '',
			currentAnswer: []
		}, () => {
			this['scroll' + this.state.currentQid].refresh();
			//this.scroll.refresh();
		})
	}


	chooseMyAnswer(i) {
		window.c = this;
		if (!this.props.myAnswer[this.state.currentQid] && this.props.myAnswer[this.state.currentQid] !== 0) {

			this.props.question[this.state.currentQid].answer.map((itne, i) => {
				this.state.currentAnswer.push(undefined);
			});

			this.state.currentAnswer.length = this.props.question[this.state.currentQid].answer.length;

			if (this.props.questionType === 'single') { //单选题目

				this.state.currentAnswer[0] = i;


				//判断用户是否回答正确
				var audio = this.refs[this.props.question[this.state.currentQid].answer[i].isRight ? 'right' : 'error'];
				audio.currentTime = 0;
				audio.play()
				this.state.result = this.props.question[this.state.currentQid].answer[i].isRight ? 'active' : 'error'
				this.state.iNow = i;
				this.forceUpdate();

				if (this.props.question[this.state.currentQid + 1]) {
					setTimeout(() => {
						this.doNext();
					}, 500)
				}

			} else { //多选题or混合题目。
				var has = false;
				this.state.currentAnswer.forEach((item, k) => {
					if (item === i) {
						has = true;
						return;
					}
				});
				if (has) {
					this.state.currentAnswer.splice(i, 1, undefined);
				} else {
					this.state.currentAnswer[i] = i;
				}
				this.forceUpdate();


			}



		}
	}

	showToast(msg) {
		this.setState({
			toast: msg
		});

		setTimeout(() => {
			this.setState({
				toast: ''
			});
		}, 2000)
	}

	beginAnswer(time = 200) { //

		if (this.props.needInfo && (this.state.username.length <= 0 || this.state.tel.length <= 0)) {
			if (this.state.username.length <= 0) {
				this.showToast('姓名不能为空')
			}
			if (this.state.tel.length <= 0) {
				this.showToast('手机号不能为空')
			}
			return;
		}

		if (this.props.needInfo && !(/^1[34578]\d{9}$/.test(this.state.tel))) {
			this.showToast('请填写正确的手机号');
			return false;
		}


		let {
			obserable
		} = this.props;
		this.setState({
			beginTap: true
		});
		this.timer && clearInterval(this.timer);
		this.timer = setInterval(() => {
			this.setState({
				clock: this.state.clock + 1
			})
		}, 1000)

		setTimeout(() => {
			this.setState({
				beginTap: false,
				hideUser: true

			});

			obserable.trigger({
				type: 'toggleQList',
				data: true
			});

			obserable.trigger({
				type: 'setQuestionScroll'
			})

		}, time);
	}


	componentDidMount() {



		let {
			IScroll,
			obserable
		} = this.props;

		obserable.on('submitPaper', () => {
			this.submitPaper();
		});

		obserable.on('beginAnswer', (data) => {
			this.beginAnswer(data);
		})
		obserable.on('setQuestionScroll', () => {

			this.props.question.map((item, i) => {
				if (this.refs['zmiti-dangjian-q-scroll' + i]) {
					this['scroll' + i] = new IScroll(this.refs['zmiti-dangjian-q-scroll' + i], {
						scrollbars: true
					})

				}
			});
			setTimeout(() => {
				this.props.question.map((item, i) => {
					this['scroll' + i].refresh();
				});
			}, 1000)


		});

		obserable.on('countdown', function() {
			this.timer = setInterval(() => {
				this.setState({
					clock: this.state.clock + 1
				})
			}, 1000)
		}.bind(this))

		obserable.on('modifyTel', (data) => {
			if (typeof data === 'string') {
				if (data === 'del') {
					this.state.tel = this.state.tel.substring(0, this.state.tel.length - 1);
				} else if (data === 'back') {
					this.state.showKeyboard = false;
				}
			} else {
				this.state.tel += data;
			}


			this.forceUpdate()
		});

		obserable.on('backToShare', () => {
			obserable.trigger({
				type: 'toggleResult',
				data: false
			});

			this.setState({
				hideContent: false
			})
		});

		obserable.on('toggleContent', (data) => {
			this.setState({
				showContent: data
			});
		});
		obserable.on('toggleQList', (data) => {
			this.setState({
				showQList: data
			});
		});


		setTimeout(() => {
			this.resultScroll = new IScroll(this.refs['result'], {
				//scrollbars: true
			})
		}, 1000)

	}
}
export default PubCom(ZmitiContentApp);