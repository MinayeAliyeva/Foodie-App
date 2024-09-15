import { RouteObject } from "react-router";

export type MyRouterObject = RouteObject;

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: any;
}

export interface CocktailsResponse {
  drinks: Cocktail[];
}

export interface ICardData {
  [key: string]: string;
}
