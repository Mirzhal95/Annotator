import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import styles from "./dropZone.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ReactLogo } from "../../assets/plan.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ADD } from "../../store/actionTypes/actionTypes";

function DropZone(props) {
  const fileSelector = useSelector((state) => state.fileReducer.file);
  const isEditMode = useSelector((state) => state.editReducer.isEditMode);
  const dispatch = useDispatch();
  const {
    fileRejections,
    isDragReject,
    isDragActive,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      dispatch({
        type: ADD,
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
      <img className={styles.uploadedImage} src={file.preview} />
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

  return (
    <section className={styles.container}>
      {isEditMode && (
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <Button
                className={styles.zoomIn}
                variant="contained"
                color="primary"
                onClick={zoomIn}
              >
                Zoom in
              </Button>
              <Button
                className={styles.zoomOut}
                variant="contained"
                color="secondary"
                onClick={zoomOut}
              >
                Zoom out
              </Button>
              <Button
                className={styles.reset}
                variant="contained"
                onClick={resetTransform}
              >
                x
              </Button>

              <TransformComponent>
                <div {...getRootProps({ className: styles.dropZone })}>
                  {fileSelector.length > 0 && <div>{thumbs}</div>}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      )}

      {fileSelector.length > 0 && !isEditMode && (
        <div {...getRootProps({ className: styles.dropZone })}>
          {fileSelector.length > 0 && <div>{thumbs}</div>}
        </div>
      )}

      {fileSelector.length === 0 && (
        <div {...getRootProps({ className: styles.dropZone })}>
          {fileSelector.length === 0 && !isEditMode && (
            <input {...getInputProps()} />
          )}
          {fileSelector.length === 0 && (
            <div>
              <span>{isDragActive ? <ReactLogo /> : <ReactLogo />}</span>
              <h3>Click Yellow zone or drop an image to upload!</h3>
            </div>
          )}
          {isDragReject && <h3>This file type not supported, sorry!</h3>}
          {isDragActive && !isDragReject && <h3>Drop it AS IF it's hot!</h3>}
          {isFileTooLarge && <div>File is too large.</div>}
          {fileRejections.length > 0 && "File not supported"}
        </div>
      )}
    </section>
  );
}

export default DropZone;
