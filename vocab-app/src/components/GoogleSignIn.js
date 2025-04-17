import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const GoogleSignIn = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Logged in user:', user);
      
      // You can access:
      // user.uid - Unique ID
      // user.displayName - Google account name
      // user.email - Google email
      // user.photoURL - Profile picture
      
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <button onClick={signInWithGoogle} className="google-signin-btn">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;