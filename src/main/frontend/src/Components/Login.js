import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const CustomSignInFooter = () => {
  const navigate = useNavigate();
  return (
    <div className="custom-footer">
      <button onClick={() => navigate('/')} className="cancel-button">
        Cancel
      </button>
    </div>
  );
};

function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
    <Authenticator
      hideSignUp={false}
      components={{
        SignIn: {
          Footer: CustomSignInFooter,
        },
      }}
    >
      {({ signOut, user }) => (
        <div className="container">
          <h1>Login Successful</h1>
          <p>Welcome, {user.username}!</p>
          {/* Additional post-login content can go here */}
        </div>
      )}
    </Authenticator>
    </div>
  );
}

export default Login;
