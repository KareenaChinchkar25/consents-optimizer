import HomePage from "../pages/DashboardPage"
import ProfilePage from "../components/ProfilePage";
import SettingsPage from "../pages/SettingsPage";

const routes = [
  {
    path: "/",
    element: <HomePage />, // dashboard content
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];

export default routes;
