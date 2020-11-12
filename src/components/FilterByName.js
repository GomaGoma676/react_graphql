import React, { useState } from "react";
import styles from "./FilterByName.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_EMPLOYEE } from "../queries";

const FilterByName = () => {
  const [searchByName, setSearchByName] = useState("");
  const [
    searchEmployee,
    { data: dataSearch, error: errorSearch },
  ] = useLazyQuery(SEARCH_EMPLOYEE, {
    fetchPolicy: "network-only",
  });
  return (
    <>
      <h3>Filter by Employee Name</h3>
      <input
        placeholder="employee name ?"
        type="text"
        value={searchByName}
        onChange={(e) => {
          setSearchByName(e.target.value);
        }}
      />
      <div>
        <SearchIcon
          className={styles.filterByName__search}
          onClick={async () => {
            await searchEmployee({
              variables: {
                name: searchByName,
              },
            });
            setSearchByName("");
          }}
        />
      </div>
      <ul className={styles.filterByName__list}>
        {errorSearch && <h3>{errorSearch.message}</h3>}
        {dataSearch &&
          dataSearch.allEmployees &&
          dataSearch.allEmployees.edges.map((empl) => (
            <li className={styles.filterByName__item} key={empl.node.id}>
              {empl.node.name}
              {" / "}
              {empl.node.joinYear}
              {" / "}
              {empl.node.department.deptName}
            </li>
          ))}
      </ul>
    </>
  );
};

export default FilterByName;
