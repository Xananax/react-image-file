import * as React from 'react'
import { PureComponent } from 'react'

import 
  { EMPTY
  , DONE
  , ERROR
  , LOADING
  } from './constants';
import 
  { ImageLoader
  } from './ImageLoader';
import 
  { UploadField
  , UploadFieldProps
  , UploadFieldState
  } from './UploadField';

export interface ImageUploadFieldProps extends UploadFieldProps
  { ImageUploadFieldTemplate?: any
  ; imageWidth?: number
  ; imageHeight?: number
  ; thumbnailClassName?: string
  }

export interface ImageUploadFieldThumbnailProps
  { file: File
  , className?: string
  , imageWidth?: number
  , imageHeight?: number
  , onClose: () => any
  }

export const ImageUploadFieldThumbnailCloseButton = 
  ({ onClick }: { onClick: () => any } ) => 
  ( <button onClick={onClick}>x</button>
  )

export const ImageUploadFieldThumbnail = 
  ( { file, className, onClose, imageWidth, imageHeight }: ImageUploadFieldThumbnailProps ) => 
  { const name = file? file.name : 'no image'
  ; const status = file ? EMPTY : DONE
  ; const props = 
    { file: file
    , width: imageWidth
    , height: imageHeight
    , status
    , crop:'cover' as 'cover'
    }
  ; const closeBtn = file ? <ImageUploadFieldThumbnailCloseButton onClick={onClose}/> : null
  ; return (<div className={className}>{closeBtn}<ImageLoader {...props}/><span>{name}</span></div>)
  }

/** 
 * Simple Image Upload Field class to be used in any React project.
 */
export class ImageUploadField extends PureComponent< Partial< ImageUploadFieldProps >, UploadFieldState >
  { static defaultProps = 
    { ImageUploadFieldTemplate: 'div'
    // , imageWidth: 50
    // , imageHeight: 50
    , thumbnailClassName: 'upload-thumbnail'
    , accept: '.jpg,.png,.jpeg,.bmp,.gif,image/jpg,image/gif,image/png,image/bmp'
    }
  ; constructor( props: ImageUploadFieldProps, context: any )
    { super( props, context )
    ; this.handleChange = this.handleChange.bind( this )
    ; this.removeImage = this.removeImage.bind( this )
    ; this.renderImage = this.renderImage.bind( this )
    ; this.state = { files: props.files || [] }
    }
  ; handleChange( files: File[] )
    { if(this.props.onChange)
      { this.props.onChange( files )
      }else
      { this.setState( { files } )
      }
    }
  ; removeImage( n?: number )
    { const files = ( this.state.files as File[] ).slice()
    ; files.splice (n || 0,1 );
    ; this.handleChange( files )
    }
  ; componentWillReceiveProps( nextProps: ImageUploadFieldProps )
    { if( nextProps.files )
      { this.setState( { files: nextProps.files } )
      }
    }
  ; renderImages( files?: File[] )
    { if( files && files.length )
      { return (
        <div>
          {files.map( this.renderImage )}
        </div>)
      }
      return null
    }
  ; renderImage( file: File, key: number )
    { const 
      { imageWidth
      , imageHeight
      , thumbnailClassName:className
      } = this.props
    ; const imageProps = 
      { file
      , key
      , imageHeight
      , imageWidth
      , className
      , onClose: this.removeImage
      }
    ; return <ImageUploadFieldThumbnail {...imageProps}/>
    }
  ; renderMultiple( input: JSX.Element, images: JSX.Element | null )
    { return (
      <div>
        {input}
        {images}
      </div>)
    }
  ; renderUnique( input: JSX.Element, images: JSX.Element | null )
    { return (
      <div>
        {images}
        {input}
      </div>)
    }
  ; render()
    { const 
      { files
      } = this.state
    ; const 
      { ImageUploadFieldTemplate: Comp
      , onChange
      , ...fileInputProps
      } = this.props
    ; const input = <UploadField {...fileInputProps} onChange={this.handleChange}/>
    ; const images = this.renderImages( files )
    ; const markup = 
      ( this.props.multiple
      ? this.renderMultiple( input, images )
      : this.renderUnique( input, images )
      )
    ; return markup;
    }
  }

export default ImageUploadField