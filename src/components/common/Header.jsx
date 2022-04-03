import React, { useEffect, useState, useContext } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RootContext from './../../utils/context';
import HeaderMenu from "../Home/HeaderMenu";

const navbarBtn = {
  border: "2px solid #fff",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "1.1rem",
  padding: "0 14px",
  margin: "0 .5em",
};

const Header = () => {
  const [jwt, setJwt] = useState("");
  const rootContext = useContext(RootContext)

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setJwt(`${token}`);
    }
  }, [jwt]);

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          style={{
            textTransform: "uppercase",
            textDecoration: "none",
            color: "#fff",
          }}
          component={Link}
          to="/"
        >
          Calorie Calculator
        </Typography>
        <div>
          {rootContext.login ? (
            <HeaderMenu/>
          ) : (
            <div>
              <Button
                variant="outlined"
                component={Link}
                to="/sign-up"
                color="secondary"
                style={{ ...navbarBtn }}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/login"
                color="secondary"
                style={{ ...navbarBtn }}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
