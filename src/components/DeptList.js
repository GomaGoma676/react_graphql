import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import styles from "./DeptList.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMutation } from "@apollo/client";
import { CREATE_DEPT, DELETE_DEPT, GET_DEPTS, GET_EMPLOYEES } from "../queries";

const DeptList = ({ dataDepts }) => {
  const { deptName, setDeptName } = useContext(StateContext);
  const [createDept] = useMutation(CREATE_DEPT, {
    refetchQueries: [{ query: GET_DEPTS }],
  });
  const [deleteDept] = useMutation(DELETE_DEPT, {
    refetchQueries: [{ query: GET_DEPTS }, { query: GET_EMPLOYEES }],
  });
  return (
    <>
      <h3>Department List</h3>
      <input
        className={styles.deptList__input}
        placeholder="new department name"
        type="text"
        value={deptName}
        onChange={(e) => {
          setDeptName(e.target.value);
        }}
      />
      <button
        disabled={!deptName}
        onClick={async () => {
          try {
            await createDept({
              variables: {
                deptName: deptName,
              },
            });
          } catch (err) {
            alert(err.message);
          }
          setDeptName("");
        }}
      >
        New dept
      </button>
      <ul className={styles.deptList__list}>
        {dataDepts &&
          dataDepts.allDepartments &&
          dataDepts.allDepartments.edges.map((empl) => (
            <li className={styles.deptList__item} key={empl.node.id}>
              <span>{empl.node.deptName}</span>
              <div>
                <DeleteIcon
                  className={styles.deptList__delete}
                  onClick={async () => {
                    try {
                      await deleteDept({
                        variables: {
                          id: empl.node.id,
                        },
                      });
                    } catch (err) {
                      alert(err.message);
                    }
                  }}
                />
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default DeptList;
