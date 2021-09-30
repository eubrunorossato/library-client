import GoogleLogin from "react-google-login";
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
        <GoogleLogin 
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSignIn}
        onFailure={onSignIn}
        cookiePolicy={'single_host_origin'}
        />
    )
};

export default LoginPage;