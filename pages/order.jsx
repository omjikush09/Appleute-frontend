import React, { useEffect, useState } from "react";
import DrawerAppBar from "@/components/Dashboard";
import { Container, Grid, Typography } from "@mui/material";
import OrderCard from "@/components/OrderCard";
import backend from "@/utils/axios";
import { useRouter } from "next/router";

const Order = () => {
  const router = useRouter();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(false);
  const fetchProducts = async () => {
    const userId = localStorage.getItem("userId");
    const jwtToken = JSON.parse(localStorage.getItem("token"));
    if (!userId || !jwtToken) {
      router.push("/login");
      return;
    }
    try {
      console.log("hefefefef api...");
      const { data } = await backend.get(`/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(data);
      setOrders(data.data);
    } catch (error) {
      console.log(error);

      setError(true);
    }
  };

  useEffect(() => {
    fetchProducts().then(console.log("orders", orders));
  }, []);

  const loading = () => {
    if (error) {
      return <Typography color="error">Something went wrong</Typography>;
    }
    if (orders === null) {
      return <Typography color="blue">Loading....</Typography>;
    }
  };

  return (
    <>
      <DrawerAppBar />
      <Container maxWidth="lg">
        {loading()}
        {orders !== null ? (
          orders.length !== 0 ? (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              {orders.map(({ id, products }) => {
                return (
                  <Grid key={id} item xs={10} sm={4}>
                    <OrderCard numberOfProduct={products.length} id={id} />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography color="blue" align="center">
              You have Zero Order start shopping now....
            </Typography>
          )
        ) : null}
      </Container>
    </>
  );
};

export default Order;
