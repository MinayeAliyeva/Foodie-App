import React from "react";
import {
  Box,
  Flex,
  Link,
  Text,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import logo from "../../assets/images/logo.png"
import XContainer from "../../shared/components/XContainer";
const Footer = () => {
  const columnWidth = useBreakpointValue({ base: "100%", md: "30%" });

  return (
    <XContainer bg="rgb(64, 64, 63)">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="flex-start"
        justify="space-between"
        p="20px"
        gap="20px"
      >
        <Box width={columnWidth}>
          <img width="70px" src={logo} alt="" />

          <Stack spacing="4">
            <Flex align="center">
              <FaPhoneAlt fontSize="lg" color="red" />
              <Link
                href="tel:+1234567890"
                fontSize="md"
                ml="2"
                _hover={{ textDecoration: "none" }}
                color="white"
              >
                +1 (234) 567-890
              </Link>
            </Flex>
            <Flex align="center">
              <IoMdMail fontSize="lg" color="red" />
              <Link
                href="mailto:foodie@mail.com"
                fontSize="md"
                ml="2"
                _hover={{ textDecoration: "none" }}
                color="white"
              >
                example@example.com
              </Link>
            </Flex>
            <Flex align="center">
              <FaLocationDot fontSize="lg" color="red" />
              <Link
                href="https://www.google.com/maps?q=40.730610,-73.935242"
                fontSize="md"
                ml="2"
                _hover={{ textDecoration: "none" }}
                isExternal
                color="white"
              >
                Baku, Sahil 5km
              </Link>
            </Flex>
          </Stack>
        </Box>
        <Box width={columnWidth}>
          <Text fontSize="xl" fontWeight="bold" mb="4" color="#fff">
            Linkler
          </Text>
          <Stack spacing="3">
            <Link
              href="#"
              _hover={{ textDecoration: "underline" }}
              color="white"
            >
              Ana sayfa
            </Link>
            <Link
              href="#"
              _hover={{ textDecoration: "underline" }}
              color="white"
            >
              Hakkimizda
            </Link>

            <Link
              href="#"
              _hover={{ textDecoration: "underline" }}
              color="white"
            >
              Iletisim
            </Link>
          </Stack>
        </Box>
        <Box width={columnWidth}>
          <Text fontSize="xl" fontWeight="bold" mb="4" color="#fff">
            Bizi Izle
          </Text>
          <Stack spacing="3">
            <Link
              href="https://facebook.com"
              isExternal
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Facebook
            </Link>
            <Link
              href="https://twitter.com"
              isExternal
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Twitter
            </Link>
            <Link
              href="https://instagram.com"
              isExternal
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Instagram
            </Link>
          </Stack>
        </Box>
      </Flex>
      <Flex
        justify="center"
        mt="4"
        borderTop="1px"
        borderColor="whiteAlpha.400"
        pt="4"
      >
        <Text fontSize="sm" color="white">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Text>
      </Flex>
    </XContainer>
  );
};

export default Footer;
