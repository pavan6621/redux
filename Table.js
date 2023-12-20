import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataSuccess } from "./Actions";
import { Button, TableCell } from "@mui/material";
import {
  deleteData,
  handleEditData,
  setCurrentPage,
  tableData,
} from "./Actions";
const Table = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.firstState.posts);
  const editingId = useSelector((state) => state.reducerState.editingId);

  const currentPage = useSelector((state) => state.firstState.currentPage);
  const selectedValue = useSelector((state) => state.firstState.selectedValue);
  const searchTerm = useSelector((state) => state.firstState.searchTerm);
  const start = currentPage;
  console.log(start);
  const totalPages = useSelector((state) => state.firstState.totalPages);

  const setEditingId = (id) => {
    dispatch({ type: "SET_EDITING_ID", payload: id });
  };
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(tableData(currentPage, selectedValue, searchTerm));
  }, [currentPage, selectedValue, searchTerm, dispatch]);

  const lastpage = Math.ceil(100 / selectedValue);
  const firstpage = Math.ceil(currentPage / selectedValue);
  const deleteRow = (id) => {
    dispatch(deleteData(id));
  };

  const handleEdit = (id, newData) => {
    dispatch(handleEditData(id, newData));
  };

  const handlePageNation = (e) => {
    const { value } = e.target;
    dispatch({ type: "SET_RECORDS_PER_PAGE", payload: value });
    dispatch({ type: "SET_CURRENT_PAGE", payload: 0 });
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch({ type: "UPDATE_SEARCH_TERM", payload: value });
  };
  return (
    <div>
      <h1>Data Table</h1>

      <div className="Sub-harder">
        <div>
          <Button
            sx={{
              position: "relative",
              top: 13,
              left: 20,
              backgroundColor: "rgb(228, 228, 238)",
              color: "blue",
            }}
          >
            open
          </Button>
          <Button
            sx={{
              position: "relative",
              left: 25,
              top: 13,
              color: "white",
              backgroundColor: "rgb(107, 105, 122)",
            }}
          >
            Close
          </Button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <select
            value={selectedValue}
            onChange={handlePageNation}
            style={{
              width: "160px",
              height: "36px",
              marginTop: "10px",
              background: "linear-gradient(to right, white 88%, lavender 12%)",
              position: "relative",
              bottom: 4,
            }}
            sx={{
              color: "black",
              background: "linear-gradient(to right, white 95%, lavender 5%)",
            }}
          >
            <option value="10">10 Records per page</option>
            <option value="1">1 Records per page</option>
            <option value="3">3 Records per page</option>

            <option value="5">5 Records per page</option>

            <option value="20">20 Records per page</option>
          </select>

          <button
            onClick={() =>
              handlePageChange(
                Math.ceil(parseInt(currentPage) - parseInt(selectedValue))
              )
            }
          >
            Previous
          </button>
          <span style={{ color: "white" }}>{`Page ${
            firstpage + 1
          } of ${lastpage}`}</span>
          <button
            onClick={() =>
              handlePageChange(
                Math.ceil(parseInt(currentPage) + parseInt(selectedValue))
              )
            }
          >
            Next
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>body</th>
          </tr>
        </thead>
        {data ? (
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <TableCell>
                  {" "}
                  {editingId === row.id ? (
                    <input
                      type="text"
                      value={row.title}
                      onChange={(e) => {
                        const updatedData = {
                          ...row,
                          title: e.target.value,
                        };
                        handleEdit(row.id, updatedData);
                      }}
                    />
                  ) : (
                    row.title
                  )}
                </TableCell>
                <TableCell>
                  {" "}
                  {editingId === row.id ? (
                    <input
                      type="text"
                      value={row.body}
                      onChange={(e) => {
                        const updatedData = {
                          ...row,
                          body: e.target.value,
                        };
                        handleEdit(row.id, updatedData);
                      }}
                    />
                  ) : (
                    row.body
                  )}
                </TableCell>
                <TableCell>
                  {" "}
                  {editingId === row.id ? (
                    <button onClick={() => handleEdit(row.id, row)}>
                      save
                    </button>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => setEditingId(row.id)}
                        >
                          edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => deleteRow(row.id)}
                        >
                          delete
                        </Button>
                      </div>
                    </>
                  )}
                </TableCell>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
