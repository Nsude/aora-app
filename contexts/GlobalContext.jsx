import { createContext, useContext, useState, useEffect } from "react";
import {getCurrentUser} from "../lib/appwrite";

const globalContext = createContext();
export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (!context) {
    return console.error("global context error")
  }

  return context;
}

const GlobalProvider = ({children}) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getCurrentUser()
    .then((res) => {
      if (res) {
        setisLoggedIn(true);
        setUser(res);
      } else {
        setisLoggedIn(false);
        setUser(null);
      }
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => setisLoading(false));
  }, [])

  return (
    <globalContext.Provider 
      value={{
        isLoading, setisLoading, user, setUser, isLoggedIn, setisLoggedIn
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export default GlobalProvider;