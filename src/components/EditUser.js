import axios from "axios";
import React, { useState, useEffect } from "react";
import { filteredDivisions, getStateCode } from "./Utility";
import { City } from "country-state-city";
import { Link, useParams } from "react-router-dom";
import "./EditUser.css";

function EditUser() {
  const { id } = useParams();
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    user_type: "",
    divison: "", 
    district: "",
  });

  const { first_name, last_name, user_type, division, district } = user;

  const onInputChnage = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("On Submit call");
    console.log("user data", user);
    axios
      .put(`https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`, user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // Redirect Section to Homepage
    setuser({
      first_name: "",
      last_name: "",
      user_type: "",
      division: "",
      district: "",
      id: ""
    })
   
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`
    );

    console.log("Result", result);
    setuser(result.data);
  };

  const stateCode = getStateCode(user.division);
  let citiesOfState = City.getCitiesOfState("BD", stateCode);

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
          <div className="form-element">
            <select
              name="division"
              id="division"
              value={division}
              onChange={(e) => onInputChnage(e)}
            >
              <option value="">Select your Division</option>
              {filteredDivisions.map((divisions) => {
                return <option value={divisions.name}>{divisions.name}</option>;
              })}
            </select>

            <label htmlFor="">District</label>
            <select
              name="district"
              id="district"
              value={district}
              onChange={(e) => onInputChnage(e)}
            >
              <option value="">Select your district</option>
              {citiesOfState.map((district) => {
                return <option value={district.name}>{district.name}</option>;
              })}
            </select>
          </div>
        </div>
        <button type="submit" className="edit-user-button">
          {/* <Link to="/">Edit User</Link> */}
          Edit
        </button>
        <button className="edit-user-button">
          <Link to="/">Back To Home</Link>
        </button>
      </form>
    </div>
  );
}

export default EditUser;
