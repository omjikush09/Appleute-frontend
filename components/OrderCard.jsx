import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CartCard({ numberOfProduct, id }) {
  return (
    <Card sx={{ maxWidth: 800, minWidth: 600 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image="https://images.pexels.com/photos/4033324/pexels-photo-4033324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Order Id is - {id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of Products is- {numberOfProduct}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
