import {Box} from "@chakra-ui/react";
import React from "react";
import UserList from "../components/UserList.jsx";

const UsersContainer = () => {

  return(
      <>
          <Box bg="white" w="100%" p={4} mb={4} borderRadius="md">
              <UserList />
          </Box>
      </>
  )
}
export default UsersContainer
