import * as React from 'react'
import {PropTypes,Component} from 'react'
import {EMPTY,DONE,ERROR,LOADING} from './constants';
import Image from './Image';
import * as shallowCompare from 'react-addons-shallow-compare'

const buttonStyle={
	position:'relative'
}

const inputStyle = {
	cursor: 'pointer'
,	position:'absolute'
,	top:0
,	bottom:0
,	right:0
,	left:0
,	width:'100%'
,	opacity:0
}

export interface UploadFieldProps{
	onChange:(files:File|File[],value?:any)=>void
	name:string
	multiple:boolean
	files:File|File[]
	uploadFieldTemplate:any
	filesTemplate:()=>void
	accept?:string
	label:string
}

export interface UploadFieldState{
	files?:File|File[]
}

export function fileListToArray(files:FileList):File[]{
	return Array.prototype.slice.call(files)
}

export default class UploadField extends Component<UploadFieldProps,UploadFieldState>{
	static propTypes:React.ValidationMap<UploadFieldProps> = {
		onChange:PropTypes.func
	,	name:PropTypes.string
	,	files:PropTypes.oneOfType([PropTypes.array,PropTypes.object]) 
	,	uploadFieldTemplate:PropTypes.any
	,	accept:PropTypes.string
	,	filesTemplate:PropTypes.func
	,	label:PropTypes.string
	}
	static defaultProps = {
		uploadFieldTemplate:'button'
	,	label:'upload'
	}
	constructor(props:UploadFieldProps,context){
		super(props,context);
		this.handleChange = this.handleChange.bind(this);
		this.state = {files:props.files || props.multiple ? [] : null}
	}
	handleChange(evt){
		const files = fileListToArray(evt.target.files);
		const multiple = this.props.multiple;
		if(this.props.onChange){
			this.props.onChange(multiple ? files : files[0],evt.target.value);
		}else{
			this.setState({files:multiple?files:files[0]});
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	componentWillReceiveProps(nextProps:UploadFieldProps){
		if(nextProps.files){this.setState({files:nextProps.files});}
	}
	renderInput(Comp,name:string,multiple:boolean,label:string,accept:string){
		return (<Comp style={buttonStyle}>
			{label}
			<input type='file' name={name} accept="image/*" onChange={this.handleChange} multiple={multiple} style={inputStyle}/>
		</Comp>	)
	}
	render(){
		const {files} = this.state;
		const {name,multiple,label,accept} = this.props;
		const Comp = this.props.uploadFieldTemplate;
		return this.renderInput(Comp,name,multiple,label,accept);
	}
}