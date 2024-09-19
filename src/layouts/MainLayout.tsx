import React from "react";
import Header from "./header";
import { Outlet } from "react-router";
import Footer from "./footer";
import XContainer from "../shared/components/XContainer";
 
const MainLayout = () => {
  return (
    <>
      <Header />
      <XContainer minHeight={"100vh"}>
        <Outlet  />
      </XContainer>
      <Footer />
    </>
  );
};

export default MainLayout;
