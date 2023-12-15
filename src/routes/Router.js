import { Navigate } from "react-router";
import LoginForm from "../components/views/LoginForm/loginForm";
import Dashboard from "../components/views/dashboard/Dashboard";

// const ThemeRoutes = [
//   {
//     path: "/",
//     children: [
//       { path: "/", element: <Navigate to="login" /> },
//       { path: "login", exact: true, element: <LoginForm /> },
//       { path: "dashboard", element: <Dashboard /> },
//     ],
//   },
// ];
// export default ThemeRoutes;

const ThemeRoutes = [
  {
    path: "/login",
    component: LoginForm,
  },
  {
    path: "/home",
    component: Dashboard,
    private: true, // Marca la ruta como privada
  },
  // {
  //   path: "/",
  //   component: PublicPage,
  // },
];
export default ThemeRoutes;
