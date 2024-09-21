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
  return countedData.map((id: any) =>
    data.find((meal: any) => meal.idMeal === id || meal.idDrink === id)
  );
};

export const delay = async (ms: number) => {
  let timeOutId = null;
  if(timeOutId){
    clearTimeout(timeOutId);
  }
  return new Promise((resolve) => {
    timeOutId = setTimeout(() => resolve(ms), ms);
  });
};
