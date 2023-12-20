import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataSuccess } from "./Actions";
import { deleteData } from "./Actions";

const Table1 = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.firstState.posts);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => dispatch(fetchDataSuccess(data)))
      .catch((error) => console.error("Error fetching data:", error));
  }, [dispatch]);

  const deleteRow = (id) => {
    dispatch(deleteData(id));
  };

  return (
    <div>
      <h1>Data Table</h1>
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
                <td>{row.title}</td>
                <td>{row.body}</td>
                <td>
                  <button onClick={() => deleteRow(row.id)}>Delete</button>
                </td>
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

export default Table1;
