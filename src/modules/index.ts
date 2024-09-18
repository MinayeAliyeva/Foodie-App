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

export interface IMealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface IMealCategories {
  categories: IMealCategory[];
}

export interface IMealDetail {
  meals: Meal[];
}
export interface IMealIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string | null;
}
export interface IMealsIngredients {
  meals?: IMealIngredient[];
}
export interface IRandomMeal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
}