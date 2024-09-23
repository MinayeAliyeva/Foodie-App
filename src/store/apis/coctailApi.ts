import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRandomCocktailResponse } from "../../modules";
export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: string;
}
export interface CocktailsResponse {
  drinks?: Cocktail[];
}
const enum url {
  BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/",
  SEARCH_BY_URL = "search.php?s",
  DETAIL_URL = "lookup.php?",
  CATAGORIE_URL = "list.php?c=list",
  GLASES_URL = "list.php?g=list",
  INGREDIENTS_URL = "list.php?i=list",
  FILTER_URL = "filter.php?",
  RANDOM_URL = "random.php",
}
const cocktailsApi = createApi({
  reducerPath: "cocktails",
  baseQuery: fetchBaseQuery({
    baseUrl: url?.BASE_URL,
  }),
  endpoints: (builder) => ({
    getCoctails: builder.query<CocktailsResponse, string | void>({
      query: (catagory) => ({
        url: url?.SEARCH_BY_URL,
        params: {
          s: catagory,
        },
      }),
      keepUnusedDataFor: 60,
    }),
    getCoctailDetail: builder.query<CocktailsResponse, string | void>({
      query: (detailId) => ({
        url: url?.DETAIL_URL,
        params: {
          i: detailId,
        },
      }),
    }),
    getCoctailCatagorieList: builder.query<CocktailsResponse, void>({
      query: () => ({
        url: url?.CATAGORIE_URL,
      }),
    }),
    getCoctailByCatagory: builder.query<CocktailsResponse, string | void>({
      query: (catagory) => ({
        url: url?.FILTER_URL,
        params: {
          c: catagory,
        },
      }),
    }),
    getCoctailGlasesList: builder.query<CocktailsResponse, void>({
      query: () => ({
        url: url?.GLASES_URL,
      }),
    }),
    getCoctailByGlases: builder.query<CocktailsResponse, void>({
      query: (glass) => ({
        url: url?.FILTER_URL,
        params: {
          g: glass,
        },
      }),
    }),
    getCoctailIngredientsList: builder.query<CocktailsResponse, void>({
      query: () => ({
        url: url?.INGREDIENTS_URL,
      }),
    }),
    getCoctailByIngredients: builder.query<CocktailsResponse, void>({
      query: (ingredient) => ({
        url: url?.FILTER_URL,
        params: {
          i: ingredient,
        },
      }),
    }),
    getRandomcocktail: builder.query<IRandomCocktailResponse, void>({
      query: () => ({
        url: url?.RANDOM_URL,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});
export const {
  useGetCoctailsQuery,
  useLazyGetCoctailsQuery,
  useLazyGetCoctailDetailQuery,
  useGetCoctailCatagorieListQuery,
  useLazyGetCoctailByCatagoryQuery,
  useGetCoctailByCatagoryQuery,
  useGetCoctailGlasesListQuery,
  useLazyGetCoctailByGlasesQuery,
  useGetCoctailIngredientsListQuery,
  useLazyGetCoctailByIngredientsQuery,
  useLazyGetRandomcocktailQuery,

} = cocktailsApi;
export default cocktailsApi;
