import React from 'react';
import Toast from 'react-native-toast-message';

const ErrorToast = ({ message }) => {
  const showToast = () => {
    Toast.show({
      type: 'error', 
      text1: 'Error', 
      text2: message
    });
  };

  React.useEffect(() => {
    showToast();
  }, []);

  return null; 
};

export default ErrorToast;
