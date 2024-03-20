import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
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
          <Nav.Link href="/profile">{user?.image ? (<Image src={user.image} roundedCircle className='img-profile'/>):(<Image src="https://iili.io/JVksC6Q.png" roundedCircle className='img-profile' />)}</Nav.Link>

          {/* <NavDropdown title={user?.image ? (
                            <img className='img-profile' src={user.image} alt="/"/>
                            ) : (
                            <img className='img-profile' src="https://iili.io/JVksC6Q.png" alt="/" />
                            )} > 
          
            
              <Nav.Link href="/profile">Edit profile</Nav.Link>
            
          </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        
          
          
        
      </Container>
    </Navbar>
  );
}

export default NavBar;