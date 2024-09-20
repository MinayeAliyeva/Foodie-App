import React, { FC, useEffect, useState } from "react";
import { IFavoriteData, IMeal, Meal } from "../../modules";
import XCard from "../../shared/components/XCard";
import { useNavigate } from "react-router";
interface IProps {
  meals: Meal[];
}

const MealCard: FC<IProps> = ({ meals }) => {
  const storedFavorites = localStorage.getItem("likes");
  const [cardData, setCardData] = useState<IFavoriteData[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const data: IFavoriteData[] = meals?.map((meal: Meal) => ({
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
    }));
    setCardData(data);
  }, [meals]);

  const handleDetail = (id: string | undefined) => {
    if (id) {
      navigate(`/meal-detail/${id}`);
    }
  };

  const handleLike = (idMeal: string) => {
    const filteredCardData = cardData?.find((meal) => meal?.id === idMeal);

    const mapedCardData = cardData.map((data) =>
      data?.id === filteredCardData?.id
        ? { ...data, isLiked: !data?.isLiked }
        : data
    );

    setCardData(mapedCardData);

    if (!filteredCardData) {
      return;
    }

    const currentLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    const itemString = JSON.stringify({ ...filteredCardData, isLiked: true });

    const isItemLiked = currentLikes.some(
      (item: IFavoriteData) => JSON.stringify(item) === itemString
    );
    const updatedLikes = isItemLiked
      ? currentLikes.filter(
          (item: IMeal) => JSON.stringify(item) !== itemString
        )
      : [...currentLikes, { ...filteredCardData, isLiked: true }];

    localStorage.setItem("likes", JSON.stringify(updatedLikes));

    setIsLiked(!isItemLiked);
  };

  return (
    <>
      {cardData?.map((meal) => (
        <XCard
          isLiked={isLiked}
          handleLike={handleLike}
          key={meal?.id}
          data={meal}
          handleDetail={handleDetail}
        />
      ))}
    </>
  );
};

export default MealCard;

