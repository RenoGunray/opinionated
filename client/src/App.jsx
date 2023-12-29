import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";


import axios from "axios";
import "./styles/style.css";
import "./styles/fontawesome/css/all.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Accounts from "./pages/Accounts";
import EditArticle from "./pages/EditArticle";
import EditUser from "./pages/EditUser";
import FullArg from "./pages/FullArg";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserContextProvider } from "./UserContext";

// import './styles/js/sidemenu-slider.js';

axios.defaults.baseURL = 'http://localhost:8800';
axios.defaults.withCredentials = true;

const Layout = () => {
  return <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:id",
        element: <Single />
      },
      {
        path: "/write",
        element: <Write />
      },

      {
        path: "/accounts/:id",
        element: <Accounts />
      },
      {
        path: "/accounts/:id/edit",
        element: <EditArticle />
      },
      {
        path: "/accounts/:id/edit-user",
        element: <EditUser />
      },
      {
        path: "/fullarg/:id",
        element: <FullArg />
      }

    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])


function App() {
  return (
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
  );
}

export default App;
