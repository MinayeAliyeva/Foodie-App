import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ICardData } from "../modules";

const XCard = ({ title, content, btnContent, image, to }: ICardData) => {
  return (
    <Card maxW="md" padding="10px">
      <CardBody>
        <Image src={image} alt={title || "Image"} borderRadius="md" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
        </Stack>
        <Text>{content}</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link to={to}>
            <Button
              rightIcon={<FaArrowRightLong />}
              colorScheme="gray"
              variant="outline"
            >
              {btnContent}
            </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default XCard;
