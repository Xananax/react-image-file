import isString from './isString';
import isBlob from './isBlob';
import isFile from './isFile';

export interface LoadCallback{
	(err:Error|DOMError,res?:{src:string,alt:string},done?:()=>void):void
}

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
export default function load(prop:any,cb:LoadCallback):void{
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

export function loadString(src:string,cb:LoadCallback):void{
	cb(null,{src,alt:''});
}

export function loadFile(file:File,cb:LoadCallback):void{
	const reader = new FileReader();
	reader.onload = function(evt:ProgressEvent){
		cb(null,{
			src:reader.result
		,	alt:file.name
		})
	}
	reader.onerror = function(evt:ErrorEvent){
		cb(reader.error);
	}
	reader.readAsDataURL(file);
}

export function loadBlob(blob:Blob,cb:LoadCallback):void{
	try{	
		const src = URL.createObjectURL(blob);
		function done(){
			URL.revokeObjectURL(src);
		}
		cb(null,{src,alt:''},done);
	}catch(e){
		return cb(e);
	}
}