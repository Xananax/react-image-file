import * as React from 'react';
import { PureComponent, ChangeEvent, FormEvent } from 'react';
import { ImageUploadField } from '../ImageUploadField'
import { UploadField } from '../UploadField'

export interface Props{}
export interface State{text:string, files:File[], file:File[] }

export class App extends PureComponent<Props,State>
  { constructor( props: any, context: any )
    { super( props, context )
    ; this.state = { text:'', files: [], file:[] }
    }
  ; onFilesChange = ( files: File[] ) =>
    { this.setState( {files } )
    }
  ; onFileChange = ( file: File[] ) =>
    { this.setState( { file } )
    }
  ; onTextChange = ( evt: ChangeEvent<HTMLInputElement> ) =>
    { const { value:text } = evt.target
    ; this.setState( { text } )
    }
  ; onSubmit = ( evt: FormEvent<HTMLFormElement> ) =>
    { evt.preventDefault()
    ; const { files, file:[file], text } = this.state
    ; const body = new FormData();
    ; body.append('text',text)
    ; body.append('file',file)
    ; files.map( ( f, i ) => body.append(`files[${i}]`,f) )
    ; fetch('http://localhost:8000', { method:'POST', body })
      .then( response => response.json() )
      .then( response => console.log( response ) )
      .catch( err => console.log( err.message ) )
    ; console.log( { text, file ,files } )
    }
  ; render()
    { const { files, text, file } = this.state
      return (
      <div className="wrapper">
        <form onSubmit={this.onSubmit}>
          <h1>React-Image-File</h1>
          <fieldset>
            <legend>Fill the form, then open the console to see results when you press "ok"</legend>    
            <div className="field">
              <label htmlFor="text">Some text</label>
              <input name="text" id="text" type="text" onChange={this.onTextChange} value={text}/>
            </div>
            <div className="field">
              <label htmlFor="files">Images</label>
              <ImageUploadField className="upload" id="files" multiple={true} files={files} label="Upload Images" onChange={this.onFilesChange}/>
            </div>
            <div className="field">
              <label htmlFor="file">Image</label>
              <ImageUploadField className="upload" id="file" multiple={false} files={file} label="Upload Images" onChange={this.onFileChange}/>
            </div>
            <div className="field">
              <input type="submit" value="ok"/>
            </div>
          </fieldset>
        </form>
        <p>
          This is a demo for react-image-file, found <a href="https://github.com/Xananax/react-image-file">here</a>
        </p>
      </div>
      )
    }
  }

export default App;
