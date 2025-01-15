import { useState } from "react";
import { Button, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { cart, logo } from "../../utils/icons";
import useToken from "../../hooks/useToken";
import { Link } from "react-router-dom";
import CreateProduct from "../Admin/createProduct";
import CreateProductCategory from "../Admin/createProductCategory";

const Header = () => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const { token, removeToken } = useToken();

    const handleLogout = () => {
        removeToken();
    };

    const handleCreateProduct = () => {
        setShowProductModal(!showProductModal);
    }

    const handleCreateCategory = () => {
        setShowCategoryModal(!showCategoryModal);
    }

    // Get User Name Function
    const loginUser = () => {
        let userObj = JSON.parse(token);
        let user = userObj.name.split(' ').map(l => l[0]).join('');
        return user;
    }

    return (
        <>
            <header>
                <Navbar expand="lg">
                    <Navbar.Brand href="/">
                        <Image width={180} src={logo} alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <Link className="nav-link" to="/"> Home </Link>
                            <Link className="nav-link" to="/"> Products </Link>
                            <Link className="nav-link" to="/"> Cart <Image src={cart} alt="" /> </Link>
                        </Nav>
                        {!token && <>
                            <Link to="/login" className="btn btn-outline-primary">Sign In </Link>
                            <Link to="/register" className="btn btn-primary"> Sign Up </Link>
                        </>}
                        {token && <>
                            <Button variant="outline-danger me-3" onClick={() => handleLogout()}> Logout </Button>
                            <Dropdown className="user-dropdown" align="end"                             >
                                <Dropdown.Toggle className="login-user" variant="success" id="dropdown-basic">
                                    {loginUser()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item className="nav-link" onClick={() => handleCreateProduct()}> Create Product </Dropdown.Item>
                                    <Dropdown.Item className="nav-link" onClick={() => handleCreateCategory()}> Create Product Category </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>}
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <CreateProduct show={showProductModal} handleClose={() => handleCreateProduct()} />
            <CreateProductCategory show={showCategoryModal} handleClose={() => handleCreateCategory()} />
        </>
    )
}
export default Header;
