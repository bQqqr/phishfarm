import React, { createContext, useEffect, useState } from 'react';

interface IAppProviderProps {
  children: React.ReactNode;
}

interface IAppContext {
  host: string;
  jwt: string;
  authenticated: boolean;
  changeHost: (host: string) => void;
  changeJwt: (jwt: string) => void;
  changeAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const AppCtx = createContext<IAppContext>({
  host: '',
  jwt: '',
  authenticated: false,
  changeHost: () => {},
  changeJwt: () => {},
  changeAuthenticated: () => {},
  logout: () => {},
});

export const AppProvider = ({ children }: IAppProviderProps) => {
  // Hooks
  const [host, setHost] = useState('');
  const [jwt, setJwt] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // Boostrap
  useEffect(() => {
    const host = window.localStorage.getItem('farmer.host');
    const jwt = window.localStorage.getItem('farmer.jwt');

    if (jwt === null || host === null) {
      changeAuthenticated(false);
    } else {
      changeHost(host);
      changeJwt(jwt);
      changeAuthenticated(true);
    }
  }, []);

  // Definitions
  function changeHost(host: string) {
    window.localStorage.setItem('farmer.host', host);
    setHost(host);
  }

  function changeJwt(jwt: string) {
    window.localStorage.setItem('farmer.jwt', jwt);
    setJwt(jwt);
  }

  function changeAuthenticated(value: boolean) {
    setAuthenticated(value);
  }

  function logout() {
    window.localStorage.removeItem('farmer.jwt');
    window.localStorage.removeItem('farmer.host');
    changeHost('');
    changeJwt('');
    changeAuthenticated(false);
  }

  // Returns
  return (
    <AppCtx.Provider
      value={{ host, jwt, authenticated, changeHost, changeJwt, changeAuthenticated, logout }}
    >
      {children}
    </AppCtx.Provider>
  );
};
