import * as React from 'react'
import { ChangeEvent } from 'react'

export interface HTMLFileInputElement extends HTMLInputElement
  { files: FileList
  }

export interface Props
  { label?: string
  , buttonStyle: any
  , containerStyle: any
  , className?: string
  , tabIndex?: number
  , inputProps:
    { name?: string
    , accept?: string
    , className?:string
    , onChange: ( evt:ChangeEvent< HTMLFileInputElement > ) => void
    , multiple?: boolean
    , style: any
    }
  }

export const UploadFieldTemplate = 
  ( { containerStyle, tabIndex, buttonStyle, label, className, inputProps }: Props ) =>( 
  <span style={containerStyle}>
    <button style={buttonStyle} tabIndex={tabIndex || 0} className={className}>
      {label}
    </button>
    <input type="file" tabIndex={-1} {...inputProps}/>
  </span>
)

export default UploadFieldTemplate