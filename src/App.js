import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditUser from "./components/EditUser";
import UserDetails from "./components/UserDetails";
import AddUser from "./components/AddUser";
import { AdminContextProvider } from "./components/AdminContextCall";
import { EmployeeContetxProvider } from "./components/EmployeeContextCall";


function App() {
  return (
    <AdminContextProvider>
      <EmployeeContetxProvider>
        <Router>
          <div className="App">
            {/* <NavBar /> */}
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/users/add" element={<AddUser />} />
              <Route exact path="/users/edit/:id" element={<EditUser />} />
              <Route exact path="/users/:id" element={<UserDetails />} />
            </Routes>
          </div>
        </Router>
      </EmployeeContetxProvider>
    </AdminContextProvider>
  );
}

export default App;
