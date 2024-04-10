import { signInWithGoogle } from "../utils/firebase";

const SignInButton = () => {
  const handleSignIn = () => {
    signInWithGoogle();
  };

  return <button onClick={handleSignIn}>Sign In with Google</button>;
};

export default SignInButton;
