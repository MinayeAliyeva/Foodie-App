import React, { FC, useEffect, useState } from "react";
import { ICardData2, IMeal, Meal } from "../../modules";
import XCard from "../../shared/components/XCard";
import { useNavigate } from "react-router";
interface IProps {
  meals: Meal[];
}

const MealCard: FC<IProps> = ({ meals }) => {
  const [cardData, setCardData] = useState<ICardData2[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const storedFavorites = localStorage.getItem("likes");
  const navigate = useNavigate();
  useEffect(() => {
    const data: ICardData2[] = meals?.map((meal: Meal) => ({
      itemTitle: meal?.strMeal,
      itemThumb: meal?.strMealThumb,
      itemCategory: meal?.strCategory,
      itemIngredients: [
        meal?.strIngredient1,
        meal?.strIngredient2,
        meal?.strIngredient3,
      ].filter(Boolean),
      idMeal: meal?.idMeal,
      isLiked: !!JSON.parse(storedFavorites!)?.find(
        (favorie: any) => favorie?.idMeal === meal?.idMeal
      ),
    }));
    setCardData(data);
  }, [meals]);

  const handleDetail = (id: string | undefined) => {
    if (id) {
      console.log("Detail for ID:", id);
      navigate(`/detail/${id}`);
    }
  };

  const handleLike = (idMeal: string) => {
    const filteredCardData = cardData?.find((meal) => meal?.idMeal === idMeal);

    const mapedCardData = cardData.map((data) =>
      data?.idMeal === filteredCardData?.idMeal
        ? { ...data, isLiked: !data?.isLiked }
        : data
    );

    setCardData(mapedCardData);
    console.log("mapedCardData", mapedCardData);

    if (!filteredCardData) {
      return;
    }

    const currentLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    const itemString = JSON.stringify({ ...filteredCardData, isLiked: true });

    const isItemLiked = currentLikes.some(
      (item: ICardData2) => JSON.stringify(item) === itemString
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
          key={meal?.idMeal}
          data={meal}
          handleDetail={handleDetail}
        />
      ))}
    </>
  );
};

export default MealCard;

///favorites

// useEffect(() => {
//   const likedItems = JSON.parse(localStorage.getItem("likes") || "[]");
//   const currentItem = meal || drink;
//   if (currentItem) {
//     const itemString = JSON.stringify(currentItem);
//     const liked = likedItems.some(
//       (item: IMeal | IDrink) => JSON.stringify(item) === itemString
//     );
//     setIsLiked(liked);
//   }
// }, [meal, drink]);

// const handleLike = () => {
//   const currentItem = meal || drink;
//   if (!currentItem) return;
//   const currentLikes = JSON.parse(localStorage.getItem("likes") || "[]");
//   const itemString = JSON.stringify(currentItem);
//   const isItemLiked = currentLikes.some(
//     (item: IMeal | IDrink) => JSON.stringify(item) === itemString
//   );
//   const updatedLikes = isItemLiked
//     ? currentLikes.filter(
//         (item: IMeal | IDrink) => JSON.stringify(item) !== itemString
//       )
//     : [...currentLikes, currentItem];
//   localStorage.setItem("likes", JSON.stringify(updatedLikes));
//   setIsLiked(!isItemLiked);
// };
