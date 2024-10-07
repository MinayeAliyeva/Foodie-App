import { FC, useCallback, useEffect, useState } from "react";
import { IDrink, IFavoriteData } from "../../modules";
import { useNavigate } from "react-router";
import XCard from "./XCard";

interface IProps {
  dataList: IFavoriteData[];
}
const CustomCard: FC<IProps> = ({ dataList }) => {
  const [cardData, setCardData] = useState<IFavoriteData[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    setCardData(dataList);
  }, [dataList]);
  const handleDetail = (id?: string, key?: "meal" | "drink") => {
    if (key === "meal") {
      navigate(`/meal-detail/${id}`);
    } else {
      navigate(`/coctail-detail/${id}`);
    }
  };

  const handleLike = useCallback(
    (idDrink: string) => {
      const filteredCardData = cardData?.find((drink) => drink?.id === idDrink);
      const mapedCardData = cardData?.map?.((data) =>
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
    },
    [cardData]
  );
  return (
    <>
      {cardData?.map((data: any) => (
        <XCard
          isLiked={isLiked}
          handleLike={handleLike}
          key={data?.id}
          data={data}
          handleDetail={handleDetail}
        />
      ))}
    </>
  );
};

export default CustomCard;
