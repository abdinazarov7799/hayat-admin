import React from 'react';
import noData from "../../assets/images/img.png"
import {Flex} from "@chakra-ui/react";
function NoData(props) {
    return (
        <Flex justifyContent={"center"}>
            <img width={"650px"} src={noData} />
        </Flex>
    );
}
export default NoData;
