import isReadable from './isReadable';

function readableUrl(props, propName, componentName){
	if(!(propName in props) || !props[propName]){return;}
	const prop = props[propName];
	if(!isReadable(prop)){
		return new Error(`\`${propName}\` is not a valid Blob or File`);
	}
}

function isReadableRequired(props, propName, componentName){
	if(!(propName in props) || !props[propName]){return new Error(`\`${propName}\` is required`);}
	return readableUrl(props,propName,componentName);
}

readableUrl.isRequired = isReadableRequired;

export default readableUrl;