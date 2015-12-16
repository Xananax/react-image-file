import React,{Component,PropTypes} from 'react';
import readableURLPropType from './readableURLPropType';
import load from './load';
import createDOMImage from './createDOMImage';
import {EMPTY,DONE,ERROR,LOADING} from './constants';
import ImageTemplate from './ImageTemplate'

class Image extends Component{
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
			src:''
		,	alt:''
		,	status:EMPTY
		,	width:0
		,	height:0
		}
	}
	load(props){
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
	componentWillReceiveProps(nextProps){
		if(nextProps.file){
			this.load(nextProps.file);
		}
	}
	shouldComponentUpdate(nextProps,nextState){
		return (
			(nextProps.file && nextProps.file!=this.props.file) ||
			(nextProps.alt && nextProps.alt!=this.props.alt) ||
			(nextProps.template && nextProps.template!=this.props.template) ||
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

export default Image
