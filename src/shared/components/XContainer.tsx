import { Container } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IProps {
  width?: string;
  bg?: string;
  children?: ReactNode ;
  // [key: string]: string;
}
const XContainer: FC<IProps> = ({ width='100%', bg='white', children, ...props }) => {
  return (
    <Container maxW={width} bg={bg} p={"5px 20px"}>
     {children}
    </Container>
  );
};

export default XContainer;
