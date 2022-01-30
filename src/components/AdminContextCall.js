import {createContext, useState} from 'react'

export const AdminContextCall = createContext();

export const AdminContextProvider = (props) => {
    const [admin, setAdmin] = useState([]);
    return (
        <AdminContextCall.Provider value={[admin, setAdmin]}>
            {props.children}
        </AdminContextCall.Provider>
        
    )
}