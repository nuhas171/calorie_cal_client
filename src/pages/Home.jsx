import React, { useState } from "react";
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
} from "@mui/material";

const Home = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [cal, setCal] = useState(0);
  const [gender, setGender] = useState("male");

  function claculateCal() {
    let total;

    if (gender == "male") {
      total =
        10 * Number(weight) +
        6.25 * (Number(height) * 30.48) -
        5 * Number(age) +
        5;
      setCal(total);
    } else if (gender == "female") {
      total =
        10 * Number(weight) + 6.25 * (Number(height) * 30.48) - 5 * Number(age);
      setCal(total);
    }
  }

  return (
    <>
      <Card
        sx={{
          width: "70%",
          margin: "3em auto",
          textAlign: "center",
          padding: "2em",
        }}
      >
        <Typography variant="h4">Calculate Your Daily Calorie Need</Typography>
        <CardContent
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "1em",
            justifyContent: "flex-start",
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
        <Card sx={{width: "70%", margin: "0 auto"}}>
          <Typography variant="h6">Total Calorie You Need {cal}</Typography>
        </Card>
      </>
    </>
  );
};

export default Home;
