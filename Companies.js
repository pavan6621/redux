import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Table1 from "./Table1";

const Companies = () => {
  return (
    <Provider store={store}>
      <div>
        <Table1 />
      </div>
    </Provider>
  );
};

export default Companies;
