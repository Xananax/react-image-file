import * as React from 'react'
import { PureComponent } from 'react'
import { ImageTemplateProps } from './ImageLoader'

export const DivImage = 
  ( { src, status, alt, width, height, imgHeight, imgWidth, crop, statusAttr, className }: ImageTemplateProps ) =>
  { const props = 
    { title: alt
    , className
    , style:
      { width: width
      , height: height
      , backgroundImage: `url('${src}')`
      , backgroundSize: crop
      , backgroundRepeat: `no-repeat`
      , backgroundPosition: `50% 50%`
      }
    , [statusAttr]:true
    }
  ; return <div {...props}/>
  }

export const ImgImage = 
  ( { src, status, alt, width, height, statusAttr, imgWidth, imgHeight, className }: ImageTemplateProps ) =>
  { const props = 
    { src
    , alt
    , width: width
    , height: height
    , [statusAttr]:true
    , className
    }
  ; return <img {...props}/>
  }

export class ImageTemplate extends PureComponent< ImageTemplateProps & {type:string}, {} >
  { render()
    { const { props } = this
    ; const { type } = props
    ; if(type === 'img')
      { return <ImgImage {...props}/>
      }
    ; return <DivImage {...props}/>
    }
  }

export default ImageTemplate