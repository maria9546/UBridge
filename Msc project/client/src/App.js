import React from "react";
import { createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Contact from './pages/contact'
import Login from './pages/Login'
import Logout from "./pages/Logout"
import Register from './pages/Register'
import Profile from './pages/Profile'
import Messages from "./pages/Messages"
import Service from "./pages/Services"
import UserProfile from "./pages/UserProfile";
import './style.scss'

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:'/',
        element: <Home/>
      },
      {
        path: '/profile/:userId',
        element: <Profile/>
      },
      {
        path: '/service',
        element: <Service/>
      },
      {
        path: '/blog',
        element: <Blog/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/logout',
        element: <Logout/>
      },
      {
        path:'/messages/:userId/:receiverId',
        element: <Messages />,
      },
      {
        path: '/userprofile/:userId',
        element: <UserProfile />,
      },
    ]
  },
  {
    path:'/profile/userId',
    element:<p>Invalid URL</p>
  }
]);


function App() {
  return(
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
  
}
export default App;
