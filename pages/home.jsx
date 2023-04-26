import React, { useEffect, useState } from "react";
import DrawerAppBar from "@/components/Dashboard";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "@/components/ProductCard";
import backend from "@/utils/axios";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const fetchProducts = async () => {
    console.log("hefefefef");
    try {
      const { data } = await backend.get("/product");

      setProducts(data.data);
    } catch (error) {
      console.log(error);

      setError(true);
    }
  };

  useEffect(() => {
    fetchProducts().then(console.log("hefefefef", products));
  }, []);

  const loading = () => {
    if (error) {
      return <Typography color="error">Something went wrong</Typography>;
    }
    if (products === null) {
      return <Typography color="blue">Loading....</Typography>;
    }
  };

  return (
    <>
      <DrawerAppBar />
      <Container maxWidth="lg">
        {loading()}
        {products !== null
          ? products.length !== 0 && (
              <Grid
                container
                spacing={2}
                // justifyContent="center"
                //   alignItems="center"
                //   direction="column"
              >
                {products.map(({ id, title, desc }) => {
                  return (
                    <Grid key={id} item xs={10} sm={4}>
                      <ProductCard title={title} desc={desc} id={id} />
                    </Grid>
                  );
                })}
              </Grid>
            )
          : null}
      </Container>
    </>
  );
};

export default Home;
