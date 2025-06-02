import { Outlet, Link } from "react-router-dom";
import AppNavbar from "../components/layout/AppNavbar";

const Layout = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  )
};

export default Layout;