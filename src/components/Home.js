import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import AddUser from "./AddUser";
import "./Home.css";

Modal.setAppElement("#root");

function Home() {
  const [userType, setuserType] = useState("admin");
  const [users, setusers] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);

  useEffect(() => {
    setusers([]);
    loadUserList();
  }, [userType, pageNumber]);

  const loadUserList = () => {
    axios
      .get(
        `https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=${userType}&page=${pageNumber}&limit=${5}`
      )
      .then((response) => {
        console.log("Response", response.data);
        setusers(response.data.reverse());
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const nextPage = () => {
    if (users.length < 5) {
      return false;
    } else {
      setpageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber === 1) {
      return false;
    }
    setpageNumber(pageNumber - 1);
  };

  return (
    <div className="container">
      <div className="upper-button-section">
        <button onClick={() => setuserType("admin")} className="button-hover">
          Admin User Data
        </button>
        <button
          onClick={() => setuserType("employee")}
          className="button-hover"
        >
          Employee User Data
        </button>
        <div className="modal-class">
          <button className="button-hover">
            <Link onClick={() => setmodalIsOpen(true)} to="/">
              Add User
            </Link>
          </button>
          <Modal isOpen={modalIsOpen} className="modal-section">
            <div className="modal-content">
              <AddUser />
              <div className="modal-close-button-home">
                <button onClick={() => setmodalIsOpen(false)} className="close-button">Close</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>

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
            {users.map((user) => (
              <tr key={user.id.toString()}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.user_type}</td>
                <td>{user.division}</td>
                <td>{user.district}</td>
                <td className="button-flex">
                  <button className="view-button">
                    <Link to={`/users/${user.id}`}>View </Link>
                  </button>
                  <button className="edit-button">
                    <Link to={`/users/edit/${user.id}`}> Edit</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bottom-button">
          <button onClick={nextPage}>Next Page</button>
          <button onClick={prevPage}>Previous Page</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
