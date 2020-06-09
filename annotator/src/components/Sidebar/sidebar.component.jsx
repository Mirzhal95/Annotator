import React from "react";
import { Button } from "@material-ui/core";
import styles from "./sidebar.module.css";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const isEditMode = useSelector((state) => state.editReducer.isEditMode);
  const dispatch = useDispatch();

  console.log(isEditMode);
  return (
    <div className={styles.container}>
      {isEditMode ? (
        <Button
          onClick={() => dispatch({ type: "IS_EDIT_MODE_OFF" })}
          className={styles.button}
          variant="contained"
          color="secondary"
        >
          Exit edit mode
        </Button>
      ) : (
        <Button
          onClick={() => dispatch({ type: "IS_EDIT_MODE_ON" })}
          className={styles.button}
          variant="contained"
          color="secondary"
        >
          Edit image
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
