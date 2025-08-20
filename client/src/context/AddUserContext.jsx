import { createContext, useContext, useState } from "react";

const AddUserContext = createContext();

function useAddUser() {
  return useContext(AddUserContext);
}

function AddUserProvider({ children }) {
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  return (
    <AddUserContext.Provider value={{ showAddUserForm, setShowAddUserForm }}>
      {children}
    </AddUserContext.Provider>
  );
}

export { useAddUser, AddUserProvider };
