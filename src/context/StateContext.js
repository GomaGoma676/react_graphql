import React, { createContext, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_SINGLE_EMPLOYEE } from "../queries";
export const StateContext = createContext();

const StateContextProvider = (props) => {
  const [name, setName] = useState("");
  const [joinYear, setJoinYear] = useState(2020);
  const [deptName, setDeptName] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editedId, setEditedId] = useState("");
  const [
    getSingleEmployee,
    { data: dataSingleEmployee, error: errorSingleEmployee },
  ] = useLazyQuery(GET_SINGLE_EMPLOYEE, {
    fetchPolicy: "network-only",
  });

  return (
    <StateContext.Provider
      value={{
        name,
        setName,
        joinYear,
        setJoinYear,
        deptName,
        setDeptName,
        selectedDept,
        setSelectedDept,
        editedId,
        setEditedId,
        dataSingleEmployee,
        errorSingleEmployee,
        getSingleEmployee,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
export default StateContextProvider;
