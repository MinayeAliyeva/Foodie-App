import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MealsResponse } from "../../modules";

const mealsApi = createApi({
  reducerPath: "meals",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    fetchMeals: builder.query<MealsResponse, void>({
      query: () => `search.php?s=`,
    }),
  }),
});

export const { useFetchMealsQuery } = mealsApi;
export default mealsApi;
