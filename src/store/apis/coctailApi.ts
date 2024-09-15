import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

const cocktailsApi = createApi({
  reducerPath: "cocktails",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    fetchCocktails: builder.query<CocktailsResponse, void>({
      query: () => `search.php?s=`,
    }),
  }),
});

export const { useFetchCocktailsQuery } = cocktailsApi;
export default cocktailsApi;
