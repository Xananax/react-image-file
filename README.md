# React-Image-File

An image component that accepts:

- `file`s objects (such as the ones returned from an upload field in the browser)
- `blob`s (as returned, from example, from couchdb)
- `string`s (normal src string used in regular images)

It has several mechanisms to act on the image at different stages of loading.

This is a suitable component to build an upload field that previews images,
or load images asynchronously and fade them in once they are

The module also contains a few bonuses, such as an image upload field and a propType

Entirely written in Typescript and decently well typed, but lacking tests for the time being unfortunately :(

- repo [here](https://github.com/Xananax/react-image-file)
- demo [here](http://xananax.github.io/react-image-file/)
- documentation (in progress) [here](http://xananax.github.io/react-image-file/doc)

## Usage

```sh
npm install react-image-file
```

```js
import ImageLoader from 'react-image-file';

<ImageLoader file={file} alt='some text'/>

```
`file` can be either a `Blob`, a `File`, or a src `string`.

You might also need to include the following css somehow:

```css
input[type=file], input[type=file]::-webkit-file-upload-button { cursor: pointer }
```

Other useful props:

- `template [string|React]` decides which template is rendered. This must be a valid React component or string. Two templates are provided by default, a `<div>` template that renders to a `background-image` and an `<img>` template 
- `type`: one of `div` or `img`. Decides which template is to be used, of the two default ones. Defaults to `div`.
- `alt [string]`: used if the image renders to an `<img>` tag
- `crop [CropAttribute]`: one of `contain`, `cover`, or `null`. Defaults to `contain`. Used if the image renders to a `<div>` template
- `loadingURL [string]`: an image URL to display while loading an image
- `errorURL [string]`: an image URL to display in case of error
- `emptyURL [string]`: an image URL to display when nothing is loading yet
- `width [number]`: specify the width of the image. If not provided, the width of the actual loaded bitmap will be used
- `height [number]`: specify the height of the image. If not provided, the height of the actual loaded bitmap will be used

Additionally, the following are passed to the template, should you want to use your own:
- `src`: a string (either the string passed in `file`, or a base-64 representation of the Blob/File)
- `imgWidth`: the width of the loaded image
- `imgHeight`: the height of the loaded image
- `status`: one of `EMPTY`, `DONE`, `LOADING`, or `ERROR`
- `...` and all other props passed to `Image`.

You also get, for free, an `UploadField` and an `ImageUploadField` components, but they're raw and will stay this way. It is my opinion that providing hooks for all the possible customizations that one would want from an upload field is counter productive, so feel free to study the structure and build your own implementations.

If you want to use them:

```js
import React from 'react'
import ImageUploadField from 'react-image-file/ImageUploadField'

export class App extends React.Component{ 
  constructor( props, context ){ 
    super( props, context )
    this.state = { files: [] }
  }
  onFilesChange = ( files: File[] ) =>{ 
    this.setState( { files } )
  }
  onSubmit = ( evt: FormEvent<HTMLFormElement> ) => { 
    evt.preventDefault()
    const { files, file:[file], text } = this.state
    const body = new FormData();
    body.append('text',text)
    body.append('file',file)
    files.map( ( f, i ) => body.append(`files[${i}]`,f) )
    fetch('http://localhost:8000', { method:'POST', body })
      .then( response => response.json() )
      .then( response => console.log( response ) )
    console.log(body)
    console.log( { text, file ,files } )
  }
  render(){
      return(
        <ImageUploadField
          label='upload images'
          imageWidth={50} 
          imageHeight={50} 
          multiple 
          thumbnailClassName="upload-thumbnail"
          onChange={(files)=>this.setState({files:files})} 
          files={this.state.files}
      />
    );
  }
```

You can check a full example, including a server to handle files on the other end, in `./src/demo`.
I have kind of a disgusting style, so if you have problems, open an issue, I'll revert to something more classical.

From version 0.3.0 on, this package will follow semver. However, internal packages such as image file upload, provided as convenience, will not. 

# Devving

I welcome contributions of course.
Scripts of interest:

Start a demo with an image file uploader to check if everything works
```sh
npm start
```

Builds the demo in './dist' and uploads it to gh-pages
```sh
npm run deploy
```

Compiles typescript and readies the module for publishing on npm
```sh
npm run compile
```

Removes the './build' directory
```sh
npm clean:build
```

Removes the './dist' directory
```sh
npm clean:dist
```
# Log

- 0.3.0
  + total re-writing
  + got rid of typings
  + broken down functionality in bite-sized files
  + *breaking change*: `Image` is now called `ImageLoader`, if someone was requiring it by name
  + *breaking change*: the file's entry point only exports `Image` now. Other components must be loaded individually
- 0.2.0
  + Converted to Typescript
- 0.1.0
  + First iteration
# License

MIT