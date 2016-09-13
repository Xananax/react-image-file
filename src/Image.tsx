import * as React from 'react';
import {Component,PropTypes} from 'react';
import readableURLPropType from './readableURLPropType';
import load from './load';
import createDOMImage from './createDOMImage';
import {EMPTY,DONE,ERROR,LOADING} from './constants';
import ImageTemplate from './ImageTemplate'
import transparentGIF from './transparentGIF';

export type ImageLoaderProps = {
	template?:any
	file?:string
	alt?:string
}

export type ImageLoaderState = {
	src?:string
	alt?:string
	status?:string
	width?:number
	height?:number
	error?:Error|DOMError
}

export function isDefined(obj){
	return typeof obj !== 'undefined' 
}

export default class ImageLoader extends Component<ImageLoaderProps,ImageLoaderState>{
	static propTypes = {
		template:PropTypes.any
	,	file:PropTypes.oneOfType([PropTypes.string, readableURLPropType])
	,	alt:PropTypes.string
	}
	static defaultProps = {
		template:ImageTemplate
	}
	constructor(props,context){
		super(props,context);
		this.state = {
			src:transparentGIF
		,	alt:''
		,	status:EMPTY
		,	width:0
		,	height:0
		}
	}
	load(props:ImageLoaderProps){
		const that = this;
		that.setState({status:LOADING});
		load(props,function(err,res,done){
			if(err){
				return that.setState({status:ERROR,error:err})
			}
			createDOMImage(res.src,function(img){
				that.setState({
					status:DONE
				,	src:res.src
				,	alt:res.alt
				,	width:img.width
				,	height:img.height
				})
				if(done){done();}
			})
		})
	}
	componentDidMount(){
		if(this.props.file){this.load(this.props.file);}
	}
	componentWillReceiveProps(nextProps:ImageLoaderProps){
		if(nextProps.file){
			this.load(nextProps.file);
		}else if(nextProps.file == null){
			this.setState({src:transparentGIF})
		}
	}
	shouldComponentUpdate(nextProps:ImageLoaderProps,nextState:ImageLoaderState):Boolean{
		return (
			(isDefined(nextProps.file) && nextProps.file!=this.props.file) ||
			(isDefined(nextProps.alt) && nextProps.alt!=this.props.alt) ||
			(isDefined(nextProps.template) && nextProps.template!=this.props.template) ||
			(nextState.src != this.state.src)
		)
	}
	render(){

		const src = this.state.src
		const alt = this.props.alt || this.state.alt || '';
		const imgWidth = this.state.width;
		const imgHeight = this.state.height;
		const Comp = this.props.template;
		const props = Object.assign({},this.props,{
			src
		,	alt
		,	imgWidth
		,	imgHeight
		});

		return React.createElement(Comp,props);
	}
}