import { isReadable } from './isReadable';

export interface PropType 
  { ( props: any, propName: string, componentName: string): Error | undefined
  ; isRequired?: PropType
  }

/** 
 * A comvenience propType to use in React.
 * Verifies that the passed object, if any, is a string, a File, or a Blob
 */
export const readableUrl:PropType = 
  function ( props:any, propName:string, componentName:string)
  { if( !( propName in props ) || !props[propName] )
    { return
    }
  ; const prop = props[propName]
  ; if( !isReadable( prop ) )
    { return new Error( `\`${propName}\` is not a valid Blob or File` )
    }
  ; return
  } as PropType

/** 
 * A convenience propType to use in React.
 * Verifies that the passed object is a string, a File, or a Blob 
 */
export const isRequired:PropType =
  function ( props: any, propName: string, componentName: string )
  { if( !( propName in props ) || !props[propName] )
    { return new Error( `\`${propName}\` is required` )
    }
  ; return readableUrl( props, propName, componentName )
  } as PropType

readableUrl.isRequired = isRequired

export default readableUrl