import React, { useEffect, useState } from "react";
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
  Paper,
  CardMedia
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImg from "./../assets/home.jpg";
import { rapidApiAuth, rapidApiHost } from "./../apiConfig";
import FuzzySearch from "fuzzy-search";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [totalCal, setCal] = useState(0);
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("normal");
  const [allExercises, setAllExercises] = useState([]);
  const searcher = new FuzzySearch(allExercises, ["bodyPart", "equipment", "name"])
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    axios
      .get("https://exercisedb.p.rapidapi.com/exercises", {
        headers: {
          "X-RapidAPI-Host": rapidApiHost,
          "X-RapidAPI-Key": rapidApiAuth,
        },
      })
      .then((res) => setAllExercises(res.data));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { age, name, weight, height } = res.data.data;
          setName(name);
          setAge(age);
          setWeight(weight);
          setHeight(height);
        });
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
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // width: "100%",
        padding: "2em",
        height: "inherit"
      }}
    >
      <Card
        sx={{
          width: "70%",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          padding: "1.5em",
          marginBottom: "2em",
        }}
      >
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
            size="small"
            label="Name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            size="small"
            label="Weight"
            placeholder="Enter your weight in fit"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            size="small"
            label="Height"
            placeholder="Enter your height in fit"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <TextField
            size="small"
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
              size="small"
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
            size="small"
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
          <Button onClick={claculateCal} variant="contained" size="small">
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
      <Paper
        sx={{
          width: "70%",
          margin: "1em auto",
          padding: "1.5em",
          marginBottom: "2em",
          textAlign: "center"
        }}
      >
        <Typography variant="h6">Exercises</Typography>
        <TextField fullWidth size="small" label="Search exercises" onChange={(e) => {
          const result = searcher.search(e.target.value);
          setSearchResult(result)
        }} />
        <div style={{display: "flex", flexFlow: "row wrap"}}>
        {
          searchResult.map(exer => 
          <Card sx={{margin: ".5em 0", width: "33%"}}>
            <CardMedia
              component="img"
              height="auto"
              width="auto"
              image={exer.gifUrl}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="h6">{exer.name}</Typography>
              <Typography variant="caption">{exer.bodyPart}</Typography>
              <Typography variant="caption">{exer.equipment}</Typography>
            </CardContent>
          </Card>)
        }
        </div>
      </Paper>
    </div>
  );
};

export default Home;
