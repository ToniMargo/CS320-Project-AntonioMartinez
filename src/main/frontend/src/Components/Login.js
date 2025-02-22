import { withAuthenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

function Login({ signOut, user }) {
  return (
    <div>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(Login);
