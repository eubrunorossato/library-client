import GoogleLogin from "react-google-login";
import { Container, TextInput } from "react-materialize";
import './_login.css'
const LoginPage = () => {
    function onSignIn (googleUser) {
        const profile = googleUser.getBasicProfile();
        console.log(profile);
        console.log('ID: ' + profile.getId()); 
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    }
      
    return (
        <Container>
            <div className="loginBox">
                <TextInput
                email
                id="TextInput-36"
                label="Email"
                validate
                />
                <TextInput
                id="TextInput-39"
                label="Password"
                password
                />  
                <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={onSignIn}
                onFailure={onSignIn}
                cookiePolicy={'single_host_origin'}
                />
            </div>
        </Container>
    )
};

export default LoginPage;