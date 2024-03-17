import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({user}) {
  return (
    <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Brand href="/">Green-Market</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="category" id="basic-nav-dropdown">
              <NavDropdown.Item >Action</NavDropdown.Item>
              <NavDropdown.Item >
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item >Something</NavDropdown.Item>
              
            </NavDropdown>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            {user && user.role==='farmer' ?(
              <>
              <Nav.Link href="/farmerproduct">MyProducts</Nav.Link>
              <Nav.Link href="/farmerorder">MyOrder</Nav.Link>
              </>
            ):null}
          <NavDropdown title={user?.image && <img className='img' src={user.image} alt='Profile' />} id="basic-nav-dropdown" > 
          
            <div className='profile-container' >
              <div>Username:{user?.username}</div>
              <div>Email:{user?.email}</div>
              <div>contact:{user?.contact}</div>
              <Nav.Link href="/profile">Edit profile</Nav.Link>
            </div>
          </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        
          
          
        
      </Container>
    </Navbar>
  );
}

export default NavBar;