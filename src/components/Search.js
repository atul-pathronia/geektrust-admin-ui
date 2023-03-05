import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useGlobalContext } from "../context";

const Search = () => {
  const { allUserData, setAllUserData, getUserData, setError } =
    useGlobalContext();

  function performSearch(e) {
    let query = e.target.value;
    if (!query) {
      getUserData();
    }
    const filteredList = allUserData.filter((obj) =>
      JSON.stringify(obj).toLowerCase().includes(query.toLowerCase())
    );
    if (filteredList.length === 0) {
      setError(true);
    } else {
      setError(false);
      setAllUserData(filteredList);
    }
  }

  return (
    <Box>
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        // onInput={(e) => console.log(e.target.value)}
        onChange={performSearch}
        placeholder="Search by name, email or role"
      ></TextField>
    </Box>
  );
};

export default Search;
