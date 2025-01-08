import { Button, Image, Nav, Navbar } from "react-bootstrap";
import { cart, logo } from "../../utils/icons";
import useToken from "../../hooks/useToken";
import { Link } from "react-router-dom";

const Header = () => {
    const {token, removeToken} = useToken();

    const handleLogout = () => {
        removeToken();
    };

    // Get User Name Function
    const loginUser = () => {
        let userObj = JSON.parse(token);
        let user = userObj.name.split(' ').map(l => l[0]).join('');
        return user;
    }

    return (
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
                            <div className="login-user">{loginUser()}</div>
                        </>}
                    </Navbar.Collapse>
                </Navbar>
            </header>
    )
}
export default Header;
