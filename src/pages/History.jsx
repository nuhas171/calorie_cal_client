import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

const typoStyle = {
  display: "inline-block",
  border: "1px solid",
  padding: "1em",
  margin: "1em",
  borderRadius: "12px"
}

const History = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios.get("http://127.0.0.1:8000/api/user/activity", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(response => setActivities(response.data.data))
    }
  }, []);

  return (
    <div style={{ 
      padding: "2em"
    }}>
      {
        activities.map(activity => (
          <Card key={activity._id} style={{margin: "1em"}}>
            <CardContent style={{ paddingBottom: 0}}>
              <Typography variant="h5">
                Calorie Statistics Of {activity.name}
              </Typography>
              <Typography variant="body2" style={typoStyle}>
                Weight: {activity.weight} KG.
              </Typography>
              <Typography variant="body2" style={typoStyle}>
                Age: {activity.age} Years
              </Typography>
              <Typography variant="body2" style={typoStyle}>
                Height: {activity.height}"
              </Typography>
              <Typography variant="body2" style={typoStyle}>
                Gender: {activity.gender}
              </Typography>
              <Typography variant="body2" style={typoStyle}>
                Activity: {activity.activity}
              </Typography>
              <Typography variant="body2" style={typoStyle}>
                Total Calorie needed: {activity.total}
              </Typography>
            </CardContent>
          </Card>
        ))
      }
    </div>
  );
};

export default History;
