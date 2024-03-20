import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({user}) {
  return (
    <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto gap-sm-5">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            {user && (user.role === 'farmer' || user.role === 'customer') && (
              <Nav.Link href="/order">OrderHistory</Nav.Link>
            )}
            {user && user.role==='farmer' ?(
              <>
              <Nav.Link href="/farmerproduct">MyProducts</Nav.Link>
              <Nav.Link href="/farmerorder">MyOrder</Nav.Link>
              </>
            ):null}
            {/* {user?.image && <img className='img' src={user.image} alt='Profile' />} */}
          <Nav.Link href="/About">About us</Nav.Link>
          <NavDropdown title={user?.image ? (
                            <img className='img-profile' src={user.image} alt="/"/>
                            ) : (
                            <img className='img-profile' src="https://iili.io/JVksC6Q.png" alt="/" />
                            )} > 
          
            <div className='profile-container p-2' >
              <div>Username:{user?.username}</div>
              <div>Email:{user?.email}</div>
              <div>contact:{user?.contact}</div>
              {user?.role === 'farmer' && (
                  <div>
                    Farm Name: {user.farmer && user.farmer.farm_name}
                    <br />
                    Location: {user.farmer && user.farmer.location}
                  </div>
                )}
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