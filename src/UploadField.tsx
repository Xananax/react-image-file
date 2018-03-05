import * as React from 'react'
import { PureComponent, ChangeEvent } from 'react'
import { UploadFieldTemplate, HTMLFileInputElement } from './UploadFieldTemplate'

const containerStyle =
  { position: 'relative' as 'relative'
  , display: 'inline-block'
  }

const buttonStyle =
  { cursor: 'pointer'
  , display: 'inline-block'
  , top: 0
  , left: 0
  }

const inputStyle =
  { position: 'absolute' as 'absolute'
  , top: 0
  , bottom: 0
  , right: 0
  , left: 0
  , width: '100%'
  , opacity: 0
  }

export interface UploadFieldProps
  { id?:string
  ; className?:string
  ; onChange?: ( files: File[], value?: any ) => void
  ; name?: string
  ; multiple?: boolean
  ; files?: File[]
  ; uploadFieldTemplate: any
  ; tabIndex?:number
  ; accept?: string
  ; label?: string
  }

export interface UploadFieldState
  { files?: File[]
  }

/**
 * Takes a file iterator as the one created by a file input
 * and transforms it into an array of html File objects
 * @param files 
 */
export const fileListToArray = 
  ( files: FileList ): File[] => 
  ( Array.prototype.slice.call( files ) )

/** 
 * A simple upload field to be used in any React project.
 */
export class UploadField extends PureComponent<Partial<UploadFieldProps>,UploadFieldState>
  { static defaultProps = 
    { uploadFieldTemplate: UploadFieldTemplate
    , label: 'upload'
    , accept: 'image/*'
    }
  ; constructor( props: UploadFieldProps, context: any )
    { super( props, context )
    ; this.state = { files: props.files || [] }
    }
  ; handleChange = ( evt: ChangeEvent< HTMLFileInputElement > ) =>
    { const files = fileListToArray( evt.target.files )
    ; if( this.props.onChange )
      { this.props.onChange( files,evt.target.value );
      }else
      { this.setState( { files } )
      }
    }
  ; componentWillReceiveProps(nextProps:UploadFieldProps)
    { if( nextProps.files )
      { this.setState( { files: nextProps.files } )
      }
    }
  ; render()
    { const { files } = this.state
    ; const 
      { id
      , name
      , multiple
      , label
      , accept
      , className 
      , tabIndex
      } = this.props
    ; const Comp = this.props.uploadFieldTemplate
    ; const inputProps =
      { id
      , name
      , accept
      , onChange: this.handleChange
      , multiple
      , style:inputStyle
      }
    ; const props = 
      { containerStyle
      , buttonStyle
      , label
      , inputProps
      , className
      , tabIndex
      }
    ; return <Comp {...props}/>
    }
  }

export default UploadField