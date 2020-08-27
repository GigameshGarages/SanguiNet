import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class header extends Component {
    render() {
      return (
        <div>
            <Navbar dark color="dark">
               <div className="container">
                <NavbarBrand href="/register">
                  <b>  Blood Bank</b>
                </NavbarBrand>
                  <Nav>
                    <NavItem>
                      <NavLink href="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/view">Donors</NavLink>
                    </NavItem>
                  </Nav>
               </div>
            </Navbar>
            <br></br>
        </div>
      );
    }
  }
  
  export default header;