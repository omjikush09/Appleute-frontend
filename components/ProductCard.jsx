import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import backend from "@/utils/axios";

export default function ProductCard({ title, desc, id }) {
  const router = useRouter();
  const addToCart = async () => {
    const cartId = localStorage.getItem("cartId");
    const jwtToken = JSON.parse(localStorage.getItem("token"));
    if (!cartId || !jwtToken) {
      router.push("/login");
      return;
    }
    try {
      const data = await backend.post(
        `/cart/${cartId}`,
        {
          product: id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.pexels.com/photos/4033324/pexels-photo-4033324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={() => addToCart()}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
