import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import styles from "./dropZone.module.css";
import { useSelector, useDispatch } from "react-redux";

function DropZone(props) {
  const fileSelector = useSelector((state) => state.fileReducer.file);
  const dispatch = useDispatch();
  const [rejectedFileType, setRejectedFileType] = useState(false);
  // const [files, setFiles] = useState([]);
  const {
    acceptedFiles,
    fileRejections,
    isDragReject,
    isDragActive,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      dispatch({
        type: "ADD",
        payload: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      });
    },
  });

  const thumbs = fileSelector.map((file) => (
    <div key={file.name}>
      <img style={{ width: "100%", height: "95vh" }} src={file.preview} />
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      fileSelector.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [fileSelector]
  );

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].size > props.maxSize;

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  return (
    <section className={styles.container}>
      <div {...getRootProps({ className: styles.dropZone })}>
        <input {...getInputProps()} />
        {fileSelector.length === 0 && (
          <div>
            <h3>Click here or drop a file to upload!</h3>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
            >
              Load image
            </Button>
          </div>
        )}
        {thumbs}
        {isDragReject && <h3>This file type not supported, sorry!</h3>}
        {isDragActive && !isDragReject && <h3>Drop it AS IF it's hot!</h3>}
        {isFileTooLarge && <div>File is too large.</div>}
        {fileRejections.length > 0 && "File not supported"}
      </div>
    </section>
  );
}

export default DropZone;
