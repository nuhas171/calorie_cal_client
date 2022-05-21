import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Card, CardMedia, CardContent, Paper } from "@mui/material";

const MyFoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/my-foods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        setFoods(res.data.data);
      });
  }, []);

  return (
    <div>
      {foods.map((food) => (
        <Accordion sx={{ margin: "1em" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{food.day}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Accordion sx={{ margin: "1em" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Breakfast</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  gap: "2em",
                  "& .MuiPaper-root": { boxShadow: "none" },
                }}
              >
                {food.breakfast.map((f) => (
                  <Card>
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
                          FAT: {f.nutrients.FAT}
                        </Typography>
                        <Typography variant="body2">
                          FAT: {f.nutrients.PROCNT}
                        </Typography>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ margin: "1em" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Lunch</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  gap: "2em",
                  "& .MuiPaper-root": { boxShadow: "none" },
                }}
              >
                {food.lunch.map((f) => (
                  <Card>
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
                          FAT: {f.nutrients.FAT}
                        </Typography>
                        <Typography variant="body2">
                          FAT: {f.nutrients.PROCNT}
                        </Typography>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ margin: "1em" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Dinner</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  gap: "2em",
                  "& .MuiPaper-root": { boxShadow: "none" },
                }}
              >
                {food.dinner.map((f) => (
                  <Card>
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
                          FAT: {f.nutrients.FAT}
                        </Typography>
                        <Typography variant="body2">
                          FAT: {f.nutrients.PROCNT}
                        </Typography>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ margin: "1em" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Snacks</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  gap: "2em",
                  "& .MuiPaper-root": { boxShadow: "none" },
                }}
              >
                {food.others.map((f) => (
                  <Card>
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
                          FAT: {f.nutrients.FAT}
                        </Typography>
                        <Typography variant="body2">
                          FAT: {f.nutrients.PROCNT}
                        </Typography>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MyFoodList;
