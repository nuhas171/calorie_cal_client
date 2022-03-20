import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate  } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormTemplate from "../components/Login/FormTemplate";
import checkPassStrength from "../utils/validatePassword";
import validateEmail from "../utils/validateEmail";
import Notification from "../components/common/Notification";
import axios from "axios"

const avatarStyle = {
  backgroundColor: "primary.main",
  margin: "5px auto 24px",
};

const label = { inputProps: { "aria-label": "Remember Me" } };

const SignUp = () => {
  const navigate = useNavigate ()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConPassword] = useState("");
  const [conPassErr, setConPassErr] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailFieldError, setEmailFieldError] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("")

  useEffect(() => {
    if (confirmPass) {
      if (!(password === confirmPass)) setConPassErr(true);
      if (password === confirmPass) setConPassErr(false);
    }
  }, [confirmPass, password]);

  useEffect(() => {
    if (!email || !name || !password || !confirmPass || !agreeTerms)
      setDisableBtn(true);
    if (email && name && password && confirmPass && agreeTerms)
      setDisableBtn(false);
  }, [email, name, password, confirmPass, conPassErr, agreeTerms]);

  useEffect(() => {
    setTimeout(() => {
      setMessage("")
    }, 30000)
  })

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);

    if (!validateEmail(email)) setEmailFieldError(true);
    else if (validateEmail(email)) setEmailFieldError(false);
  };

  const handleSubmit = async () => {
    const data = {
      name,
      email,
      password,
      confirmPass
    };

    try {
      const result = await axios.post("http://127.0.0.1:8000/api/user/sign-up", data)
      localStorage.setItem('jwt', result.data.data);
      navigate("/")
    } catch(error) {
      console.log(error.message)
    }
    
  };

  return (
    <>
      {message ? <Notification type={type} message={message} /> : null}
      <FormTemplate>
        <Grid align="center">
          <Avatar sx={{ ...avatarStyle }}>
            <AccountCircleIcon
              sx={{
                color: "#fff",
              }}
            />
          </Avatar>
        </Grid>
        <TextField
          label="Full Name"
          placeholder="Enter Full Name"
          fullWidth
          required
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email Address"
          placeholder="Enter Email Address"
          fullWidth
          required
          size="small"
          value={email}
          error={emailFieldError}
          onChange={(e) => handleEmail(e)}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          size="small"
          value={password}
          error={true}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& label": {
              color: checkPassStrength(password),
            },
            "& label span": {
              color: checkPassStrength(password),
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                checkPassStrength(password) == "inherit!important"
                  ? "rgba(0, 0, 0, 0.23)!important"
                  : checkPassStrength(password),
            },
          }}
        />
        <TextField
          label="Confirm Password"
          placeholder="Re-type password"
          type="password"
          fullWidth
          required
          size="small"
          value={confirmPass}
          error={conPassErr}
          onChange={(e) => setConPassword(e.target.value)}
        />
        <FormControlLabel
          label={
            <Typography
              sx={{
                "& a": {
                  textDecoration: "none",
                  color: "primary.main",
                },
              }}
            >
              I agree to the Smashboard{" "}
              <Typography variant="caption" component={Link} to="/terms">
                Terms
              </Typography>{" "}
              &{" "}
              <Typography variant="caption" component={Link} to="policy">
                Policy
              </Typography>
            </Typography>
          }
          sx={{
            "& .MuiTypography-root": {
              fontSize: "14px",
            },
          }}
          control={
            <Checkbox
              {...label}
              checked={agreeTerms}
              onChange={(event) => setAgreeTerms(event.target.checked)}
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
          fullWidth
          onClick={handleSubmit}
          disabled={disableBtn}
          sx={{
            letterSpacing: "1px",
            textTransform: "capitalize",
            frontSize: "1rem",
          }}
        >
          Sign Up
        </Button>
        <Typography
          variant="subtitle1"
          sx={{
            "& a": {
              textDecoration: "none",
              color: "primary.light",
            },
          }}
        >
          Already have an account?<Link to="/login">Sign in</Link>
        </Typography>
      </FormTemplate>
    </>
  );
};

export default SignUp;
