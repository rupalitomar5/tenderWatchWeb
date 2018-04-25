import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
};

const GoogleComponent=(props)=>(<GoogleLogin
    id={props.id}
    className='fa fa-google fa-2x'
    clientId="153589139177-5k2g5pv0088mgaoob6t3jp5pvm2oqori.apps.googleusercontent.com"
    clientSecret="NLc61WmGlXJ2pHZDW6577j4F"
    buttonText="oogle"
    onSuccess={props.googleLoginMethod}
    onFailure={props.googleLoginMethod}
/>);

export default GoogleComponent;