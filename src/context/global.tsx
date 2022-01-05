import React, { createContext, useReducer, useState } from 'react';

interface InitialState {
  siteInfo: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    description: string;
    mainVisual: {
      url: string;
      height: number;
      width: number;
    };
    profileName: string;
    profileImage: {
      url: string;
      height: number;
      width: number;
    };
  };
  hoge: {};
}

const initialState: InitialState = {
  siteInfo: {
    id: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    revisedAt: '',
    title: '',
    description: '',
    mainVisual: {
      url: '',
      height: 0,
      width: 0,
    },
    profileName: '',
    profileImage: {
      url: '',
      height: 0,
      width: 0,
    },
  },
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
  setGlobalState: ({}) => null,
});

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
