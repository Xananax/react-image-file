/**
 * Returns true if the passed `obj` is a blob type object.
 * An object is considered a valid blob if it has the properties
 * `content_type` and `data`
 * @param  {any}  obj an object to test
 * @return {Boolean}     true if the object is a blob
 */
export default function isBlob(obj){
	return (obj && obj.content_type &&  obj.data)
}