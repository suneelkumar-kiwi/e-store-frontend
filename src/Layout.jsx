import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Home/header"
import { ToastContainer } from "react-toastify"

function Layout() {
  const location = useLocation();
  const noHeaderRoutes = ['/login', '/register'];
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Outlet />
    </>
  )
}

export default Layout;
