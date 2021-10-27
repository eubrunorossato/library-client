import jwt from 'jsonwebtoken';
import { Route, Redirect } from 'react-router-dom';

const checkToken = (token) => {
    return jwt.verify(token, process.env.REACT_APP_TOKEN_KEY, (err, decode) => {
        if (err) return false;
        else return decode;
    })
};

const AuthAppRoutes = ({ isAuth, component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        const token = localStorage.getItem('libraryTokenUser');
        if (token) {
            const isValidToken = checkToken(token);
            if (!isValidToken) {
                console.log('expirou');
                const { id, name, photoUrl, email } = jwt.decode(token);
                const newToken = jwt.sign({ id, name, photoUrl, email }, process.env.REACT_APP_TOKEN_KEY, {
                    expiresIn: '10s'
                });
                localStorage.setItem('libraryTokenUser', newToken)
                window.location.reload();
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