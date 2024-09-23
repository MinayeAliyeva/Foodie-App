import { Container } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IProps {
  width?: string;
  bg?: string;
  children?: ReactNode;
  minHeight?: string;
}
const XContainer: FC<IProps> = ({
  width = "100%",
  minHeight = undefined,
  bg = "white",
  children,
  ...props
}) => {
  return (
    <Container minH={minHeight} maxW={width} bg={bg} p={"5px 20px"}>
      {children}
    </Container>
  );
};

export default XContainer;
