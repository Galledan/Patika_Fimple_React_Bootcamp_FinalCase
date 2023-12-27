import React, { createContext, useContext, useState, useEffect } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, navigate, auth0_domain, auth0_client_id }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0 = await createAuth0Client({
        domain: auth0_domain,
        client_id: auth0_client_id,
        redirect_uri: window.location.origin,
      });

      setAuth0Client(auth0);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0.handleRedirectCallback();
        navigate(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
      }

      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }

      setLoading(false);
    };

    initAuth0();
  }, [auth0_domain, auth0_client_id, navigate]);

  const login = async () => {
    await auth0Client.loginWithRedirect();
  };

  const logout = () => {
    auth0Client.logout({ returnTo: window.location.origin });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
