/**
 * Tests if an object is a javascript native File object
 * @param  {any}  obj an object to test
 * @return {Boolean}     true if the object is an instance of `File`
 */
export default function isFile(obj:any):obj is File{
	return (obj && (obj instanceof File));
}