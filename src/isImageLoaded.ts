/**
 * Checks if an dom image has loaded
 * @param  img a dom image, created through `document.createElement("img")`, `new Image()`, or `document.getElement`
 * @return     true if the image has loaded, false otherwise
 */
export const isImageLoaded = 
  ( img: HTMLImageElement ): boolean => 
  ( !!( img && ( img.complete || img.naturalWidth !== undefined ) )
  )

export default isImageLoaded
