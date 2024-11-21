import React from 'react';
import { auth, googleProvider, signInWithPopup } from '../services/firebase';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Logged in as:', user.displayName);
    } catch (error) {
      console.error('Google login error');
    }
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;
