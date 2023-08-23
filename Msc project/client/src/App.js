
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
    ]
  },
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
