import { useParams } from "react-router";
import { useEffect } from "react";
import {  useLazyGetMealDetailQuery } from "../../store/apis/mealsApi";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [getDetail, { data, isLoading, error }] = useLazyGetMealDetailQuery();

  const detailMeal = data?.meals;
  console.log("detailMeal", detailMeal);

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id, getDetail]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading meal details</div>;

  return (
    <div>
      {detailMeal ? (
        <div>
          <h1>{detailMeal[0].strMeal}</h1>
          <p>{detailMeal[0].strInstructions}</p>
          <img src={detailMeal[0].strMealThumb} alt={detailMeal[0].strMeal} />
        </div>
      ) : (
        <div>Meal details not found</div>
      )}
    </div>
  );
};

export default Detail;
