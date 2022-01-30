import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EmployeeContextCall } from "./EmployeeContextCall";

function EmployeeUsers() {
  const [employee, setEmployee] = useContext(EmployeeContextCall);

  useEffect(() => {
    axios
      .get(
        `https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=${"employee"}`
      )
      .then( response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="output-table">
      <table id="customers">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Type</th>
            <th>District</th>
            <th>Division</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employeeData) => {
            const { first_name, last_name, district, division, id, user_type } =
              employeeData;
            return (
              <tr key={id}>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{user_type}</td>
                <td>{district}</td>
                <td>{division}</td>
                <td className="button-flex">
                  <button className="view-button">
                    <Link to={`/users/${id}`}>View </Link>
                  </button>
                  <button className="edit-button">
                    <Link to={`/users/edit/${id}`}> Edit</Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeUsers;
