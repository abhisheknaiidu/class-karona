import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <Typography variant="h5" align="center" paragraph>
        Sorry, this page isn't available.
      </Typography>
      <Typography align="center">
        The link you followed may be broken, or the page may have been removed.
        <Link to="/">
          {" "}
          <Typography color="primary" component="span">
            Go back to class-karona.
          </Typography>
        </Link>
      </Typography>
    </>
  );
}

export default PageNotFound;