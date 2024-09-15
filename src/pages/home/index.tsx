import React from "react";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { ICardData } from "../../modules";
import meatImage from "../../assets/images/meat.jpg";
import cocktailImage from "../../assets/images/cocktail.jpg";
import { FaArrowUp } from "react-icons/fa";
import XContainer from "../../shared/components/XContainer";
import XCard from "../../shared/components/XCard";
import { XMealSlider } from "../../shared/components/XMealSlider";
import { XCocktailSlider } from "../../shared/components/XCocktailSlider";

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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <XContainer>
      <Flex gap="30px" justifyContent="center" mb="40px">
        {cardData.map((card) => (
          <XCard
            key={card.title}
            title={card.title}
            content={card.content}
            btnContent={card.buttonContent}
            image={card.image}
            to={card.to}
          />
        ))}
      </Flex>

      <Text fontWeight="bold" fontSize="2xl" mb="20px">
        SICAK LEZZETLER
      </Text>
      <XMealSlider />

      <Divider my="40px" />

      <Text fontWeight="bold" fontSize="2xl" mb="20px">
        İÇECEKLER
      </Text>
      <XCocktailSlider />

      <Flex
        position="fixed"
        bottom="20px"
        right="20px"
        justify="center"
        align="center"
        backgroundColor="red"
        borderRadius="50%"
        p="10px"
        boxShadow="md"
        cursor="pointer"
        zIndex="9999"
        onClick={scrollToTop}
        transition="transform 0.3s ease"
        _hover={{ transform: "scale(1.1)" }}
      >
        <FaArrowUp color="white" fontSize="24px" />
      </Flex>
    </XContainer>
  );
};

export default Home;
