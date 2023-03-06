import { useState, createContext } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <LoadingContext.Provider value={{user, setUser, isLoading, setIsLoading}}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }
