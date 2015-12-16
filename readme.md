# React-Image-File

An image component that accepts blobs (as returned, from example, from couchdb) and file objects (such as the ones uploaded in the browser)

# Usage

```sh
npm install react-image-file
```

```js
import Image from 'react-image';

<Image file={file} alt='some text'/>

```

`file` can be either a Blob, a File, or a src string.

Other useful props:
- `template` decides which template is rendered. This must be a valid React component. The template receives the following props:
    + `src`: a string (either the string passed in `file`, or a base-64 representation of the Blob/File)
    + `alt`: the string passed in `alt`, or a filename if available (on `File` objects only)
    + `imgWidth`: the width of the loaded image
    + `imgHeight`: the height of the loaded image
    + `...` and all other props passed to `Image`.

The following props are consumed by the default template, and are passed down from `Image`:
- `src`: a valid string (automatically handled by `Image`)
- `alt`: a string
- `loadingURL`: an image URL to display while loading an image
- `errorURL`: an image URL to display in case of error
- `emptyURL`:an image URL to display when nothing is loading yet
- `status`: one of `EMPTY`, `DONE`, `LOADING`, or `ERROR`. This is handled automatically by `Image`
- `width`: width of the image
- `height`: height of the image
- `crop`: one of `contain`, `cover`, or `null`. Defaults to `contain`.
- `type`: one of `div` or `img`. Note that choosing `img` will nullify any effect of `crop` (there is no handling of automatic resizing of an image tag). Defaults to `div`.

You also get, for free, an `UploadField` and an `ImageUploadField` components, but they're very raw at the moment, so it is advised to use them as a starting point only. In case you want to use them:

```js
import {ImageUploadField,UploadField} from 'react-image'

<ImageUploadField
    label='upload images'
    imageWidth={50} 
    imageHeight={50} 
    multiple 
    onChange={(files)=>this.setState({files:files})} 
    files={this.state.files}
/>
```


# License

MIT