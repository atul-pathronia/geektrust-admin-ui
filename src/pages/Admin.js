import React from "react";
import Box from "@mui/material/Box";
import Paginate from "../components/Pagination";
import Search from "../components/Search";
import UserDataTable from "../components/UserDataTable";

const userData = () => {
  return (
    <Box
      display="flex"
      gap="1rem"
      flexDirection="column"
      // maxWidth="90%"
      // marginX="auto"
    >
      <Search></Search>
      <UserDataTable></UserDataTable>
      <Paginate></Paginate>
    </Box>
  );
};

export default userData;
