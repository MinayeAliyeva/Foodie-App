import { RouteObject } from "react-router";

export type MyRouterObject = RouteObject;
export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
  }
  export interface MealsResponse {
    meals: Meal[];
  }
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
  