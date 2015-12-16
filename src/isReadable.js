import isFile from './isFile'
import isBlob from './isBlob'
import isString from './isString'

export default function isReadable(prop){
	const valid = (isFile(prop) || isBlob(prop) || isString(prop));
	return valid;
}