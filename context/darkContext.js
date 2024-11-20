import React, { createContext, useContext, useEffect, useState } from "react";

export const DarkContext = createContext({});
const DarkContextProvider = ({children}) => {
    const [isLight, setIsLight] = useState(true)
    return (
        <DarkContext.Provider value={{ isLight, setIsLight }}>
            {children}
        </DarkContext.Provider>
    )
}
export default DarkContextProvider;