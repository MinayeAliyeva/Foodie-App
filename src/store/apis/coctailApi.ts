import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CocktailsResponse } from "../../modules";

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
