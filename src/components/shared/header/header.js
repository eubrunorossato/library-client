import React from 'react'
import {
  Navbar,
  NavItem,
  Icon,
  Dropdown,
  Divider,
} from 'react-materialize'
import './_header.css'
export default function home() {
  return (
    <Navbar
      alignLinks="right"
      brand={<a className="brand-logo" href="#">Library<Icon medium>import_contacts</Icon></a>}
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
          inDuration: 150,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 250
        }}
        trigger={<a href="#!">Admin{' '}<Icon right>arrow_drop_down</Icon></a>}
      >
        <a href="#">
          Books
        </a>
        <Divider />
      </Dropdown>
    </Navbar>
  )
}