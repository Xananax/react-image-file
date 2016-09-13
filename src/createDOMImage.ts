import isImageComplete from './isImageComplete'

/**
 * Creates an image object and set its onload and onerror properties.
 * If the image was already cached, onload is set immediatly.
 * @param  {string} src     the source of the image, You may leave it blank if you want to set it later
 * @param  {function} onLoad  callback to call when the image loads (or has loaded). Receives the image object as a parameter. Required
 * @param  {function} onError callback to call when the image has an error. Receives the image object as a parameter. Optional, but note that `onload` will never be called if an error occurs
 * @return {DOM node}         the image object
 */
export default function createDOMImage(src:string,onLoad?:(img:HTMLImageElement)=>void,onError?:(img:HTMLImageElement,err:Error)=>void):HTMLImageElement{

	var img = new Image()
	img.alt = '';

	var called = false
	
	function callback(){
		if(!called){
			called = true;
			img.onload = null;
			img.onerror = null;
			return true;
		}
		return false
	}

	function onLoadWrapped(){
		callback() && onLoad && onLoad(img)
	}
	function onErrorWrapped(err){
		callback() && onError && onError(img,err)
	}
	img.onload = onLoadWrapped
	img.onerror = onErrorWrapped
	src && (img.src = src);

	if(isImageComplete(img)){
		onLoadWrapped();
	}

	return img

}
