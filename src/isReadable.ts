import {isFile} from './isFile'
import {isBlob} from './isBlob'
import {isString} from './isString'

export type Readable = File | Blob | string

/**
 * Returns true if the object can be used to set an image's display.
 * The function returns true if the passed object is one of:
 * 
 * - An instance of the native `File` object
 * - A blob (contains the properties `content_type` and `data`)
 * - A non-empty string
 * 
 * @param  prop an object to test
 * @return      true if the object is a File, a Blob, or a String
 */
export const isReadable = 
  ( prop: any ): prop is Readable => 
  (  prop 
  && ( isFile( prop ) || isBlob( prop ) || isString( prop ) )
  )

export default isReadable