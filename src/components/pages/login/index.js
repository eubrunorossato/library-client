import { useState } from 'react';
import { axiosInstance } from '../../../helpers/index';
import { Container, TextInput, ProgressBar, Col } from "react-materialize";
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import GoogleLogin from "react-google-login";
import './_login.css'
const LoginPage =  () => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    async function onSignIn (googleUser){
        setIsLoading(true);
        const user = {};
        const profile = googleUser.getBasicProfile();
        user.id = profile.getId();
        user.name = profile.getName();
        user.photoUrl =  profile.getImageUrl();
        user.email = profile.getEmail();
        await handleAuthToken(user);
        setIsLoading(false)        
    };

    const handleAuthToken = async (user) => {
        const userToken = jwt.sign(user, process.env.REACT_APP_TOKEN_KEY, {
            expiresIn: '10s'
        });
        Cookies.set('libraryTokenUser', userToken);
        const userInfo = jwt.decode(userToken);
        const { data } = await axiosInstance.get(`/check/register/${userInfo.email}`);
        checkUser(data.userRegister, userInfo);
    };

    const checkUser = (user, userInfo) => {
        if (user === null){
            userInfo.nickname = '';
            userInfo.celphone = '';
            history.push('/register-user', userInfo);
        } else {
            window.location.href = '/library'
        }
    };

    const renderLoading = () => {
        return (
        <Col s={12}>
            <ProgressBar style={{marginBottom: '2rem'}}/>
        </Col>
        )
    };

    const startLoading = () => {
        setIsLoading(true);
    };
      
    return (
        <Container>
            <div className="loginBox">
                <TextInput
                disabled={isLoading}
                email
                id="TextInput-36"
                label="Email"
                validate
                />
                <TextInput
                disabled={isLoading}
                id="TextInput-39"
                label="Password"
                password
                />
                <div onClick={startLoading} style={{marginBottom: '2rem'}}>
                    <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Google"
                    onSuccess={onSignIn}
                    onFailure={onSignIn}
                    cookiePolicy={'single_host_origin'}
                    />
                </div>
                { isLoading ? renderLoading(): null}
            </div>
        </Container>
    )
};

export default LoginPage;