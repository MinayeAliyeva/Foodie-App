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
  [key: string]: string;
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
interface IMealIngredients {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
export interface IMealsIngredients {
  meals: Array<IMealIngredients>;
}

export interface IRandomMeal {
  meals: {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
  }[];
}

export interface IMealDatainterface {
  idMeal?: string;
  strMeal?: string;
  strDrinkAlternate?: string | null;
  strCategory?: string;
  strArea?: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
}

export interface IRandomCocktail {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string;
  strInstructionsDE: string;
  strInstructionsFR: string | null;
  strInstructionsIT: string;
}
export interface IRandomCocktailResponse {
  drinks: IRandomCocktail[];
}
export interface IFavoriteData {
  itemTitle: string;
  itemThumb: string;
  itemCategory: string;
  itemIngredients: string[];
  id: string;
  isLiked?: boolean;
  key?: "meal" | "drink";
}
export interface IAllCocktail {
  catagories: IFavoriteData[];
  glasses: IFavoriteData[];
  ingredients: IFavoriteData[];
}
