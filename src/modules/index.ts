import { RouteObject } from "react-router";

export type MyRouterObject = RouteObject;

export interface ICardData {
  [key: string]: string;
}

export interface IMeal {
  meal: { idMeal: string; strMeal: string; strMealThumb: string };
}
export interface IDrink {
  drink: { idDrink: string; strDrink: string; strDrinkThumb: string };
}
