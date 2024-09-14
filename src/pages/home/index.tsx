import React from "react";
import XContainer from "../../components/XContainer";
import XCard from "../../components/XCard";
import { Divider, Flex } from "@chakra-ui/react";
import { ICardData } from "../../modules";
import { Text } from "@chakra-ui/react";
import meatImage from "../../assets/images/meat.jpg";
import cocktailImage from "../../assets/images/cocktail.jpg";
import { XMealSlider } from "../../components/XMealSlider";
import { XCocktailSlider } from "../../components/XCocktailSlider";

const cardData: ICardData[] = [
  {
    title: "EN LEZZETLİ YEMEKLERİMİZ",
    content:
      "En taze malzemelerle hazırlanan özel yemeklerimizi keşfedin ve damak tadınıza hitap eden eşsiz lezzetlerin tadını çıkarın.",
    buttonContent: "Menüyü İncele",
    image: meatImage,
    to: "/meals",
  },
  {
    title: "EN SERİNLETİCİ İÇECEKLERİMİZ",
    content:
      "Taze meyve ve doğal malzemelerle hazırlanan kokteyllerimizle, serinletici ve ferahlatıcı bir deneyim sizi bekliyor. İçeceklerimizin her yudumunda tazeliği hissedin.",
    buttonContent: "Menüyü İncele",
    image: cocktailImage,
    to: "/drinks",
  },
];

const Home = () => {
  return (
    <>
      <XContainer>
        <Flex gap="30px" justifyContent="center">
          {cardData.map((cardContent) => (
            <XCard
              key={cardContent.title}
              title={cardContent.title}
              content={cardContent.content}
              btnContent={cardContent.buttonContent}
              image={cardContent.image}
              to={cardContent.to}
            />
          ))}
        </Flex>
        <Text fontWeight="bold">SICAK LEZZETLER</Text>
        <XMealSlider />
        <Divider />
        <Text fontWeight="bold">ICECEKLER</Text>
        <XCocktailSlider />
      </XContainer>
    </>
  );
};

export default Home;
