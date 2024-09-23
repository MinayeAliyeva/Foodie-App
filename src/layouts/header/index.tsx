import { Flex, Link, Text } from "@chakra-ui/react";
import logo from "../../assets/images/logo.png";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import XContainer from "../../shared/components/XContainer";

const Header = () => {
  return (
    <>
      <XContainer bg="#40403F">
        <Flex justify="space-between">
          <Flex justify="space-between" align="center" gap="50px">
            <Flex align="center" gap="10px" fontWeight="bold" cursor="pointer">
              <FaPhoneAlt fontSize="xs" color="#fff" />
              <Link
                href="tel:+1234567890"
                fontSize="xs"
                _hover={{ textDecoration: "none" }}
                color="#fff"
              >
                +1 (234) 567-890
              </Link>
            </Flex>
            <Flex align="center" gap="10px" fontWeight="bold" cursor="pointer">
              <IoMdMail fontSize="xs" color="#fff" />
              <Link
                href="mailto:foodie@mail.com"
                fontSize="xs"
                _hover={{ textDecoration: "none" }}
                color="#fff"
              >
                example@example.com
              </Link>
            </Flex>
            <Flex align="center" gap="10px" fontWeight="bold" cursor="pointer">
              <FaLocationDot fontSize="xs" color="#fff" />
              <Link
                href="https://www.google.com/maps?q=40.730610,-73.935242"
                fontSize="xs"
                _hover={{ textDecoration: "none" }}
                isExternal
                color="#fff"
              >
                Baku ,Sahil 5km
              </Link>
            </Flex>
          </Flex>
          <Flex justify="space-around" align="center" gap="30px">
            <Text fontSize="xs" color="#fff" fontWeight="bold">
              Az{" "}
            </Text>
            <Text color="#fff">|</Text>
            <Text fontSize="xs" color="#fff" fontWeight="bold">
              En
            </Text>
            <Text color="#fff" fontWeight="bold" fontSize="sm">
              |
            </Text>
            <Text fontSize="xs" color="#fff" fontWeight="bold">
              Ru
            </Text>
          </Flex>
        </Flex>
      </XContainer>
      <XContainer width="95%">
        <Flex align="center" justify="space-between">
          <Link href="/">
            {" "}
            <img width="70px" src={logo} alt="" />
          </Link>
          <Flex align="center" justifyContent="center" gap="10px">
            <NavLink to="/" style={{ fontWeight: "bold" }}>
              Ana Sayfa
            </NavLink>
            <Text>|</Text>
            <NavLink to="/meals" style={{ fontWeight: "bold" }}>
              Yemekler
            </NavLink>
            <Text>|</Text>
            <NavLink style={{ fontWeight: "bold" }} to="/cocktails">
              Icecekler
            </NavLink>
            <Text>|</Text>
            <NavLink style={{ fontWeight: "bold" }} to="/favorites">
              Sevimliler
            </NavLink>
            <Text>|</Text>
            <NavLink style={{ fontWeight: "bold" }} to="/test">
              PAGINATION HOME
            </NavLink>
          </Flex>
     
        </Flex>
      </XContainer>
    </>
  );
};

export default Header;
