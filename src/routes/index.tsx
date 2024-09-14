import { Navigate, useRoutes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home";
import { MyRouterObject } from "../modules";

export const routes:MyRouterObject[] = [
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
  