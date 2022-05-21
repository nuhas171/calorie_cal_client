import { useState, useEffect } from "react";
import {
  Paper,
  Autocomplete,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from 'react-router-dom';

const SavedRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    axios.get("http://127.0.0.1:8000/api/user/get-recipe", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then(res => setRecipes(res.data.data))
  }, []);

  return (
    <div style={{display: "flex", flexFlow: "row wrap", gap: "2em"}}>
      {recipes.map((recipe) => (
        <Card sx={{ margin: "1em 0" }}>
          <CardMedia
            component="img"
            height="300"
            width="150"
            image={recipe.image}
            alt="green iguana"
          />
          <Typography variant="h6">{recipe.name}</Typography>
          <Typography variant="body2">
            Total Calorie: {recipe.calorie}KCAL
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "block", fontWeight: 600 }}
          >
            Nutrients:{" "}
          </Typography>
          <Typography variant="body2">
          Calcium:{" "}
            {recipe.nutrients.CA}mg{" "}
          </Typography>
          <Typography variant="body2">
          Cholesterol:{" "}
            {recipe.nutrients.CHOLE}g{" "}
          </Typography>
          <Typography variant="body2">
          Energy:{" "}
            {recipe.nutrients.ENERC_KCAL}KCAL{" "}
          </Typography>
          <Typography variant="body2">
          Fat:{" "}
            {recipe.nutrients.FAT}g{" "}
          </Typography>
          <Typography variant="body2">
          Potassium:{" "}
            {recipe.nutrients.K}mg{" "}
          </Typography>
          <Typography variant="body2">
          Magnesium:{" "}
            {recipe.nutrients.MG}mg{" "}
          </Typography>
          <Typography variant="body2">
          Sodium:{" "}
            {recipe.nutrients.NA}mg{" "}
          </Typography>
        </Card>
      ))}
    </div>
  );
};

export default SavedRecipe
