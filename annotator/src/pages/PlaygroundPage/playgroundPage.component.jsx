import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Sidebar from "../../components/Sidebar/sidebar.component";
import styles from "./playgroundPage.module.css";
import Dropzone from "../../components/DropZone/dropZone.component";

const PlayGroundPage = () => {
  return (
    <Grid className={styles.container} container>
      <Grid item xs={9}>
        <Paper elevation={3} className={styles.playground}>
          <Dropzone minSize={0} maxSize={5242880} />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={styles.sidebar} elevation={3}>
          <Sidebar />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PlayGroundPage;
