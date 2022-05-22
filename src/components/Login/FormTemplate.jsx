import React from "react";
import {
  Paper,
  Stack
} from "@mui/material";

const FormTemplate = (props) => {
  return (
    <div
      style={{
        backgroundImage: "radial-gradient(circle,#39659f,#16253e)",
        padding: "1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "inherit"
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        component={Paper}
        sx={{
          boxShadow: 1,
          padding: "20px",
          height: "fit-content",
          width: 280,
        }}
      >
        {
           props.children
        }
      </Stack>
    </div>
  );
};

export default FormTemplate;
