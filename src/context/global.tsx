import React, { createContext, useReducer, ReactNode, VFC, Dispatch } from 'react';

interface SiteInfo {
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
}

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

interface Action {
  type: string;
  payload: {
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
  };
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

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'SET_SITE_INFO':
      return { ...state, siteInfo: action.payload.siteInfo };
    default:
      return state;
  }
};

interface GlobalContext {
  globalState: InitialState;
  setGlobalState: Dispatch<Action>;
}

// setGlobalState({ type: 'SET_SITE_INFO', payload: { siteInfo: res } });
export const GlobalContext = createContext({
  globalState: initialState,
  setGlobalState: ({}: any): void => {},
});

interface Props {
  children: ReactNode;
}

export const GlobalProvider: VFC<Props> = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ globalState: globalState, setGlobalState: setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
