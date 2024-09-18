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
const enum url {
  BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/",
  SEARCH_BY_URL = "search.php",
  DETAIL_URL = "lookup.php?",
}

const cocktailsApi = createApi({
  reducerPath: "cocktails",
  baseQuery: fetchBaseQuery({
    baseUrl: url?.BASE_URL,
  }),
  endpoints: (builder) => ({
    getCoctails: builder.query<CocktailsResponse, string | void>({
      query: (category = "") => ({
        url: url?.SEARCH_BY_URL,
        params: {
          s: category,
        },
      }),
      keepUnusedDataFor: 60,
    }),
    getCoctailDetail: builder.query<any, string | void>({
      query: (detailId) => ({
        url: url?.DETAIL_URL,
        params: {
          i: detailId,
        },
      }),
    }),
  }),
});
export const { useGetCoctailsQuery, useLazyGetCoctailDetailQuery } = cocktailsApi;
export default cocktailsApi;
