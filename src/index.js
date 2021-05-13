import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import './index.css';

//const app = window.require('electron');

function MyDropzone() {
  let files = [];
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      let fileName = file.name;
      let fileType = file.type;
      console.log(fileType);

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result;

        files.push({
          "fileName": fileName,
          "fileType": fileType,
          "fileContents": binaryStr
        })

        console.log(files)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  //send files to the server



  const {getRootProps, getInputProps} = useDropzone({onDrop});
  let divProps = getRootProps()
  
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <img src="upload.png" alt=""></img>
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

ReactDOM.render(
  React.createElement(MyDropzone, {}, null),
  document.querySelector('#root')
)