import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImg from "./../assets/bg-main.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [totalCal, setCal] = useState(0);
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("normal");

  useEffect(() => {
      const token = localStorage.getItem("jwt")
      if(token) {
      axios.get(
        "http://127.0.0.1:8000/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(res => {
        const {age, name, weight, height} = res.data.data
        setName(name);
        setAge(age);
        setWeight(weight)
        setHeight(height)
      })
    }
  }, []);

  function claculateCal() {
    let total;

    if (gender == "male") {
      total =
        10 * Number(weight) +
        6.25 * (Number(height) * 30.48) -
        5 * Number(age) +
        5;
    } else if (gender == "female") {
      total =
        10 * Number(weight) + 6.25 * (Number(height) * 30.48) - 5 * Number(age);
    }

    switch (activity) {
      case "normal":
        total = total * 1.2;
        break;

      case "moderate":
        total = total * 1.5;
        break;
      case "intensive":
        total = total * 1.9;
        break;
    }

    setCal(Number.parseInt(total));
  }

  function saveToDB() {
      const token = localStorage.getItem("jwt");
      if (token) {
      axios
        .post(
          "http://127.0.0.1:8000/api/user/activity",
          {
            name,
            weight,
            height,
            age,
            gender,
            activity,
            total: totalCal,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => alert("activity saved to db"));
    } else {
      alert("Your are not logged in. Please login to save activity");
      navigate("/login");
    }
  }

  return (
    <>
      <Card
        sx={{
          width: "70%",
          margin: "3em auto",
          textAlign: "center",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: "2",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#fff",
            opacity: ".8",
            zIndex: "-1",
          }}
        ></div>
        <Typography variant="h4" style={{ padding: "1em" }}>
          Calculate Your Daily Calorie Need
        </Typography>
        <CardContent
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "1em",
            justifyContent: "space-between",
            padding: "2.5em !important",
          }}
        >
          <TextField
            label="Name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Weight"
            placeholder="Enter your weight in fit"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            label="Height"
            placeholder="Enter your height in fit"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <TextField
            label="Age"
            placeholder="Enter your age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Select Activity
            </InputLabel>
            <Select
              value={activity}
              label="Select Activity"
              onChange={(e) => setActivity(e.target.value)}
            >
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="moderate">Moderate</MenuItem>
              <MenuItem value="intensive">Intensive</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              "& .MuiFormGroup-root": {
                display: "flex",
                flexFlow: "row wrap",
              },
            }}
          >
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <Button onClick={claculateCal} variant="contained">
            Calculate
          </Button>
        </CardContent>
      </Card>
      <>
        <Card
          sx={{
            width: "70%",
            margin: "0 auto",
            padding: "1.5em",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">
            Total Calorie You Need {totalCal}
          </Typography>
          <Button variant="contained" onClick={saveToDB}>
            {" "}
            Save{" "}
          </Button>
        </Card>
      </>
    </>
  );
};

export default Home;
