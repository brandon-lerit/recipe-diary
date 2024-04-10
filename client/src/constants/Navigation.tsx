import NewPostPage from "../pages/NewPost";
import HomePage from "../pages/Home";
import Explore from "../pages/Explore";
import ProfilePage from "../pages/Profile";
import AuthPage from "../pages/AuthPage";

export const PATHS: {
  link: string;
  label: string;
  element?: JSX.Element;
}[] = [
  {
    link: "/",
    label: "Home",
    element: <HomePage />,
  },
  {
    link: "/explore",
    label: "Explore",
    element: <Explore />,
  },
  {
    link: "/profile",
    label: "Profile",
    element: <ProfilePage />,
  },
  {
    link: "/NewPost",
    label: "New Post",
    element: <NewPostPage />,
  },
  {
    link: "/AuthPage",
    label: "Login",
    element: <AuthPage />,
  },
];
