import React, { useContext, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Avatar from 'react-avatar';
import { Context } from '../../../store/index';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import {
  Navbar,
  Icon,
  Dropdown,
  Divider,
} from 'react-materialize';
import './_header.css';


const Header = () => {
  const [userInfo, setUserInfo] = useContext(Context);

  useEffect(() => {
    const userData = getUserData();
    setUserInfo(userData);
  }, []);

  const getUserData = () => {
    const userToken = Cookies.get('libraryTokenUser');
    return jwt.decode(userToken);
  };

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
        <Link to="/library/register-book">
          <a>Register Book</a>
        </Link>
        <Divider />
      </Dropdown>
      <Avatar src={userInfo.photoUrl} size={45} round={true} id='avatar' />
    </Navbar>
  )
};

export default Header;