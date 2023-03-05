import { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useGlobalContext } from "../context";

const UserDataTable = () => {
  const {
    paginatedList,
    error,
    allUserData,
    setAllUserData,
    multipleDelete,
    setMultipleDelete,
    page,
  } = useGlobalContext();
  const [selectAll, setSelectAll] = useState(false);
  const [multipleEditArr, setMultipleEditArr] = useState([]);

  ///////////////////////////////////////////////////////////////////////////
  function deleteItem(id) {
    if (multipleDelete.includes(id)) {
      const data = multipleDelete.filter((userId) => userId !== id);
      setMultipleDelete(data);
    }
    const filteredList = allUserData.filter((item) => item.id !== id);
    setAllUserData(filteredList);
  }

  ///////////////////////////////////////////////////////////////////////////
  function editItem(id) {
    let edit = undefined;
    if (checkMultipleEditArr(id) === true) {
      edit = true;
    } else {
      edit = false;
    }

    const tableRow = document.getElementById(id).childNodes;

    if (edit) {
      tableRow.forEach((tableCell, index) => {
        if (tableCell.className.includes("userInfo")) {
          tableCell.style.backgroundColor = "#f7f7f7";
          tableCell.contentEditable = true;

          tableCell.style.borderColor = "red";
        }
        if (index === 4) {
          console.log(tableCell.firstChild);
          console.log(tableCell.children.children);
          tableCell.firstChild.firstChild.firstChild.style.display = "none";
          tableCell.firstChild.firstChild.firstChild.nextSibling.style.display =
            "block";
        }
      });
    } else {
      tableRow.forEach((tableCell, index) => {
        if (tableCell.className.includes("userInfo")) {
          tableCell.style.backgroundColor = "";
          tableCell.contentEditable = false;
          tableCell.style.borderColor = "";
        }

        if (index === 4) {
          tableCell.firstChild.firstChild.firstChild.style.display = "block";
          tableCell.firstChild.firstChild.firstChild.nextSibling.style.display =
            "none";
        }
      });
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  function checkMultipleEditArr(id) {
    if (!multipleEditArr.includes(id)) {
      multipleEditArr.push(id);
      return true;
    } else {
      const tempArr = multipleEditArr.filter((userId) => userId !== id);
      setMultipleEditArr(tempArr);
      return false;
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  function multipleSelect(id) {
    const row = document.getElementById(id);
    const checkAllBtn = document.getElementById("selectAllBtn");
    if (multipleDelete.length === 0) {
      row.style.backgroundColor = "#f7f7f7";
      const user = paginatedList.find((user) => user.id === id);
      multipleDelete.push(user.id);
    } else {
      let found = multipleDelete.find((userId) => userId === id);
      if (found) {
        checkAllBtn.checked = true ? (checkAllBtn.checked = false) : null;
        let tempArr = multipleDelete.filter((userId) => userId !== found);
        row.style.backgroundColor = "";
        setMultipleDelete(tempArr);
      } else {
        row.style.backgroundColor = "#f7f7f7";
        const user = paginatedList.find((user) => user.id === id);
        multipleDelete.push(user.id);
        if (multipleDelete.length === paginatedList.length) {
          setSelectAll(true);
          checkAllBtn.checked = true;
        }
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  function selectAllUsers(e) {
    const tableRows = document.querySelectorAll(".tableRow");
    const checkAllBtn = document.getElementById("selectAllBtn");
    if (!selectAll) {
      checkAllBtn.checked = true;
      tableRows.forEach((tableRow) => {
        tableRow.style.backgroundColor = "#f7f7f7";
        tableRow.firstChild.firstChild.checked = true;
      });
      const data = paginatedList.map((user) => user.id);
      setSelectAll(true);
      setMultipleDelete(data);
    } else {
      checkAllBtn.checked = false;
      tableRows.forEach((tableRow) => {
        tableRow.style.backgroundColor = "";
        tableRow.firstChild.firstChild.checked = false;
      });
      setMultipleDelete([]);
      setSelectAll(false);
    }
  }

  if (error) {
    return <Typography textAlign="center">No Data Found</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                type="checkbox"
                id="selectAllBtn"
                onClick={selectAllUsers}
              />
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedList &&
            paginatedList.map((userData) => {
              return (
                <TableRow
                  className="tableRow"
                  id={userData.id}
                  key={userData.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell size="small">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onClick={() => multipleSelect(userData.id)}
                    />
                  </TableCell>
                  <TableCell size="small" name="name" className="userInfo">
                    {userData.name}
                  </TableCell>
                  <TableCell size="small" name="email" className="userInfo">
                    {userData.email}
                  </TableCell>
                  <TableCell size="small" name="role" className="userInfo">
                    {userData.role}
                  </TableCell>
                  <TableCell size="small">
                    <Stack spacing={1} direction="row">
                      <IconButton
                        onClick={() => editItem(userData.id)}
                        className="edit"
                      >
                        <EditIcon id="editIcon"></EditIcon>
                        <SaveIcon
                          id="saveIcon"
                          sx={{ display: "none" }}
                        ></SaveIcon>
                      </IconButton>
                      <IconButton onClick={() => deleteItem(userData.id)}>
                        <DeleteIcon color="primary"></DeleteIcon>
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserDataTable;
