import React, { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {Link} from "react-router-dom"
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormTemplate from "../components/Login/FormTemplate";
import validateEmail from "./../utils/validateEmail"

const avatarStyle = {
  backgroundColor: "primary.main",
  margin: "5px auto 24px",
};

const label = { inputProps: { "aria-label": "Remember Me" } };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remebmerMe, setRemebmerMe] = useState(true);
  const [emailFieldError, setEmailFieldError] = useState(false);

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    
    if (!validateEmail(email)) setEmailFieldError(true);
    else if (validateEmail(email))
      setEmailFieldError(false);
  };

  const handleLoginSubmit = async () => {
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/user/login", {email, password})
      console.log(result)
    } catch (error) {}
  };

  return (
    <FormTemplate>
      <Grid align="center">
        <Avatar sx={{ ...avatarStyle }}>
          <LockOutlinedIcon
            sx={{
              color: "#fff",
            }}
          />
        </Avatar>
      </Grid>
      <TextField
        label="Email Address"
        placeholder="Enter Email Address"
        fullWidth
        required
        size="small"
        value={email}
        error={emailFieldError}
        onChange={handleEmail}
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
        fullWidth
        required
        size="small"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <FormControlLabel
        label="Remember Me"
        sx={{
          "& .MuiTypography-root": {
            fontSize: "14px",
          },
        }}
        control={
          <Checkbox
            {...label}
            value={remebmerMe}
            onChange={(e) => setRemebmerMe(e.target.checked)}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: "1.5rem" },
              color: "primary.main",
            }}
          />
        }
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        sx={{
          margin: "10px auto",
          letterSpacing: "1px",
          textTransform: "capitalize",
          borderRadius: "8px",
          backgroundColor: "primary.main",
          frontSize: "1rem",
        }}
        fullWidth
        onClick={handleLoginSubmit}
      >
        Sign in
      </Button>
      <Typography
        variant="caption"
        component={Link}
        to="/forgot-password"
        sx={{
          fontSize: ".8rem",
          lineHeight: 2,
          display: "block",
          textDecoration: "none",
          color: "primary.light",
        }}
      >
        Forgot password?
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          "& a": {
            textDecoration: "none",
            color: "primary.light",
            marginLeft: "5px",
          },
        }}
      >
        Don't have an account?<Link to="/sign-up">Sign Up</Link>
      </Typography>
    </FormTemplate>
  );
};

export default Login;
