import { Link } from  'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button, Nav } from 'react-bootstrap';

const linkStyle = {
    margin: "6px",
    textDecoration: "none",
    color: "hsla(0,0%,100%,0.55)",
    fontSize: "18px"
};

const brandStyle = {
    margin: "8px",
    textDecoration: "none",
    color: "hsla(0,0%,100%,0.55)",
    fontSize: "24px"
};

function NaviBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><Link to="/" style={brandStyle}>Xonest transport</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link><Link to="/" style={linkStyle}>Rent</Link></Nav.Link>
                    <Nav.Link><Link to="/about" style={linkStyle}>About</Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NaviBar;