import { Col } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useGetCoctailsQuery } from "../../store";
import { Cocktail, CocktailsResponse } from "../../store/apis/coctailApi";
import { ICardData2 } from "../../modules";
import XCard from "../../shared/components/XCard";

interface IProps {
  drinks?: Cocktail[] | undefined;
}
const DrinkCard: FC<IProps> = ({ drinks }) => {
  const [cardData, setCardData] = useState<any>([]);
  //   console.log("drinks", drinks);

  useEffect(() => {
    const data = drinks?.map((drink: Cocktail) => ({
      itemTitle: drink?.strDrink,
      itemThumb: drink?.strDrinkThumb,
      itemCategory: drink?.strCategory,
      itemIngredients: [
        drink?.strIngredient1,
        drink?.strIngredient2,
        drink?.strIngredient3,
      ].filter(Boolean),
      idMeal: drink?.idMeal,
    }));
    setCardData(data);
  }, [drinks]);
  return (
    <>
      {cardData?.map((drink:any) => (
        <XCard
        //   isLiked={isLiked}
        //   handleLike={handleLike}
          key={drink?.idDrink}
          data={drink}
        //   handleDetail={handleDetail}
        />
      ))}
    </>
  );
};

export default DrinkCard;
