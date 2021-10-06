import jwt from 'jsonwebtoken';
import { Route, Redirect, useLocation } from 'react-router-dom';

const AuthAppRoutes = ({ isAuth, component: Component, ...rest }) => {
    const location = useLocation()
    return <Route {...rest} render={(props) => {
        const token = localStorage.getItem('libraryTokenUser');
        const routePath = location.pathname;
        if (token) {
            if (routePath === '/login') {
                return <Redirect to={{ pathname: '/library', state: { from: props.location } }} />
            }
            const user = jwt.decode(token);
            const userKeys = Object.keys(user);
            if (
                userKeys.includes('id') &&
                userKeys.includes('name') &&
                userKeys.includes('photoUrl') &&
                userKeys.includes('email') &&
                userKeys.includes('iat')
            ) {
                return <Component />
            } else {
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
        } else {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
    }} />
};

const AuthLoginRoute = ({ isAuth, component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        const token = localStorage.getItem('libraryTokenUser');
        if (token) {
            const user = jwt.decode(token);
            const userKeys = Object.keys(user);
            if (
                userKeys.includes('id') &&
                userKeys.includes('name') &&
                userKeys.includes('photoUrl') &&
                userKeys.includes('email') &&
                userKeys.includes('iat')
            ) {
                return <Redirect to={{ pathname: '/library', state: { from: props.location } }} />
            } else {
                return <Component />
            }
        } else {
            return <Component />
        }
    }} />
};

export { AuthAppRoutes, AuthLoginRoute };