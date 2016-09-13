// @flow
/**
 * Checks if an image has loaded
 * @param  {DOM Node}  img a dom image, created through `document.createElement("img")`, `new Image()`, or `document.getElement`
 * @return {Boolean}     true if the image has loaded, false otherwise
 */
export default function isImageComplete(img):Boolean{
	return (img && (img.complete || img.naturalWidth !== undefined));
};