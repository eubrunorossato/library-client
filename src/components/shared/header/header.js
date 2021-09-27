import React from 'react';
import { Link } from "react-router-dom";
import {
  Navbar,
  NavItem,
  Icon,
  Dropdown,
  Divider,
} from 'react-materialize'
import './_header.css'
const Header = () => {
  return (
    <Navbar
      alignLinks="right"
      brand={<Link to="/" className="brand-logo" href="#">Library<Icon medium>import_contacts</Icon></Link>}
      id="mobile-nav"
      options={{
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true
      }}
    >
      <NavItem href="get-started.html">
        <Icon>
          search
        </Icon>
      </NavItem>
      <Dropdown
        id="Dropdown_14"
        options={{
          alignment: 'left',
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          container: null,
          coverTrigger: true,
          hover: false,
          inDuration: 550,
          outDuration: 950
        }}
        trigger={<a to="/">Admin{' '}<Icon right>arrow_drop_down</Icon></a>}
      >
        <Link to="/register-book">
          <a>Register Book</a>
        </Link>
        <Divider />
      </Dropdown>
    </Navbar>
  )
};

export default Header;