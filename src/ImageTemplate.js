import React,{Component,PropTypes} from 'react';
import {EMPTY,DONE,ERROR,LOADING} from './constants';


class ImageTemplate extends Component{
	static propTypes = {
		src:PropTypes.string.isRequired
	,	alt:PropTypes.string.isRequired
	,	loadingURL:PropTypes.string
	,	errorURL:PropTypes.string
	,	emptyURL:PropTypes.string
	,	status:PropTypes.oneOf([EMPTY,DONE,ERROR,LOADING])
	,	width:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
	,	height:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
	,	crop:PropTypes.oneOf(['cover','contain'])
	,	type:PropTypes.oneOf(['img','div'])
	}
	static defaultProps = {
		type:'div'
	,	crop:'contain'
	}
	renderDIV(src,alt,width,height,crop){
		const style = {
			width
		,	height
		,	backgroundImage:`url('${src}')`
		,	backgroundSize:crop
		,	backgroundRepeat:'no-repeat'
		,	backgroundPosition:'50% 50%'
		}
		const props = {
			title:alt
		,	style
		}
		return <div {...props}/>
	}
	renderIMG(src,alt,width,height,crop){
		const props = {
			src
		,	alt
		,	width
		,	height
		}
		return <img {...props}/>
	}
	render(){
		const {alt,loadingURL,errorURL,emptyURL,width,height,crop,type} = this.props;
		const status = this.props.status || DONE;
		const src = status === LOADING && loadingURL ? loadingURL :
			status === ERROR && errorURL ? errorURL :
			status === EMPTY && emptyURL ? emptyURL :
			this.props.src;
		return (type==='img') ? this.renderIMG(src,alt,width,height,crop) : this.renderDIV(src,alt,width,height,crop);
	}
}

export default ImageTemplate;