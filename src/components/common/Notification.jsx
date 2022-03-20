import React, { useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

const Notification = ({ type, message }) => {
   console.log(type)

  const getMessageColor = () => {
    if (type) {
      if (type === "error") {
        return "#f44336!important";
      } else if (type === "warning") {
        return "#ffa726!important";
      } else {
        return "#2e7d32!important";
      }
    } else {
      return "#333!important";
    }
  };

  const getIcon = () => {
    if (type) {
      if (type === "error") {
        return (
          <ErrorIcon
            sx={{
              color: getMessageColor(),
              marginRight: ".3em",
            }}
          />
        );
      } else if (type === "warning") {
        return (
          <WarningIcon
            sx={{
              color: getMessageColor(),
              marginRight: ".3em",
            }}
          />
        );
      } else {
        return (
          <CheckCircleIcon
            sx={{
              color: getMessageColor(),
              marginRight: ".3em",
            }}
          />
        );
      }
    } else {
      return null;
    }
  };

  return (
    <Paper
      sx={{
        padding: ".8em 1.5em",
        position: "absolute",
        right: "3px",
        borderRadius: "3em",
        minWidth: "10em",
        display:"flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexFlow: "row wrap",
      }}
    >
      {getIcon()}
      <Typography
        variant="body1"
        sx={{
          color: getMessageColor(),
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
};

export default Notification;
