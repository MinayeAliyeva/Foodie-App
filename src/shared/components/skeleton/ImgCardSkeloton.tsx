import { Box } from "@chakra-ui/react";
import { Card, Divider, Skeleton } from "antd";

import React from "react";

const ImgCardSkeloton = () => {
  return (
    <Card style={{width: "280px", marginRight: "15px"
        }} >
      <Box
      style={{
        width: "260px",
        overflow: "hidden",
        boxShadow: "10px 5px px #fff",
        marginLeft: "0px"
      }}
      // w="280px"
      // borderRadius="md"
      // overflow="hidden"
      // boxShadow="sm"
    >
      <Skeleton.Image  active={true} style={{ width: "230px", height: "250px" }} />
      <Box marginTop="10px">
        <Skeleton active={true} paragraph={{ rows: 0 }} />
      </Box>
      <Box marginTop="3px">
        <Skeleton active={true} paragraph={{ rows: 0 }} style={{width: "500px"}}/>
      </Box>

      <Box >
        <Skeleton active={true} paragraph={{ rows: 0 }} />
      </Box>

      <Divider style={{backgroundColor:"#000"}} />
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"}>

      <Skeleton.Button active={true} shape={"round"} />

      <Skeleton.Button active={true} shape={"round"} />
      </Box>
    </Box>
    </Card>
  );
};

export default ImgCardSkeloton;
