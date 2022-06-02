import { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  Paper,
  Typography,
  InputLabel,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { apiKey, appId } from "./../apiConfig";
import { Link } from "react-router-dom";
import bgImg from "./../assets/dailyFood.jpg"

const bgColor = {
  backgroundColor: "#fff",
  borderRadius: "4px"
}

export default function DailyFoodMenu() {
  const [day, setDay] = useState("");
  const [mealtime, setMealtime] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [foodsDetails, setFoodsDetails] = useState([]);
  const [totalCal, setTotalCal] = useState({ nutrients: { ENERC_KCAL: 0 } });

  useEffect(() => {
    const fetchFood = selectedFood[selectedFood.length - 1];

    if (fetchFood) {
      axios
        .get(
          `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${apiKey}&ingr=${fetchFood}&nutrition-type=cooking`
        )
        .then((res) => {
          setFoodsDetails([...foodsDetails, res.data.hints[0].food]);
        });
    } else {
      setFoodsDetails([]);
    }
  }, [selectedFood]);

  useEffect(() => {
    const total = foodsDetails.reduce(
      (prev, curr) => {
        return {
          nutrients: {
            ENERC_KCAL: prev.nutrients.ENERC_KCAL + curr.nutrients.ENERC_KCAL,
          },
        };
      },
      { nutrients: { ENERC_KCAL: 0 } }
    );
    console.log(total);
    setTotalCal(total);
  }, [foodsDetails]);

  const searchFood = async (value) => {
    try {
      const res = await axios.get(
        `https://api.edamam.com/auto-complete?app_id=${appId}&app_key=${apiKey}&q=${value}&limit=10`
      );
      setFoods(res.data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  const deleteFood = (id) => {
    const filterFood = foodsDetails.filter((food) => food.foodId != id);
    setFoodsDetails(filterFood);
  };

  const saveFoods = async () => {
    const jwt = localStorage.getItem("jwt");
    const body = {
      foods: foodsDetails,
      day: day,
      mealtime: mealtime,
    };
    console.log(body);
    const savedFoods = await axios.post(
      "http://127.0.0.1:8000/api/user/save-food",
      body,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (savedFoods.status == 201) {
      alert("Food saved");
      setDay("");
      setMealtime("");
      setSelectedFood([]);
      setFoods([]);
    }
  };

  return (
    <Paper
      sx={{
        padding: "2em",
        boxShadow: "none",
        backgroundImage: `url(${bgImg})`,
        height: foodsDetails.length ? "fit-content" : "inherit"
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item md={4}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "1em", color: "#fff" }}
          >
            Add your daily food menu
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Button variant="outlined" component={Link} sx={{float: "right", color: "#fff"}} to="/my-food-list">
            My food List
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={4}>
          <Box
            sx={{ minWidth: 220, width: "fit-content", marginBottom: "1em" }}
          >
            <FormControl fullWidth sx={{...bgColor}}>
              <InputLabel id="demo-simple-select-label">Select Day</InputLabel>
              <Select
                value={day}
                onChange={handleChange}
                label="Select Day"
              >
                <MenuItem value="saturday">Saturday</MenuItem>
                <MenuItem value="sunday">Sunday</MenuItem>
                <MenuItem value="monday">Monday</MenuItem>
                <MenuItem value="tuesday">Tuesday</MenuItem>
                <MenuItem value="wednesday">Wednesday</MenuItem>
                <MenuItem value="thursday">Thursday</MenuItem>
                <MenuItem value="friday">Friday</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {day && (
            <Box
              sx={{ minWidth: 220, width: "fit-content", marginBottom: "1em" }}
            >
              <FormControl fullWidth sx={{...bgColor}}>
                <InputLabel id="demo-simple-select-label">
                  Select Meal Time
                </InputLabel>
                <Select
                  value={mealtime}
                  onChange={(e) => setMealtime(e.target.value)}
                  label="Select Meal Time"
                >
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="lunch">Lunch</MenuItem>
                  <MenuItem value="dinner">Dinner</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          {mealtime && (
            <Autocomplete
              sx={{ minWidth: 220, width: "fit-content", ...bgColor }}
              multiple
              
              options={foods}
              onChange={(e, newVal) => setSelectedFood(newVal)}
              getOptionLabel={(option) => option}
              renderInput={(params) => {
                return (
                  <TextField
                    onChange={(e) => searchFood(e.target.value)}
                    {...params}
                    label="Search Food"
                    placeholder="Potato"
                  />
                );
              }}
            />
          )}
        </Grid>
        <Grid item md={6}>
          {console.log(foodsDetails)}
          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            {foodsDetails.map((f) => (
              <Card key={f.foodId} sx={{ margin: "1em" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={f.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {f.label}
                  </Typography>
                  <Paper>
                    <Typography variant="body2">
                      Energy: {f.nutrients.ENERC_KCAL}KCAL
                    </Typography>
                    <Typography variant="body2">
                      Carbohydrate: {f.nutrients.CHOCDF}
                    </Typography>
                    <Typography variant="body2">
                      Fat: {f.nutrients.FAT}
                    </Typography>
                    <Typography variant="body2">
                      Protin: {f.nutrients.PROCNT}
                    </Typography>
                    <Typography variant="body2">
                      Fiber: {f.nutrients.FIBTG}
                    </Typography>
                  </Paper>
                </CardContent>
                <CardActions>
                  <Button
                    color="error"
                    onClick={() => deleteFood(f.foodId)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </Grid>
      </Grid>

      <div style={{ width: "100%" }}>
        <div style={{ float: "right" }}>
          <Button
            variant="contained"
            sx={{ margin: "1em", width: "fit-content", height: "40px" }}
            onClick={saveFoods}
          >
            Save foods
          </Button>
        </div>
        <Paper sx={{ padding: "1em 2em" }}>
          <Typography variant="h6">
            Total Calorie: {totalCal.nutrients.ENERC_KCAL} KCAL
          </Typography>
        </Paper>
      </div>
      {console.log(foodsDetails)}
    </Paper>
  );
}
