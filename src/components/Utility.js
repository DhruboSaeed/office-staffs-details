import { City } from "country-state-city";

//formik form validation;
export const validate = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = "First Name Requried";
  }

  if (!values.last_name) {
    errors.last_name = "Last Name Requried";
  }

  if (!values.user_type) {
    errors.user_type = "Select User Type";
  }

  if (values.user_type === "employee" && !values.division) {
    errors.division = "Select Division";
  }

  if (values.user_type === "employee" && !values.district) {
    errors.district = "Select District";
  }

  return errors;
};

const divisions = City.getCitiesOfCountry("BD");
//filtering all the division of Bangladesh;
export const filteredDivisions = divisions.filter(function (v) {
  return (
    v["name"] === "Dhaka" ||
    v["name"] === "Chittagong" ||
    v["name"] === "Barisal" ||
    v["name"] === "Khulna" ||
    v["name"] === "Sylhet" ||
    v["name"] === "Rajshahi" ||
    v["name"] === "Rangpur" ||
    v["name"] === "Mymensingh"
  );
});

//function create for get stateCode for all every division of Bangladesh.
export const getStateCode = (stateName) => {

  let stateCode;

  if (stateName === "Dhaka") {
    stateCode = "13";
  }
  if (stateName === "Chittagong") {
    stateCode = "B";
  }
  if (stateName === "Barisal") {
    stateCode = "06";
  }
  if (stateName === "Khulna") {
    stateCode = "27";
  }
  if (stateName === "Sylhet") {
    stateCode = "60";
  }
  if (stateName === "Rajshahi") {
    stateCode = "54";
  }
  if (stateName === "Rangpur") {
    stateCode = "55";
  }
  if (stateName === "Mymensingh") {
    stateCode = "34";
  }
  return stateCode;
};
