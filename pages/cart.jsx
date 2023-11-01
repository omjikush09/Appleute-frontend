import React, { useEffect, useState } from "react";
import DrawerAppBar from "@/components/Dashboard";
import { Container, Grid, Typography, Button } from "@mui/material";
import CartCard from "@/components/CartCard";
import backend from "@/utils/axios";
import { useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    creatingOrder: false,
    orderCreated: false,
  });

  const { creatingOrder, orderCreated } = values;

  useEffect(() => {
    const fetchProducts = async () => {
      const userId = localStorage.getItem("userId");
      const jwtToken = JSON.parse(localStorage.getItem("token"));
      if (!userId || !jwtToken) {
        router.push("/login");
        return;
      }

      try {
        const { data } = await backend.get(`/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        setProducts(data.data.products);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchProducts().then(console.log("hefefefef", products));
  }, [products, router]);

  const createOrder = async () => {
    console.log("createORder");
    const cartId = localStorage.getItem("cartId");
    const jwtToken = JSON.parse(localStorage.getItem("token"));
    if (!cartId || !jwtToken) {
      router.push("/login");
      return;
    }
    setValues({ ...values, orderCreated: false, creatingOrder: false });

    try {
      const { data } = await backend.post(
        `/order/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(data);
      setValues({ ...values, orderCreated: true, creatingOrder: false });

      setTimeout(() => {
        router.push("/order");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const loading = () => {
    if (error) {
      return <Typography color="error">Something went wrong</Typography>;
    }
    if (products === null) {
      return <Typography color="blue">Loading....</Typography>;
    }
  };
  const orderDetail = () => {
    if (creatingOrder) {
      return (
        <Typography color="error">Placing your order please wait</Typography>
      );
    }
    if (orderCreated) {
      return (
        <Typography color="blue">
          Order Created... redirecting you to order page
        </Typography>
      );
    }
  };

  return (
    <>
      <DrawerAppBar />
      <Container maxWidth="lg">
        <Typography color="error" align="center" variant="h3">
          Cart Items{" "}
        </Typography>
        {orderDetail()}
        {loading()}
        {products !== null && products !== undefined ? (
          products.length !== 0 ? (
            <>
              <Grid container spacing={2}>
                {products.map(({ id, title, desc }) => {
                  return (
                    <Grid key={id} item xs={10} sm={4}>
                      <CartCard title={title} desc={desc} id={id} />
                    </Grid>
                  );
                })}
              </Grid>

              <Grid
                container
                spacing={2}
                p={5}
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <Grid item xs={10} sm={4}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => createOrder()}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography color="blue" align="center">
              Cart is empty
            </Typography>
          )
        ) : null}
      </Container>
    </>
  );
};

export default Cart;
