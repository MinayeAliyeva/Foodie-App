import { Box, Spinner } from "@chakra-ui/react";
import { FC } from "react";

interface ISpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  emptyColor?: string;
  speed?: string;
  thickness?: string;
}
const XSpinner: FC<ISpinnerProps> = ({
  size = "xl",
  thickness = "4px",
  speed = "0.65s",
  color = "blue.500",
  emptyColor = "gray.200",
}) => {
  return (
    <Box maxW="1200px" margin="auto">
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <Spinner
          thickness={thickness}
          speed={speed}
          emptyColor={emptyColor}
          color={color}
          size={size}
        />
      </Box>
    </Box>
  );
};

export default XSpinner;
