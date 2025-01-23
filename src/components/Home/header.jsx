import { useState } from "react";
import { Button, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { cart, logo } from "../../utils/icons";
import { NavLink, useNavigate } from "react-router-dom";
import CreateProduct from "../Admin/createProduct";
import CreateProductCategory from "../Admin/createProductCategory";

const Header = () => {
    const navigate = useNavigate();
    const [showProductModal, setShowProductModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        navigate('/')
    };

    const handleCreateProduct = () => {
        setShowProductModal(!showProductModal);
    }

    const handleCreateCategory = () => {
        setShowCategoryModal(!showCategoryModal);
    }

    const token = () => {
        return JSON.parse(localStorage.getItem('authUser'));
    }

    // Get User Name Function
    const loginUser = () => {
        let user = token().name.split(' ').map(l => l[0]).join('');
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
                            <NavLink to="/"> Home </NavLink>
                            <NavLink to="/products"> Products </NavLink>
                            <NavLink to="/cart"> Cart <Image src={cart} alt="" /> </NavLink>
                        </Nav>
                        {!token() && <>
                            <NavLink to="/login" className="btn btn-outline-primary">Sign In </NavLink>
                            <NavLink to="/register" className="btn btn-primary"> Sign Up </NavLink>
                        </>}
                        {token() && <>
                            <Dropdown className="user-dropdown" align="end"                             >
                                <Dropdown.Toggle className="login-user" variant="success" id="dropdown-basic">
                                    {loginUser()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item className="nav-link" onClick={() => handleCreateProduct()}> Create Product </Dropdown.Item>
                                    <Dropdown.Item className="nav-link" onClick={() => handleCreateCategory()}> Create Product Category </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="outline-danger ms-4" onClick={() => handleLogout()}> Logout </Button>
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
