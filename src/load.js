import isString from './isString';
import isBlob from './isBlob';
import isFile from './isFile';

/**
 * Loads a Blob, or a File in a way that makes it suitable to be used in a node image
 * Does nothing to strings, but accepts them in order to make it easy to use this function everywhere
 * 
 * @param  {File|Blob|String}   prop the src to load
 * @param  {(err,res,done)=>void} cb   A callback to use when done. The Callback receives:
 *  - err: An error object if there was an error, `null` otherwise
 *  - res: the resource object. It will have a `src` property, and possibly an `alt` property
 *  - done: an optional function used to free the resource; you need to call that after assigning the resource to an image
 * @return {void}
 */
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