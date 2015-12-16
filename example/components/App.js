import React,{Component} from 'react';
import {ImageUploadField} from '../../src';

class App extends Component{

	constructor(props,context){
		super(props,context);
	}

	render(){
		const {actions} = this;
		return (<div>
			<ImageUploadField/>
			<ImageUploadField multiple label='mutiple upload'/>
		</div>)
	}
}


export default App