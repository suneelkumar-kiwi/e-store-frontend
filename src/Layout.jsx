import { Outlet} from "react-router-dom"
import Header from "./components/Home/header"
import { ToastContainer } from "react-toastify"
import Footer from "./components/Home/footer";

function Layout() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;
