import { useAuth } from "../auth/AuthUserProvider";
import SignInButton from "../components/SignIn";
import { useEffect } from "react";

const AuthPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    const createRecordOnSignIn = async () => {
      if (user && user.displayName) {
        try {
          const encodedId = encodeURIComponent(user.displayName);

          const response = await fetch(`http://localhost:8080/api/user/${encodedId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: user.displayName, email: user.email }),
          });

          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.error('Error creating user', error);
        }
      }
    };
    createRecordOnSignIn();
  }, [user]);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>{user ? user.email : <p>You are not logged in</p>}</p>
      <SignInButton />
    </div>
  );
};

export default AuthPage;
