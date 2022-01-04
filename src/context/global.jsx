import React, { createContext, useReducer, useState } from 'react';

const initialState = {
  siteInfo: {},
  hoge: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SITE_INFO':
      return { ...state, siteInfo: action.payload.siteInfo };
    default:
      return state;
  }
};

export const GlobalContext = createContext({
  globalState: initialState,
  setGlobalState: () => null,
});

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
