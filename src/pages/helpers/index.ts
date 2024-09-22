import { IFavoriteData } from "../../modules";

export const filteredResponseData = <T = any>(
  ids: string[],
  num: number,
  data: T[]
) => {
  const countMap = ids.reduce(
    (acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const countedData = Object.keys(countMap).filter(
    (id) => countMap[id] === num
  );
  console.log("countedData", countedData);
  console.log("countMap", countMap);
  return countedData.map((id: any) => data.find((item: any) => item.id === id));
};

export const delay = async (ms: number) => {
  let timeOutId = null;
  if (timeOutId) {
    clearTimeout(timeOutId);
  }
  return new Promise((resolve) => {
    timeOutId = setTimeout(() => resolve(ms), ms);
  });
};

export const uniqueIds = (ids: string[]): string[] => {
  return [...new Set<string>(ids)];
};

interface IFetchDataArg {
  data: any;
  trigger: any;
  key: string;
}
type TFetchDataFn = ({ data, trigger, key }: IFetchDataArg) => Promise<any>;

export const fetchData: TFetchDataFn = async ({ data, trigger, key }) => {
  const dataPromises = data?.map((item: any) => {
    return trigger(item, true);
  });
  const responses = await Promise.all(dataPromises ?? []);

  const dataResponse = responses?.flatMap(
    (mealObj: any) => mealObj?.data?.[key] || []
  );

  return dataResponse;
};

export const transformCardData = <T = any>(
  data: T[],
  key: "meal" | "drink",
  storedFavorites: any
): IFavoriteData[] => {
  if (key === "meal") {
    return data?.map((meal: T | any) => ({
      itemTitle: meal?.strMeal,
      itemThumb: meal?.strMealThumb,
      itemCategory: meal?.strCategory,
      itemIngredients: [
        meal?.strIngredient1,
        meal?.strIngredient2,
        meal?.strIngredient3,
      ].filter(Boolean),
      id: meal?.idMeal,
      isLiked: !!JSON.parse(storedFavorites!)?.find(
        (favorie: any) => favorie?.id === meal?.idMeal
      ),
      key,
    }));
  } else {
    return data?.map((drink: T | any) => ({
      itemTitle: drink?.strDrink,
      itemThumb: drink?.strDrinkThumb,
      itemCategory: drink?.strCategory,
      itemIngredients: [
        drink?.strIngredient1,
        drink?.strIngredient2,
        drink?.strIngredient3,
      ].filter(Boolean),
      id: drink?.idDrink,
      isLiked: !!JSON.parse(storedFavorites!)?.find(
        (favorie: any) => favorie?.id === drink?.idDrink
      ),
      key,
    }));
  }
};
