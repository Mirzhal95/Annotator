import React from "react";
import { Button, Slider } from "@material-ui/core";
import styles from "./sidebar.module.css";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD,
  IS_EDIT_MODE_OFF,
  REMOVE,
  IS_EDIT_MODE_ON,
} from "../../store/actionTypes/actionTypes";

const Sidebar = () => {
  const isEditMode = useSelector((state) => state.editReducer.isEditMode);
  const isThereFileUploaded = useSelector((state) => state.fileReducer.file);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
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

  return (
    <div className={styles.container}>
      {isThereFileUploaded.length > 0 && (
        <Button
          onClick={() => {
            dispatch({ type: REMOVE });
            dispatch({ type: IS_EDIT_MODE_OFF });
          }}
          className={styles.button}
          variant="contained"
        >
          Remove image
        </Button>
      )}

      <div {...getRootProps({ className: styles.dropZone })}>
        <input {...getInputProps()} />
        {isThereFileUploaded.length === 0 && (
          <div>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
            >
              Load image
            </Button>
          </div>
        )}
      </div>

      {isEditMode && (
        <Button
          onClick={() => dispatch({ type: IS_EDIT_MODE_OFF })}
          className={styles.button}
          variant="contained"
          color="secondary"
        >
          Exit edit mode
        </Button>
      )}

      {isThereFileUploaded.length > 0 && !isEditMode ? (
        <Button
          onClick={() => dispatch({ type: IS_EDIT_MODE_ON })}
          className={styles.button}
          variant="contained"
          color="secondary"
          disabled={isThereFileUploaded.length === 0}
        >
          Edit image
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
