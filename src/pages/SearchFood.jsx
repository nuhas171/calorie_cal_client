import { apiKey, appId } from "./../apiConfig";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  Paper,
  TextField,
  Grid,
  Typography,
  CardContent,
  CardMedia,
  Card,
} from "@mui/material";
import bgImg from "./../assets/searchFood.jpg"

const SearchFood = () => {
  const [searchText, setSearch] = useState("");
  const [foodDetails, setFoodDetails] = useState({});

  const searchFood = async () => {
    console.log(searchText);
    const res = await axios.get(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${apiKey}&ingr=${searchText}&nutrition-type=cooking`
    );

    setFoodDetails(res.data.hints[0].food);
  };

  return (
    <Paper sx={{ padding: "1em", backgroundImage: `url(${bgImg})`, height: "inherit" }}>
      {console.log(foodDetails)}
      <Grid container justifyContent="space-between">
        <Grid item md={9}>
          <TextField
            label="Search Food"
            value={searchText}
            
            sx={{background: "#fff", borderRadius: "4px"}}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item md={2}>
          <Button variant="contained" onClick={searchFood}>
            Search
          </Button>
        </Grid>
      </Grid>
      {Object.keys(foodDetails).length && (
        <Card sx={{ margin: "1em auto", width: "35%" }}>
          <CardMedia
            component="img"
            height="140"
            image={foodDetails.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {foodDetails.label}
            </Typography>
              <Typography variant="body2">
                Energy: {foodDetails.nutrients.ENERC_KCAL}KCAL
              </Typography>
              <Typography variant="body2">
                FAT: {foodDetails.nutrients.FAT}
              </Typography>
              <Typography variant="body2">
                Protin: {foodDetails.nutrients.PROCNT}
              </Typography>
              <Typography variant="body2">
                Fiber: {foodDetails.nutrients.FIBTG}
              </Typography>
              <Typography variant="body2">
              Carbohydrate: {foodDetails.nutrients.CHOCDF}
              </Typography>
          </CardContent>
        </Card>
      )}
    </Paper>
  );
};

export default SearchFood;
