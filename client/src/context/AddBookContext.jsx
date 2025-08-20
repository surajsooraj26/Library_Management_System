import { createContext, useContext, useState } from "react";

const AddBookContext = createContext();

function AddBookProvider({ children }) {
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  return (
    <AddBookContext.Provider value={{ showAddBookForm, setShowAddBookForm }}>
      {children}
    </AddBookContext.Provider>
  );
}

function useAddBook() {
  return useContext(AddBookContext);
}
export { AddBookProvider, useAddBook };
