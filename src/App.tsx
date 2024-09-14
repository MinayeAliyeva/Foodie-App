import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../node_modules/react-slick/dist/react-slick";
import XContainer from "./components/XContainer";
import { useMapRoutes } from "./routes";
import { Box, Flex } from "@chakra-ui/react";

function App() {
  const myRoute = useMapRoutes();
  return (
    <>
      <>{myRoute}</>
    </>
  );
}

export default App;
