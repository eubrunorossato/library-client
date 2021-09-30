import GoogleLogin from "react-google-login";
const LoginPage = () => {
    function onSignIn (googleUser) {
        const profile = googleUser.getBasicProfile();
        console.log(profile);
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
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