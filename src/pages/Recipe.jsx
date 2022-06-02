import { useState } from "react";
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
import { recipeAppId, recipeAccToken } from "./../apiConfig";
import axios from "axios";
import { Link } from "react-router-dom";
import bgImg from "./../assets/Recipe.jpg";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [options, setOptions] = useState([]);

  const saveRecipe = async () => {
    const jwt = localStorage.getItem("jwt");

    const res = await axios.post(
      "http://127.0.0.1:8000/api/user/save-recipe",
      {
        name: recipe.recipe.label,
        calorie: recipe.recipe.calories,
        image: recipe.recipe.image,
        nutrients: {
          CA: recipe.recipe.totalNutrients.CA.quantity,
          CHOCDF: recipe.recipe.totalNutrients.CHOCDF.quantity,
          CHOLE: recipe.recipe.totalNutrients.CHOLE.quantity,
          ENERC_KCAL: recipe.recipe.totalNutrients.ENERC_KCAL.quantity,
          FAT: recipe.recipe.totalNutrients.FAT.quantity,
          K: recipe.recipe.totalNutrients.K.quantity,
          MG: recipe.recipe.totalNutrients.MG.quantity,
          NA: recipe.recipe.totalNutrients.NA.quantity,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (res.status == "201") {
      alert("recipe saved");
      setRecipe("");
    }
  };

  return (
    <>
      <Paper
        sx={{
          padding: "1em",
          backgroundImage: `url(${bgImg})`,
          height: Object.keys(recipe).length ? "fit-content" : "inherit",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item md={7}>
            <Autocomplete
              options={options}
              onChange={(e, val) => {
                if (val) setRecipe(val);
                else setRecipe({});
              }}
              getOptionLabel={(option) => option.recipe.label}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ background: "#fff", borderRadius: "4px" }}
                  onChange={async (e) => {
                    const result = await axios.get(
                      `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${e.target.value}&app_id=${recipeAppId}&app_key=${recipeAccToken}`,
                      {
                        headers: {
                          Accept: "application/json",
                        },
                      }
                    );
                    setOptions(result.data.hits);
                  }}
                  label="Search recipe"
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" onClick={saveRecipe}>
              Save
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" component={Link} to="/saved-recipe">
              saved recipes
            </Button>
          </Grid>
        </Grid>
        {console.log(recipe)}
        {Object.keys(recipe).length && (
          <Card sx={{ margin: "1em auto", width: "80%", padding: "1em" }}>
            <CardMedia
              component="img"
              // height="300"
              width="fit-content"
              image={recipe.recipe.image}
              alt="green iguana"
              sx={{maxWidth: "500px", margin: "0 auto"}}
            />
            <Typography
              variant="h6"
              sx={{ margin: "0 auto 1em auto", width: "fit-content" }}
            >
              {recipe.recipe.label}
            </Typography>
            <Paper
              sx={{
                background: "#f6f6f6",
                padding: "1em",
                marginBottom: "1em",
                boxShadow: "none",
                textAlign: "center"
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  marginLeft: "1em",
                  display: "block",
                }}
                variant="h7"
              >
                Ingredients:
              </Typography>
              {recipe.recipe.ingredients.map((ingred) => (
                <Paper
                  sx={{
                    display: "inline-block",
                    width: "fit-content",
                    maxWidth: "210px",
                    textAlign: "center",
                    margin: "1em",
                    boxShadow: "none",
                    padding: "1em",
                  }}
                >
                  <img
                    src={ingred.image}
                    alt="food"
                    width="150"
                    style={{
                      margin: "0 auto",
                      display: "block",
                      marginBottom: "1em",
                    }}
                  />
                  <Typography variant="body2">Food: {ingred.food}</Typography>
                  <Typography variant="body2">
                    Quantity: {ingred.text}
                  </Typography>
                </Paper>
              ))}
            </Paper>
            <Typography variant="body2">
              Total Calorie: {recipe.recipe.calories}KCAL
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "block", fontWeight: 600 }}
            >
              Nutrients:{" "}
            </Typography>
            <Typography variant="body2">
              {recipe.recipe.totalNutrients.CA.label}:{" "}
              {recipe.recipe.totalNutrients.CA.quantity}mg{" "}
            </Typography>
            <Typography variant="body2">
              {recipe.recipe.totalNutrients["CHOCDF.net"].label}:{" "}
              {recipe.recipe.totalNutrients["CHOCDF.net"].quantity}g{" "}
            </Typography>
            <Typography variant="body2">
              {recipe.recipe.totalNutrients.CHOLE.label}:{" "}
              {recipe.recipe.totalNutrients.CHOLE.quantity}g{" "}
            </Typography>
            <Typography variant="body2">
              {recipe.recipe.totalNutrients.ENERC_KCAL.label}:{" "}
              {recipe.recipe.totalNutrients.ENERC_KCAL.quantity}KCAL{" "}
            </Typography>
            <Typography variant="body2">
              {recipe.recipe.totalNutrients.FAT.label}:{" "}
              {recipe.recipe.totalNutrients.FAT.quantity}g{" "}
            </Typography>
            <Typography variant="body2">
              {recipe.recipe.totalNutrients.K.label}:{" "}
              {recipe.recipe.totalNutrients.K.quantity}mg{" "}
            </Typography>
            <Typography variant="body2">
              {recipe.recipe.totalNutrients.MG.label}:{" "}
              {recipe.recipe.totalNutrients.MG.quantity}mg{" "}
            </Typography>
            <Typography variant="body2">
              {recipe.recipe.totalNutrients.NA.label}:{" "}
              {recipe.recipe.totalNutrients.NA.quantity}mg{" "}
            </Typography>
          </Card>
        )}
      </Paper>
    </>
  );
};

export default Recipe;
