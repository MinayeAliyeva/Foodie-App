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

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/";
const SEARCH_BY_URL = "search.php";

const cocktailsApi = createApi({
  reducerPath: "cocktails",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getCoctails: builder.query<CocktailsResponse, string | void>({
      query: (category = "") => ({
        url: SEARCH_BY_URL,
        params: {
          s: category,
        },
      }),
      keepUnusedDataFor: 60,
    }),
    getRandomCoctailQuery: builder.query<any, string | void>({
      query: () => `random.php`,
    }),
  }),
});
export const { useGetCoctailsQuery, useLazyGetRandomCoctailQueryQuery } =
  cocktailsApi;
export default cocktailsApi;
