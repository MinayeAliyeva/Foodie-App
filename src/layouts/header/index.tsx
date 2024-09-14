import XContainer from "../../components/XContainer";
import {
  Flex,
  Input,
  Link,
  Text,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FaPhoneAlt, FaSearch, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6"; // Lupa ikonu
import { FaSignInAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
          <Text fontSize="40px">Logo</Text>
          <InputGroup size="lg" width="500px">
            <InputRightElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputRightElement>
            <Input placeholder="Ara..." borderRadius="100px" />
          </InputGroup>
          <Flex gap="20px" align="center">
            <Flex align="center" gap="5px">
              <Button
                colorScheme="blackAlpha"
                variant="outline"
                borderRadius="50px"
              >
                <FaSignInAlt color="#000" />
                <Link
                  href="/login"
                  fontSize="sm"
                  _hover={{ textDecoration: "none" }}
                  color="#000"
                >
                  Giriş
                </Link>
              </Button>
              <Button
                colorScheme="blackAlpha"
                variant="outline"
                borderRadius="50px"
              >
                <FaUser color="#000" />
                <Link
                  href="/register"
                  fontSize="sm"
                  _hover={{ textDecoration: "none" }}
                  color="#000"
                >
                  Qeydiyyat
                </Link>
              </Button>
            </Flex>
            <Flex align="center" gap="5px"></Flex>
          </Flex>
        </Flex>
      </XContainer>
      <XContainer bg="rgb(254, 246, 246)" width="100%">
        <Flex align="center" justifyContent="center" gap="10px">
          <NavLink to="/meals" style={{ fontWeight: "bold" }}>
            Meals
          </NavLink>
          <Text>|</Text>
          <NavLink style={{ fontWeight: "bold" }} to="/cocktails">
            Cocktails
          </NavLink>
        </Flex>
      </XContainer>
    </>
  );
};

export default Header;
