import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import "./AddUser.css";

function AddUser() {
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    user_type: "",
  });

  const options = [
    { value: "admin", label: "Admin" },
    { value: "employee", label: "Employee" },
  ];

  const { first_name, last_name, user_type } = user;

  const onInputChnage = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    await axios.post("https://60f2479f6d44f300177885e6.mockapi.io/users", user);
    // Redirect Section to Homepage
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
          <label>User Type</label>
        <Select options={options}>

        </Select>
          
          {options == "employee" ? 
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
        
        : <></>}
          
        </div>
      </form>

      <div className="modal-close-button">
          <button className="add-user-button">Add user</button>
        </div>
    </div>
  );
}

export default AddUser;
