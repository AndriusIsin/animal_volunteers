import React from "react";
import { Grid, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const Loading = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: "3rem", color: "#54626F" }}
          className="blink_me"
          variant="h6"
        >
          Loading...
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Skeleton variant="text" />
      </Grid>
      <Grid item xs={3}>
        <Skeleton variant="rectangular" />
      </Grid>
      <Grid item xs={9}>
        <Skeleton variant="text" />
      </Grid>
      <Grid item xs={3}>
        <Skeleton variant="rectangular" />
      </Grid>
    </Grid>
  );
};

export default Loading;
