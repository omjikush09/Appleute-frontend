import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);
  return <></>;
}

export default Home;
