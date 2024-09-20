import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../node_modules/react-slick/dist/react-slick";
import { useMapRoutes } from "./routes";

function App() {
  const myRoute = useMapRoutes();
  throw new Error();
  return (
    <>
      <>{myRoute}</>
    </>
  );
}

export default App;
