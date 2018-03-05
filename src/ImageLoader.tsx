import * as React from 'react'
import { Component } from 'react'
import { loadImageProps, ImageProps } from './loadImageProps'
import { isDefined } from './isDefined'
import { EMPTY, DONE, ERROR, LOADING, ImageLoaderLoadStatus } from './constants'
import { transparentGIF } from './transparentGIF'
import { ImageTemplate } from './ImageTemplate'

/** 
 * A type representing the crop option
 */
export type CropAttribute = 'cover' | 'contain'

export interface ImageLoaderProps 
  { template?: any
  ; file?: string | File | Blob
  ; alt?: string
  ; crop?: CropAttribute
  ; loadingURL?: string
  ; errorURL?: string
  ; emptyURL?: string
  ; width?: number
  ; height?: number
  ; className?: string
  }

export interface ImageLoaderState
  { src?: string
  ; alt?: string
  ; status?: ImageLoaderLoadStatus
  ; width: number
  ; height: number
  ; error?: Error | DOMError
  }

export interface ImageTemplateProps extends ImageLoaderProps
  { src: string
  ; alt: string
  ; width?: number
  ; height?: number
  ; imgWidth: number
  ; imgHeight: number
  ; status: ImageLoaderLoadStatus
  ; statusAttr: string
  ; children?: any
  ; className?: string
  }

/**
 * Chooses a different src string depending on
 * the status provided.
 * That is, returns the loadingURL src if the status is 
 * `LOADING`, the errorURL src if the status is `ERROR`,
 * the emptyURL src if the status is `EMPTY`, and the
 * default src for any other status  
 * @param status the status, `LOADING`, `ERROR`, `EMPTY` or `DONE`
 * @param src the default src string, to be used on DONE status, or if other URLS are not available
 * @param urls an object of three urls, loadingURL,errorURL,emptyURL, all optional
 */
export const getSRC = 
  ( status?: ImageLoaderLoadStatus, src?: string, props?: ImageLoaderProps )=>
  { if( !props ){ return src || '' }
  ; const { loadingURL, errorURL, emptyURL } = props
  ; const ret =
    ( status === LOADING && loadingURL
    ? loadingURL
    : ( status === ERROR && errorURL
      ? errorURL
      : ( status === EMPTY && emptyURL
        ? emptyURL
        : src || ''
        )
      )
    )
  ; return ret
  }

/**
 * Returns the status
 * @param props 
 */
export const getStatus = 
  ( props: ImageLoaderState ): ImageLoaderLoadStatus => 
  ( props.status || DONE )

/**
 * returns the crop type
 * @param props 
 */
export const getCrop = 
  ( props: ImageLoaderProps ): CropAttribute => 
  ( props && props.crop ? props.crop : 'contain' )

/**
 * Returns a data-x string, where 'x' is the status
 * useful for css targeting
 * @param status the status of the image loader
 */
export const statusAsAttr = 
  ( status?: ImageLoaderLoadStatus ) => 
  ( `data-status-${(status||'unknown').toLowerCase()}` )

export class ImageLoader extends Component< ImageLoaderProps, ImageLoaderState >
  { static defaultProps:ImageLoaderProps = 
    { template: ImageTemplate
    ,  crop:'contain'
    ,  emptyURL:transparentGIF
    }
  ; constructor(props:ImageLoaderProps,context:any)
    { super( props, context );
    ; this.state =
      { src:transparentGIF
      ,  alt:''
      ,  status:EMPTY
      ,  width:0
      ,  height:0
      }
    }
  ; load( props: File | Blob | string )
    { this.setState( { status: LOADING } );
    ; loadImageProps
        ( props
        , ( error: Error | DOMError | null
          , { src, alt, width, height }: ImageProps
          ) =>
          ( error
          ? this.setState({status:ERROR,error})
          : this.setState({
              status:DONE
            ,  src
            ,  alt
            ,  width
            ,  height
            })
          )
        )
    }
  ; componentDidMount()
    { if( this.props.file )
      { this.load( this.props.file )
      }
    }
  ; componentWillReceiveProps( nextProps: ImageLoaderProps )
    { if( nextProps.file !== this.props.file )
      { if( nextProps.file )
        { this.load( nextProps.file )
        }
        else if( nextProps.file == null )
        { this.setState( { src: transparentGIF } )
        }
      }
    }
  ; shouldComponentUpdate( nextProps: ImageLoaderProps, nextState: ImageLoaderState ): boolean
    { return (
      ( isDefined( nextProps.file ) && nextProps.file !== this.props.file ) ||
      ( isDefined( nextProps.alt ) && nextProps.alt !== this.props.alt ) ||
      ( isDefined( nextProps.template ) && nextProps.template !== this.props.template ) ||
      ( nextState.src !== this.state.src )
    )
  }
  ; render()
  { const 
    { src
    , width: imgWidth
    , height: imgHeight
    } = this.state
  ; const 
    { template
    , width
    , height
    , className
    } = this.props
  ; const alt = this.props.alt || this.state.alt || '';
  ; const crop = getCrop( this.props ) 
  ; const status = getStatus( this.state )
  ; const statusAttr = statusAsAttr( status )
  ; const props:ImageTemplateProps = 
    {...this.props
    , src:getSRC( status, src, this.props )
    , alt
    , width
    , height
    , imgWidth
    , imgHeight
    , crop
    , status
    , statusAttr
    , className
    }
  ; return React.createElement( template, props );
  }
}

export default ImageLoader