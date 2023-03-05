import { React, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useGlobalContext } from "../context";

const Paginate = () => {
  const {
    allUserData,
    page,
    setPage,
    setPaginatedList,
    loading,
    multipleDelete,
    setAllUserData,
    setMultipleDelete,
  } = useGlobalContext();

  const listPerPage = 10;
  const pages = Math.ceil(allUserData.length / listPerPage);
  const arrayOfSubArrOfUsers = Array.from({ length: pages }, (_, index) => {
    const start = index * listPerPage;
    return allUserData.slice(start, start + listPerPage);
  });

  useEffect(() => {
    setPaginate();
    setMultipleDelete([]);
  }, [loading, page, allUserData]);

  function setPaginate() {
    if (arrayOfSubArrOfUsers) {
      setPaginatedList(arrayOfSubArrOfUsers[page - 1]);
    }
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  function multipleDeleteBtn(e) {
    e.preventDefault();
    if (multipleDelete.length === 0) {
      alert("No User is selected");
      return;
    }
    let data = allUserData.filter((item) => !multipleDelete.includes(item.id));
    setAllUserData(data);
    setMultipleDelete([]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: "1rem", sm: "null" },
        flexDirection: { xs: "column-reverse", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button variant="contained" size="small" onClick={multipleDeleteBtn}>
        Delete Selected
      </Button>
      <Pagination
        count={pages}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
        color="primary"
      />
    </Box>
  );
};

export default Paginate;
