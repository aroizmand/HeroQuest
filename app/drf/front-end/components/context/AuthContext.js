import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'; 

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  authToken: null,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, authToken: action.payload, isAuthenticated: !!action.payload, isLoading: false };
    case 'REMOVE_TOKEN':
      return { ...state, authToken: null, isAuthenticated: false, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadStoredToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('token'); 
        dispatch({ type: 'SET_TOKEN', payload: token });
      } catch (error) {
        console.error("Failed to load the token from storage:", error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadStoredToken();
  }, []);

  const login = async (token) => {
    try {
      await SecureStore.setItemAsync('token', token); 
      dispatch({ type: 'SET_TOKEN', payload: token });
    } catch (error) {
      console.error("Failed to store the token:", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token'); 
      dispatch({ type: 'REMOVE_TOKEN' });
    } catch (error) {
      console.error("Failed to remove the token:", error);
    }
  };

  const getToken = () => {
    return state.authToken;
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
