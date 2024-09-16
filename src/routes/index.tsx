import { Navigate, useRoutes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home";
import { MyRouterObject } from "../modules";
import { Meals } from "../pages/meals";
import { Drinks } from "../pages/drinks";
import Favotites from "../pages/favorites";
import Detail from "../pages/detail";

export const routes: MyRouterObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "meals",
        element: <Meals />,
      },
      {
        path: "cocktails",
        element: <Drinks />,
      },
      {
        path: "favorites",
        element: <Favotites />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
    ],
  },
];

export const usehMap = (routes: MyRouterObject[]) => {
  return routes.map((route) => {
    return route;
  });
};

export const useMapRoutes = () => {
  return useRoutes(usehMap(routes));
};
