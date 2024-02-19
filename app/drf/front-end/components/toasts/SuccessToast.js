import React from 'react';
import Toast from 'react-native-toast-message';

const SuccessToast = ({ message }) => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top', 
      text1: 'Success',
      text2: message,
      visibilityTime: 4000, 
      autoHide: true, 
      topOffset: 30, 
      style: { backgroundColor: 'black' }, 
      textStyle: { color: '#ffffff' }, 
      text1Style: {
        fontSize: 18, 
        fontWeight: 'bold',
      },
      text2Style: {
        fontSize: 16, 
        color: '#868E96' 
      },
    });
  };

  React.useEffect(() => {
    showToast();
  }, []);

  return null;
};

export default SuccessToast;
