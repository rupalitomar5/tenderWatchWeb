import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
};

const GoogleComponent=()=>(<GoogleLogin
    clientId="153589139177-5k2g5pv0088mgaoob6t3jp5pvm2oqori.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
/>);

export default GoogleComponent;