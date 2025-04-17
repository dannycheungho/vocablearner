import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from '../components/GoogleSignInButton'; // Custom styled component

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) navigate('/dashboard');
    });
    return unsubscribe;
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      
      // Successful login will trigger the onAuthStateChanged listener
      // which will automatically redirect to dashboard
    } catch (err) {
      setError(getFriendlyError(err.code));
      console.error("Google sign-in error:", err);
    }
  };

  const getFriendlyError = (code) => {
    switch(code) {
      case 'auth/popup-closed-by-user':
        return 'You closed the sign-in window. Please try again.';
      case 'auth/account-exists-with-different-credential':
        return 'This email is already registered with another method.';
      default:
        return 'Login failed. Please try again.';
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Vocabulary App Login</h2>
        <p>Sign in to access your saved vocabulary words</p>
        
        <GoogleSignInButton onClick={handleGoogleSignIn} />
        
        {error && <div className="error-message">{error}</div>}

        <div className="login-footer">
          <p>By signing in, you agree to our Terms of Service</p>
          <p>even though it doesn't</p>
        </div>
      </div>
    </div>
  );
};

export default Login;