import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation($username: String!, $password: String!) {
    createUser(input: { username: $username, password: $password, email: "" }) {
      user {
        id
        username
      }
    }
  }
`;
export const GET_TOKEN = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
export const GET_EMPLOYEES = gql`
  query {
    allEmployees {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            deptName
          }
        }
      }
    }
  }
`;
export const CREATE_DEPT = gql`
  mutation($deptName: String!) {
    createDept(input: { deptName: $deptName }) {
      department {
        id
        deptName
      }
    }
  }
`;
export const DELETE_DEPT = gql`
  mutation($id: ID!) {
    deleteDept(input: { id: $id }) {
      department {
        id
      }
    }
  }
`;
export const GET_DEPTS = gql`
  query {
    allDepartments {
      edges {
        node {
          id
          deptName
        }
      }
    }
  }
`;
export const CREATE_EMPLOYEE = gql`
  mutation($name: String!, $joinYear: Int!, $department: ID!) {
    createEmployee(
      input: { name: $name, joinYear: $joinYear, department: $department }
    ) {
      employee {
        id
        name
        joinYear
        department {
          id
          deptName
        }
      }
    }
  }
`;
export const UPDATE_EMPLOYEE = gql`
  mutation($id: ID!, $name: String!, $joinYear: Int!, $department: ID!) {
    updateEmployee(
      input: {
        id: $id
        name: $name
        joinYear: $joinYear
        department: $department
      }
    ) {
      employee {
        id
        name
        joinYear
        department {
          id
          deptName
        }
      }
    }
  }
`;
export const DELETE_EMPLOYEE = gql`
  mutation($id: ID!) {
    deleteEmployee(input: { id: $id }) {
      employee {
        id
      }
    }
  }
`;
export const GET_SINGLE_EMPLOYEE = gql`
  query($id: ID!) {
    employee(id: $id) {
      id
      name
      joinYear
      department {
        id
        deptName
      }
    }
  }
`;
export const SEARCH_EMPLOYEE = gql`
  query($name: String) {
    allEmployees(name_Icontains: $name) {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            deptName
          }
        }
      }
    }
  }
`;
export const SEARCH_AND_EMPLOYEE = gql`
  query($name: String, $joinYear: Int, $dept: String) {
    allEmployees(
      name_Icontains: $name
      joinYear: $joinYear
      department_DeptName_Icontains: $dept
    ) {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            deptName
          }
        }
      }
    }
  }
`;
export const PAGINATE_FIRST_EMPLOYEE = gql`
  query($first: Int) {
    allEmployees(first: $first) {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            deptName
          }
        }
      }
    }
  }
`;
export const PAGINATE_LAST_EMPLOYEE = gql`
  query($last: Int) {
    allEmployees(last: $last) {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            deptName
          }
        }
      }
    }
  }
`;
export const PAGINATE_MORE_EMPLOYEE = gql`
  query($first: Int, $after: String) {
    allDepartments(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          deptName
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;
