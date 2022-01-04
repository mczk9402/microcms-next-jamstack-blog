import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({ test: { test: 'test' } });
  return <GlobalContext.Provider value={{ global, setGlobal }}>{children}</GlobalContext.Provider>;
};
