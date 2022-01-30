import React from "react";
import { useFormik } from "formik";
import { City } from "country-state-city";
import { filteredDivisions, getStateCode, validate } from "./Utility";
import axios from "axios";
import "./AddUser.css";

function AddUser (){
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      user_type: "",
      division: "",
      district: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("Submit form ", values);
        axios
          .post("https://60f2479f6d44f300177885e6.mockapi.io/users", values)
          .then( response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
        formik.handleReset();
    },
  });

  const stateCode = getStateCode(formik.values.division);
  let citiesOfState = City.getCitiesOfState("BD", stateCode);

  return (
    <div className="container">
      <div className="Header">
        <h2>Add User</h2>
      </div>
      <hr />
      <div className="form-section">
        <form onSubmit={formik.handleSubmit}>
          <div className="mainForm">
            <div className="form-element">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              {formik.touched.first_name && formik.errors.first_name ? (
                <div className="errorText">{formik.errors.first_name}</div>
              ) : null}
            </div>

            <br />

            <div className="form-element">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <div className="errorText">{formik.errors.last_name}</div>
              ) : null}
            </div>

            <br />

            <div className="form-element">
              <label htmlFor="user_type">User Type</label>
              <select
                id="user_type"
                name="user_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user_type}
                className="select-class"
              >
                <option value="">Select User</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
              {formik.touched.user_type && formik.errors.user_type ? (
                <div className="errorText">{formik.errors.user_type}</div>
              ) : null}
            </div>

            <br />

            <div className="form-element">
              {formik.values.user_type === "employee" ? (
                <div>
                  <div className="form-element">
                    <label htmlFor="division">Division</label>
                    <select
                      id="division"
                      name="division"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.division}
                      className="select-class"
                    >
                      <option value="">Select Division</option>
                      {filteredDivisions.map((division) => {
                        return (
                          <option key={division.id} value={division.name}>
                            {division.name}
                          </option>
                        );
                      })}
                    </select>
                    {formik.touched.division && formik.errors.division ? (
                      <div className="errorText">{formik.errors.division}</div>
                    ) : null}
                  </div>

                  <br />
                  <div className="form-element">
                    <label htmlFor="district">Division</label>
                    <select
                      id="district"
                      name="district"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.district}
                      className="select-class"
                    >
                      <option value="">Select District</option>
                      {citiesOfState.map((city) => {
                        return (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        );
                      })}
                    </select>
                    {formik.touched.district && formik.errors.district ? (
                      <div className="errorText">{formik.errors.district}</div>
                    ) : null}
                  </div>

                  <br />
                </div>
              ) : null}
            </div>

            <div className="userAddBtns">
              <button className="addUserBtn" type="submit">
                Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
