import { FC, useEffect, useState } from "react";
import { Cocktail } from "../../store/apis/coctailApi";
import { IDrink, IFavoriteData } from "../../modules";
import XCard from "../../shared/components/XCard";
import { useNavigate } from "react-router";

interface IProps {
  drinks?: Cocktail[];
}
const DrinkCard: FC<IProps> = ({ drinks }) => {
  const storedFavorites = localStorage.getItem("likes");
  const [cardData, setCardData] = useState<IFavoriteData[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleDetail = (id?: string) => {
    if (id) {
      navigate(`/coctail-detail/${id}`);
    }
  };
  useEffect(() => {
    const data:IFavoriteData[] = drinks?.map((drink: Cocktail) => ({
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
      key: 'drink'
    })) as IFavoriteData[];
    setCardData(data);
  }, [drinks]);
  const handleLike = (idDrink: string) => {
    const filteredCardData = cardData?.find((drink) => drink?.id === idDrink);

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
          (item: IDrink) => JSON.stringify(item) !== itemString
        )
      : [...currentLikes, { ...filteredCardData, isLiked: true }];

    localStorage.setItem("likes", JSON.stringify(updatedLikes));

    setIsLiked(!isItemLiked);
  };
  return (
    <>
      {cardData?.map((drink: any) => (
        <XCard
          isLiked={isLiked}
          handleLike={handleLike}
          key={drink?.idDrink}
          data={drink}
          handleDetail={handleDetail}
        />
      ))}
    </>
  );
};

export default DrinkCard;
