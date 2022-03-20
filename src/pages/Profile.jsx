import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Paper, Typography,CssBaseline,Card,CardContent,Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import PopUpWindow from "../components/common/PopUpWindow";
import axios from 'axios';


const ProfilePage = () => {
  const [trigger, setTrigger] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "XXXX",
    email: "XXX@gmail.com",
    phone: "017XXXXXXXX",
  });

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if(jwtToken) {
      axios.get("http://127.0.0.1:8000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }).then(result => {
        if(result.status == 200) {
          setUserInfo({
            name: result.data.data.name,
            email: result.data.data.email,
            phone: "017XXXXXXXX"
          })
        }
      })
    }
  }, [])

  return (
    <>
    {/* {trigger && (
        <PopUpWindow
          trigger={trigger}
          setTrigger={setTrigger}
          rowInfo={userInfo}
          setRowInfo={setUserInfo}
          popupType={"editprofile"}
        />
      )} */}
      <CssBaseline/>
      <Container maxWidth='md' sx={{mt:'80px'}}>
        <Card>
          <CardContent>
          <Typography variant="h4" sx={{fontWeight: "medium" }} color="primary">
              Profile
            </Typography>
            <Divider/>
            <Grid container spacing={2} sx={{mt:'10px'}}>
              <Grid item xs={12} md={6}>
                <AccountCircleIcon sx={{height: "3em", width: "3em", color: "primary.main"}} />
              </Grid>
              <Grid item xs={12} md={6} sx={{mt:'50px'}}>
              <Typography variant="h5">Welcome To Calorie Calculator</Typography>
                 <Typography variant="h6">Name: {userInfo.name}</Typography>
                 <Typography variant="h6">Email: {userInfo.email}</Typography>
                 <Typography variant="h6">
                   Phone Number: {userInfo.phone}
                 </Typography>
                 <Button
                sx={{
                  marginTop: "10px",
                  background: "#03a9f4",
                  "&:hover": {
                    backgroundColor: "#29b6f6",
                    color: "#fff",
                  },
                }}
                onClick={() => setTrigger(!trigger)}
                variant="contained"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>

              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ProfilePage;
