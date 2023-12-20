import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Counter from "./Counter";
import Table from "./Table";

const Opportunity = () => {
  return (
    <Provider store={store}>
      <div>
        <Table />
      </div>
    </Provider>
  );
};

export default Opportunity;
