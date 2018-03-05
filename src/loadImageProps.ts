import {loadAnything, ImageContent} from './load'
import {createHTMLImageElement} from './createHTMLImageElement'

export interface ImageProps
  { src:string
  ; alt:string
  ; width:number
  ; height:number
  }

export interface CreateImageFromReadableCallback
  { (err?:Error|DOMError|null,props?:ImageProps):any
  }

/**
 * Loads an image buffer from a File, a Blob, or a string
 * Then creates an object with { src, alt, width, height }
 * and calls the passed callback with that object.
 * 
 * It accomplishes this by creating an HTML image element,
 * waiting for it to load, then calling the callback,
 * then discarding the image element
 * @param props anything that can become a readable image
 * @param cb a function of shape (err:Error, props:imageProps), where `imageProps` is the object described above
 * 
 */
export const loadImageProps = 
  ( props: File | Blob | string
  , cb:CreateImageFromReadableCallback
  ) =>
  ( loadAnything
    ( props
    , ( err: Error | DOMError | null
      , res?: ImageContent
      , done?: () => any
      ) => 
      { if( err )
        { cb( err )
        }
        else if( res )
        { createHTMLImageElement( res.src, ( img ) => 
          { const ret = 
            { src:res.src
            ,	alt:( ( 'alt' in res ) ? ( res as any ).alt : '' )
            ,	width:img.width
            ,	height:img.height
            }
          ; if( done )
            { done()
            }
          ; cb( null, ret )
          })
        }
      }
  )
)

export default loadImageProps