import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import mealsApi from "./apis/mealsApi";
import cocktailsApi from "./apis/coctailApi";
export const store = configureStore({
  reducer: {
    [mealsApi.reducerPath]: mealsApi.reducer,
    [cocktailsApi.reducerPath]: cocktailsApi.reducer,
  },
  middleware: (getDefaultMidleware) => {
    return getDefaultMidleware()
      .concat(mealsApi.middleware)
      .concat(cocktailsApi.middleware);
  },
});

setupListeners(store.dispatch);
export { useGetMealsQuery } from "./apis/mealsApi";
export { useGetCoctailsQuery } from "./apis/coctailApi";
