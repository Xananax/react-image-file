/**
 * Tests if an object is a javascript native File object
 * @param  obj an object to test
 * @return     true if the object is an instance of `File`
 */
export const isFile = 
  ( obj:any ): obj is File => 
  ( obj && ( obj instanceof File ) )

  export default isFile