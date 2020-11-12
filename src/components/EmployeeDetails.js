import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
const EmployeeDetails = () => {
  const { dataSingleEmployee, errorSingleEmployee } = useContext(StateContext);
  return (
    <>
      <h3>Employee Details</h3>
      {errorSingleEmployee && errorSingleEmployee.message}
      {dataSingleEmployee && dataSingleEmployee.employee && (
        <>
          <h3>ID: </h3>
          {dataSingleEmployee.employee.id}
          <h3>Employee name: </h3>
          {dataSingleEmployee.employee.name}
          <h3>Year of join: </h3>
          {dataSingleEmployee.employee.joinYear}
          <h3>Department name:</h3>
          {dataSingleEmployee.employee.department.deptName}
        </>
      )}
    </>
  );
};

export default EmployeeDetails;
