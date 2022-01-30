import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    user_type: "", 
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`
    );
    setuser(result.data);
  };

  return (
    <div>
      <h1>User Details</h1>
      <div className="output-table">
        <table id="customers">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Type</th>
              <th>Division</th>
              <th>District</th>
              <th>Details View</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.user_type}</td>
              <td>{user.division}</td>
              <td>{user.district}</td>
              <td className="button-flex">
                <button className="edit-button">
                  <Link to={`/users/edit/${user.id}`}> Edit</Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="edit-button">
          <Link to="/"> Back To Home</Link>
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
