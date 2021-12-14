import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import "./EditUser.css";

function EditUser() {
  const { id } = useParams();
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    user_type: "",
  });

  const { first_name, last_name, user_type } = user;

  const onInputChnage = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`,
      user
    );
    // Redirect Section to Homepage
  };

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
    <div className="input-form">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="main-form">
          <div className="form-element">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              value={first_name}
              onChange={(e) => onInputChnage(e)}
            />
          </div>
          <div className="form-element">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={last_name}
              onChange={(e) => onInputChnage(e)}
            />
          </div>
          {/* <label>User Type</label>
          <input
            type="text"
            placeholder="User Type"
            name="user_type"
            value={user_type}
            onChange={(e) => onInputChnage(e)}
          /> */}
          <div className="form-element">
            <div className="location">
              <label>
                Division
                <Select id="country">{}</Select>
              </label>
              <label>
                District
                <Select id="state" />
              </label>
            </div>
          </div>
        </div>
        <button className="edit-user-button">
          <Link to="/">Edit User</Link>
        </button>
        <button className="edit-user-button">
          <Link to="/">Back To Home</Link>
        </button>
      </form>
    </div>
  );
}

export default EditUser;
