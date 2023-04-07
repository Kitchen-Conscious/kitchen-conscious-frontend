import { createContext, useState, useEffect } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve the username from local storage when the component mounts
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  const updateUserName = (newUsername) => {
    setUserName(newUsername);
    // Save the username to local storage whenever it changes
    localStorage.setItem("username", newUsername);
  };

  return (
    <MyContext.Provider value={{ userName, updateUserName }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
