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
  drinks?: Cocktail[];
}
const enum url {
  BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/",
  SEARCH_BY_URL = "search.php?s",
  DETAIL_URL = "lookup.php?",
  CATAGORIE_URL = "list.php?c=list",
  GLASES_URL = "list.php?g=list",
  FILTER_URL = "filter.php?",
}
const cocktailsApi = createApi({
  reducerPath: "cocktails",
  baseQuery: fetchBaseQuery({
    baseUrl: url?.BASE_URL,
  }),
  endpoints: (builder) => ({
    getCoctails: builder.query<CocktailsResponse, string | void>({
      query: () => ({
        url: url?.SEARCH_BY_URL,
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
    getCoctailCatagorieList: builder.query<any, void>({
      query: () => ({
        url: url?.CATAGORIE_URL,
      }),
    }),
    getCoctailByCatagory: builder.query<any, void>({
      query: (catagory) => ({
        url: url?.FILTER_URL,
        params: {
          c: catagory,
        },
      }),
    }),
    getCoctailGlasesList: builder.query<any, void>({
      query: () => ({
        url: url?.GLASES_URL,
      }),
    }),
    getCoctailByGlases: builder.query<any, void>({
      query: (glass) => ({
        url: url?.GLASES_URL,
        params: {
          g: glass,
        },
      }),
    }),
  }),
});
export const {
  useGetCoctailsQuery,
  useLazyGetCoctailsQuery,
  useLazyGetCoctailDetailQuery,
  useGetCoctailCatagorieListQuery,
  useLazyGetCoctailByCatagoryQuery,
  useGetCoctailGlasesListQuery,
} = cocktailsApi;
export default cocktailsApi;
