import React from 'react'
import {Navbar,Nav, Container} from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
  <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/cart">Cart</Nav.Link>
      <Nav.Link href="/login">Sing-in</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        </header>
    )
}

export default Header
