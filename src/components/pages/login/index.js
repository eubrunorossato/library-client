import { useState } from 'react';
import { axiosInstance } from '../../../helpers/index';
import { Container, TextInput, ProgressBar, Col } from "react-materialize";
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
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
        const { data } = await axiosInstance.post('/login', user);
        localStorage.setItem('libraryTokenUser', data.accessToken);
        const userInfo = jwt.decode(data.accessToken);
        await checkUser(data.user, userInfo);
    };

    const checkUser = async (user, userInfo) => {
        if (user === null){
            userInfo.nickname = '';
            userInfo.celphone = '';
            history.push('/register-user', userInfo);
        } else {
            history.push('/library');
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