import { createContext, useState } from "react";

export const EmployeeContextCall = createContext();

export const EmployeeContetxProvider = (props) => {
    const [employee, setEmployee] = useState([]);
    return (
        <EmployeeContextCall.Provider value={[employee, setEmployee]}>
            {props.children}
        </EmployeeContextCall.Provider>
    )
}