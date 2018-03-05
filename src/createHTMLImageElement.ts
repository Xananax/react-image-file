import { isImageLoaded } from './isImageLoaded'
import { noOp } from './noOp'

/** 
 * callback used when the image loads successfully
 */
export interface OnImageLoadSuccess
  { ( img:HTMLImageElement ):void
  }

/** 
 * callback used when the image loading process produces an error
 */
export interface OnImageLoadError
  { ( img:HTMLImageElement, err:ErrorEvent ):void
  }

/**
 * Creates a DOM image object and set its onload and onerror properties.
 * If the image was already cached, onload is set immediatly.
 * @param  src     the source of the image, You may leave it blank if you want to set it later
 * @param  onLoad  callback to call when the image loads (or has loaded). Receives the image object as a parameter
 * @param  onError callback to call when the image has an error. Receives the image object as a parameter.
 *                 Optional, but note that `onload` will never be called if an error occurs
 * @return         the image object
 */
export const createHTMLImageElement = 
  ( src: string, onLoad?: OnImageLoadSuccess, onError?: OnImageLoadError ):HTMLImageElement =>
  { const img = new Image()
  ; let called = false
  ; img.alt = ''
  ; const callback = () => 
    { if(!called)
      { called = true
      ; img.onload = noOp
      ; img.onerror = noOp
      ; return true
      }
    ; return false
    }
  ; const onLoadWrapped = () => callback() && onLoad && onLoad(img)
  ; const onErrorWrapped = ( err: ErrorEvent ) => callback() && onError && onError( img, err )
  ; img.onload = onLoadWrapped
  ; img.onerror = onErrorWrapped
  ; if(src)
    { img.src = src
    }
  ; if( isImageLoaded( img ) )
    { setTimeout( onLoadWrapped )
    }
  ; return img
  }

export default createHTMLImageElement