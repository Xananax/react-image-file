/**
 * Returns true if the passed `obj` is a blob type object.
 * An object is considered a valid blob if it has the properties
 * `content_type` and `data`
 * @param  obj an object to test
 * @return     true if the object is a blob
 */
export const isBlob = 
  ( obj: any ): obj is Blob => 
  ( obj && obj.content_type &&  obj.data )

  export default isBlob