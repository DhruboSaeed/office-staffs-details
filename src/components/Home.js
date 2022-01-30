import React, {useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./Home.css";
import AddUserUpdate from "./AddUser";
import AdminUsers from "./AdminUsers";
import EmployeeUsers from "./EmployeeUsers";


Modal.setAppElement("#root");

function Home() {
  const [toggleAdmin, setToggleAdmin] = useState(false);
  const [toggleUser, setToggleUser] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const handleToggleAdmin = () => {
    toggleAdmin ? setToggleAdmin(false) : setToggleAdmin(true);
    setToggleUser(false);
  };
  const handleToggleUser = () => {
    toggleUser ? setToggleUser(false) : setToggleUser(true);
    setToggleAdmin(false);
  };

  return (
    <div className="container">
      <div className="modal-class">
        <button className="button-hover">
          <Link onClick={() => setmodalIsOpen(true)} to="/">
            Add User
          </Link>
        </button>
        <Modal isOpen={modalIsOpen} className="modal-section">
          <div className="modal-content">
            <AddUserUpdate />
            <div className="modal-close-button-home">
              <button
                onClick={() => setmodalIsOpen(false)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <hr />
      <div className="buttonGroup">
        <h4>
          <button className="btn" onClick={handleToggleAdmin}>
            Admin Users
          </button>
        </h4>
        <h4>
          <button className="btn" onClick={handleToggleUser}>
            Employee Users
          </button>
        </h4>
      </div>
      {toggleAdmin && <AdminUsers />}

      {toggleUser && <EmployeeUsers />}
    </div>
  );
}

export default Home;
