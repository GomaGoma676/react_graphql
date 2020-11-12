import React, { useState } from "react";
import styles from "./Pagination.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from "@apollo/react-hooks";
import { useLazyQuery } from "@apollo/client";
import {
  PAGINATE_FIRST_EMPLOYEE,
  PAGINATE_LAST_EMPLOYEE,
  PAGINATE_MORE_EMPLOYEE,
} from "../queries";
import { Grid } from "@material-ui/core";
const NUM_PAGE = 3;
const Pagination = () => {
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(0);
  const [paginateFirst, { data: dataFirst, error: errorFirst }] = useLazyQuery(
    PAGINATE_FIRST_EMPLOYEE,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [paginateLast, { data: dataLast, error: errorLast }] = useLazyQuery(
    PAGINATE_LAST_EMPLOYEE,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const {
    data: dataPages,
    error: errorPages,
    loading: loadingPages,
    fetchMore,
  } = useQuery(PAGINATE_MORE_EMPLOYEE, {
    variables: { first: NUM_PAGE, after: null },
    fetchPolicy: "cache-and-network",
  });

  if (loadingPages) return <h1>Loading from server...</h1>;

  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <h3>Paginate by first</h3>
          <input
            type="number"
            min="0"
            value={first}
            onChange={(e) => {
              setFirst(e.target.value);
            }}
          />
          <div>
            <SearchIcon
              className={styles.pagination__search}
              onClick={async () => {
                await paginateFirst({
                  variables: {
                    first: first,
                  },
                });
                setFirst(0);
              }}
            />
          </div>
          <ul className={styles.pagination__list}>
            {errorFirst && <h3>{errorFirst.message}</h3>}
            {dataFirst &&
              dataFirst.allEmployees &&
              dataFirst.allEmployees.edges.map((empl) => (
                <li className={styles.pagination__item} key={empl.node.id}>
                  {empl.node.name}
                  {" / "}
                  {empl.node.joinYear}
                  {" / "}
                  {empl.node.department.deptName}
                </li>
              ))}
          </ul>
        </Grid>
        <Grid item xs={4}>
          <h3>Paginate by last</h3>
          <input
            type="number"
            min="0"
            value={last}
            onChange={(e) => {
              setLast(e.target.value);
            }}
          />
          <div>
            <SearchIcon
              className={styles.pagination__search}
              onClick={async () => {
                await paginateLast({
                  variables: {
                    last: last,
                  },
                });
                setLast(0);
              }}
            />
          </div>
          <ul className={styles.pagination__list}>
            {errorLast && <h3>{errorLast.message}</h3>}
            {dataLast &&
              dataLast.allEmployees &&
              dataLast.allEmployees.edges.map((empl) => (
                <li className={styles.pagination__item} key={empl.node.id}>
                  {empl.node.name}
                  {" / "}
                  {empl.node.joinYear}
                  {" / "}
                  {empl.node.department.deptName}
                </li>
              ))}
          </ul>
        </Grid>
        <Grid item xs={4}>
          <h3>Pagination load more</h3>
          <ul>
            {errorPages && <h3>{errorPages.message}</h3>}
            {dataPages &&
              dataPages.allDepartments &&
              dataPages.allDepartments.edges.map((empl) => (
                <li className={styles.pagination__item} key={empl.node.id}>
                  {empl.node.deptName}
                </li>
              ))}
          </ul>
          {dataPages.allDepartments.pageInfo.hasNextPage && (
            <button
              onClick={() => {
                fetchMore({
                  variables: {
                    first: NUM_PAGE,
                    after: dataPages.allDepartments.pageInfo.endCursor || null,
                  },
                  updateQuery: (prevLoad, { fetchMoreResult }) => {
                    fetchMoreResult.allDepartments.edges = [
                      ...prevLoad.allDepartments.edges,
                      ...fetchMoreResult.allDepartments.edges,
                    ];
                    return fetchMoreResult;
                  },
                });
              }}
            >
              Load more
            </button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Pagination;
