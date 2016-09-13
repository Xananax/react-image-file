import * as React from 'react'
import {PropTypes,Component} from 'react'
import {EMPTY,DONE,ERROR,LOADING} from './constants';
import Image from './Image';
import UploadField,{UploadFieldProps,UploadFieldState} from './UploadField';
import * as shallowCompare from 'react-addons-shallow-compare'

export interface ImageUploadFieldProps extends UploadFieldProps {
	ImageUploadFieldTemplate?:any
	imageWidth?:number
	imageHeight?:number
}

export default class ImageUploadField extends Component<ImageUploadFieldProps,UploadFieldState>{
	static propTypes:React.ValidationMap<ImageUploadFieldProps> = {
		onChange:PropTypes.func
	,	name:PropTypes.string
	,	value:PropTypes.any
	,	files:PropTypes.array
	,	multiple:PropTypes.bool
	,	ImageUploadFieldTemplate:PropTypes.any
	,	imageWidth:PropTypes.number
	,	imageHeight:PropTypes.number
	}
	static defaultProps = {
		ImageUploadFieldTemplate:'div'
	,	imageWidth:50
	,	imageHeight:50
	,	accept:'.jpg,.png,.jpeg,.bmp,.gif,image/jpg,image/gif,image/png,image/bmp'
	}
	constructor(props:ImageUploadFieldProps,context){
		super(props,context);
		this.handleChange = this.handleChange.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.state = {files:props.files || props.multiple ? [] : null}
	}
	handleChange(files:File|File[]){
		if(this.props.onChange){
			this.props.onChange(files);
		}else{
			this.setState({files:files});
		}
	}
	removeImage(n?:number){
		const multiple = this.props.multiple
		if(!multiple){
			this.handleChange(null);
		}else{
			const files = (this.state.files as File[]).slice()
			files.splice(n,1);
			this.handleChange(files)
		}
	}
	componentWillReceiveProps(nextProps:ImageUploadFieldProps){
		if(nextProps.files){this.setState({files:nextProps.files});}
	}
	renderImages(files:File[]){
		const that = this;
		if(files && files.length){		
			return (<div>
				{files.map(that.renderImage.bind(this))}
			</div>)
		}
	}
	renderImage(file:File,key?:number){
		const {imageHeight,imageWidth} = this.props;
		key = key || 0;
		const name = file? file.name : 'no image'
		const status = file ? EMPTY : DONE
		const props = {
			file:file
		,	width:imageWidth
		,	height:imageHeight
		,	status
		}
		const closeBtn = file ? this.renderCloseButton(key) : null
		return (<div key={key}>{closeBtn}<Image {...props}/><span>{name}</span></div>)
	}
	renderCloseButton(key){
		const that = this;
		return (<button onClick={()=>that.removeImage(key)}>x</button>)
	}
	renderMultiple(Comp,input,images){
		return (<Comp>
			{input}
			{images}
		</Comp>)
	}
	renderUnique(Comp,input,image){
		return (<Comp>
			{image}
			{input}
		</Comp>)
	}
	renderInput(name:string,multiple:boolean,files:File|File[],accept:string){
		return <UploadField name={name} label={this.props.label} multiple={multiple} files={files} onChange={this.handleChange} accept={accept}/>
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	render(){
		const {files} = this.state;
		const {name,multiple,accept} = this.props;
		const Comp = this.props.ImageUploadFieldTemplate;
		const input = this.renderInput(name,multiple,files,accept);
		const images = multiple ? this.renderImages(files as File[]) : this.renderImage(files as File);
		return multiple ? this.renderMultiple(Comp,input,images) : this.renderUnique(Comp,input,images);
	}
}