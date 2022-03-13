import React from "react"
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const navbarBtn = {
   border: "2px solid #fff",
   color: "#fff",
   textTransform: "capitalize",
   fontSize: "1.1rem",
   padding: "0 14px",
   margin: "0 .5em",
 };

const Header = () => {
   return (
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
           <Typography variant="h5" style={{textTransform: "uppercase", textDecoration: "none", color: "#fff"}} component={Link} to="/">
               Calorie Calculator
           </Typography>
          <div>
          <Button
            variant="outlined"
            component={Link}
            to="/sign-up"
            color="secondary"
            style={{...navbarBtn}}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/login"
            color="secondary"
            style={{...navbarBtn}}
          >
            Login
          </Button>
          </div>
        </Toolbar>
      </AppBar>
   )
}

export default Header;