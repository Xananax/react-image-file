import isString from './isString';
import isBlob from './isBlob';
import isFile from './isFile';

export default function load(prop,cb){
	if(isString(prop)){
		return loadString(prop,cb);
	}
	if(isBlob(prop)){
		return loadBlob(prop,cb);
	}
	if(isFile(prop)){
		return loadFile(prop,cb);
	}
}

export function loadString(src,cb){
	return cb(null,{src});
}

export function loadFile(file,cb){
	const reader = new FileReader();
	reader.onload = function(evt){
		cb(null,{
			src:evt.target.result
		,	alt:escape(file.name)
		})
	}
	reader.onerror = function(evt){
		cb(evt);
	}
	reader.readAsDataURL(file);
}

export function loadBlob(blob,cb){
	try{	
		const src = URL.createObjectURL(blob);
		function done(){
			URL.revokeObjectURL(src);
		}
		cb(null,{src},done);
	}catch(e){
		return cb(e);
	}
}